package com.reactnativecommunity.webview;

/**
 * Decides when the finger pulls the refresh indicator of a WebView.
 *
 * The WebView cannot tell whether the page is at its top: the page may scroll inside an inner
 * element, be a map, or be zoomed in. Chromium can: when a touch scroll goes past what the page
 * consumes, it reports the rest as an overscroll. That report is only used as the signal that
 * the page is at its top. From then on the movement of the finger is handed to the target, the
 * same way a RecyclerView drives a SwipeRefreshLayout.
 *
 * This class has no dependency on Android so that it can be tested on its own. RNCWebView feeds
 * it the touch events and the overscrolls, and implements the target.
 */
final class RNCWebViewRefreshGesture {

    /** What the gesture drives: the layout that shows the refresh indicator. */
    interface Target {
        /**
         * The finger starts pulling the indicator. Returns false to refuse the gesture, which
         * the layout does while a refresh is running or when it is disabled.
         */
        boolean start();

        /** The finger moved down by this many pixels while the page is at its top. */
        void pull(int distance);

        /**
         * Moves the indicator back by up to this many pixels. Returns how far it moved, which
         * is less than the distance once the indicator is back in place.
         */
        int release(int distance);

        /** The gesture is over. The indicator refreshes if it was pulled far enough. */
        void stop();
    }

    // Null when there is no refresh control.
    private Target target;
    // Distance in pixels under which a finger movement is not a scroll.
    private final int touchSlop;
    // A single finger is down and no other finger has joined it.
    private boolean singleTouchInProgress;
    // The target accepted the current gesture: the finger now moves the indicator.
    private boolean active;
    // During that gesture, whether pulling down still overscrolls the page. It stops being
    // the case when the finger moves back up far enough to scroll the page.
    private boolean pageAtTop;
    // Distance the indicator has been pulled during the current gesture, in pixels.
    private int pulledDistance;
    // Finger movement that went to the indicator instead of the page.
    private int touchOffsetY;
    private int activePointerId;
    private float touchStartX;
    private float touchStartY;
    private float lastTouchX;
    private float lastTouchY;

    RNCWebViewRefreshGesture(int touchSlop) {
        this.touchSlop = touchSlop;
    }

    /** Sets what the gesture drives, or null to turn pull to refresh off. */
    void setTarget(Target target) {
        if (this.target == target) {
            return;
        }
        stop(true);
        this.target = target;
    }

    /** Whether the finger currently moves the indicator. */
    boolean isActive() {
        return active;
    }

    /**
     * Finger movement that went to the indicator instead of the page. Touch events must be
     * shifted by this much before the page sees them, so that the page does not scroll while
     * the indicator moves back up.
     */
    int getTouchOffsetY() {
        return touchOffsetY;
    }

    /** A first finger lands. */
    void onDown(int pointerId, float x, float y) {
        // A gesture that never got its end, for instance after a detach.
        stop(true);
        singleTouchInProgress = true;
        touchOffsetY = 0;
        activePointerId = pointerId;
        touchStartX = lastTouchX = x;
        touchStartY = lastTouchY = y;
    }

    /** Another finger lands. Pinching also overscrolls, it must not start a refresh. */
    void onPointerDown() {
        singleTouchInProgress = false;
    }

    /** A finger moved. The pointer id and the position are those of the first pointer. */
    void onMove(int pointerCount, int pointerId, float x, float y) {
        if (pointerCount != 1 || pointerId != activePointerId) {
            // Another finger is involved: follow it without reading a movement into the jump.
            activePointerId = pointerId;
            lastTouchX = x;
            lastTouchY = y;
            return;
        }

        // Positive when the finger moves up.
        final float distance = lastTouchY - y;
        final int dy = (int) distance;
        lastTouchX = x;
        // Keep the fraction of a pixel that was not used for the next event.
        lastTouchY = y + (distance - dy);

        if (!active || target == null || dy == 0) {
            return;
        }
        if (dy > 0) {
            // Moving back up first moves the indicator back, and only then scrolls the page.
            final int consumed = target.release(dy);
            touchOffsetY += consumed;
            pulledDistance = Math.max(0, pulledDistance - consumed);
            if (consumed < dy) {
                // The rest of the movement scrolls the page, which then leaves its top.
                pageAtTop = false;
            }
        } else if (pageAtTop) {
            // The indicator follows the finger, not the overscroll that Chromium reports: that
            // one is not the size of the finger movement (about three times larger on a 3x
            // screen), so the indicator would run ahead of the finger, refresh after a short
            // pull, and not come back when the finger moves back up.
            target.pull(-dy);
            pulledDistance -= dy;
        }
    }

    /** The last finger left. */
    void onUp() {
        singleTouchInProgress = false;
        stop(false);
    }

    /** The gesture was cancelled, for instance taken over by a parent. It must not refresh. */
    void onCancel() {
        singleTouchInProgress = false;
        stop(true);
    }

    /**
     * Chromium is about to scroll the page by deltaY from scrollY. It reports regular scrolls
     * as well as overscrolls this way. A scroll that would end above the top edge means that
     * nothing in the page consumed the gesture: the page, or the element being scrolled in it,
     * is at its top.
     */
    void onBeforeScroll(int deltaY, int scrollY) {
        if (deltaY < 0 && scrollY + deltaY < 0) {
            if (active) {
                pageAtTop = true;
            } else if (singleTouchInProgress) {
                start();
            }
        }
    }

    /** The page has scrolled by deltaY. */
    void onAfterScroll(int deltaY) {
        if (deltaY > 0 && active && target != null) {
            pageAtTop = false;
            if (pulledDistance > 0) {
                // The page scrolls down while the indicator is pulled, which onMove() should
                // prevent: move the indicator back, so that it never stays pulled while the
                // page is away from its top.
                pulledDistance = Math.max(0, pulledDistance - target.release(deltaY));
            }
        }
    }

    private void start() {
        if (target == null) {
            return;
        }
        // Only a finger that is moving down, and more down than sideways, pulls the indicator.
        // This leaves out sideways swipes, and the end of a fling that reaches the top of the
        // page just as a finger lands.
        final float movedX = Math.abs(lastTouchX - touchStartX);
        final float movedY = lastTouchY - touchStartY;
        if (movedY < touchSlop / 2f || movedY <= movedX) {
            return;
        }
        if (!target.start()) {
            return;
        }
        active = true;
        pageAtTop = true;
        pulledDistance = 0;
    }

    private void stop(boolean cancel) {
        if (!active) {
            return;
        }
        active = false;
        if (target != null) {
            if (cancel && pulledDistance > 0) {
                // There is no way to cancel: move the indicator all the way back, so that
                // ending the gesture does not refresh.
                target.release(pulledDistance);
            }
            target.stop();
        }
        pulledDistance = 0;
    }
}
