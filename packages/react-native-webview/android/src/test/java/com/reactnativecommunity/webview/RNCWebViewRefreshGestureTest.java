package com.reactnativecommunity.webview;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RNCWebViewRefreshGestureTest {

    private static final int TOUCH_SLOP = 16;
    // Finger position where every test starts.
    private static final float X = 100;
    private static final float Y = 100;

    /** Behaves like a SwipeRefreshLayout driven with the nested scrolling callbacks. */
    private static final class FakeTarget implements RNCWebViewRefreshGesture.Target {
        static final int REFRESH_DISTANCE = 64;

        final List<String> calls = new ArrayList<>();
        boolean accepts = true;
        int pulled;
        boolean refreshed;

        @Override
        public boolean start() {
            calls.add("start");
            return accepts;
        }

        @Override
        public void pull(int distance) {
            calls.add("pull " + distance);
            pulled += distance;
        }

        @Override
        public int release(int distance) {
            final int consumed = Math.min(distance, pulled);
            calls.add("release " + distance + " -> " + consumed);
            pulled -= consumed;
            return consumed;
        }

        @Override
        public void stop() {
            calls.add("stop");
            refreshed = pulled > REFRESH_DISTANCE;
            pulled = 0;
        }
    }

    private RNCWebViewRefreshGesture gesture;
    private FakeTarget target;

    @Before
    public void setUp() {
        gesture = new RNCWebViewRefreshGesture(TOUCH_SLOP);
        target = new FakeTarget();
        gesture.setTarget(target);
    }

    /** A finger lands, moves down by 30 pixels, and Chromium reports that the page is at its top. */
    private void startPulling() {
        gesture.onDown(0, X, Y);
        gesture.onMove(1, 0, X, Y + 30);
        gesture.onBeforeScroll(-90, 0);
        gesture.onAfterScroll(-90);
    }

    private void assertCalls(String... calls) {
        assertEquals(Arrays.asList(calls), target.calls);
    }

    // Starting

    @Test
    public void pullAtTheTopOfThePageRefreshes() {
        startPulling();
        assertTrue(gesture.isActive());

        gesture.onMove(1, 0, X, Y + 130);
        gesture.onUp();

        assertCalls("start", "pull 100", "stop");
        assertTrue(target.refreshed);
        assertFalse(gesture.isActive());
    }

    @Test
    public void indicatorFollowsTheFingerNotTheOverscroll() {
        startPulling();
        // Chromium reports three times the finger movement on a 3x screen.
        gesture.onMove(1, 0, X, Y + 40);
        gesture.onBeforeScroll(-30, 0);
        gesture.onAfterScroll(-30);
        gesture.onMove(1, 0, X, Y + 50);
        gesture.onBeforeScroll(-30, 0);
        gesture.onAfterScroll(-30);

        assertCalls("start", "pull 10", "pull 10");
    }

    @Test
    public void shortPullDoesNotRefresh() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 60);
        gesture.onUp();

        assertCalls("start", "pull 30", "stop");
        assertFalse(target.refreshed);
    }

    @Test
    public void scrollInsideThePageDoesNotStart() {
        gesture.onDown(0, X, Y);
        gesture.onMove(1, 0, X, Y + 30);
        // The page scrolls up from 500 to 470: it is not at its top.
        gesture.onBeforeScroll(-30, 500);
        gesture.onAfterScroll(-30);
        gesture.onMove(1, 0, X, Y + 60);
        gesture.onUp();

        assertCalls();
    }

    @Test
    public void scrollThatReachesTheTopStarts() {
        gesture.onDown(0, X, Y);
        gesture.onMove(1, 0, X, Y + 30);
        // The page is 10 pixels from its top and is asked to scroll by 30.
        gesture.onBeforeScroll(-30, 10);

        assertTrue(gesture.isActive());
    }

    @Test
    public void scrollDownDoesNotStart() {
        gesture.onDown(0, X, Y);
        gesture.onMove(1, 0, X, Y - 30);
        gesture.onBeforeScroll(30, 0);
        gesture.onAfterScroll(30);

        assertCalls();
    }

    @Test
    public void sidewaysSwipeDoesNotStart() {
        gesture.onDown(0, X, Y);
        gesture.onMove(1, 0, X + 100, Y + 20);
        gesture.onBeforeScroll(-20, 0);

        assertCalls();
    }

    @Test
    public void movementUnderHalfTheTouchSlopDoesNotStart() {
        gesture.onDown(0, X, Y);
        gesture.onMove(1, 0, X, Y + TOUCH_SLOP / 2f - 1);
        // The end of a fling that reaches the top just as the finger lands.
        gesture.onBeforeScroll(-200, 0);

        assertCalls();
    }

    @Test
    public void secondFingerDoesNotStart() {
        gesture.onDown(0, X, Y);
        gesture.onPointerDown();
        gesture.onMove(2, 0, X, Y + 30);
        // Pinching overscrolls too.
        gesture.onBeforeScroll(-30, 0);

        assertCalls();
    }

    @Test
    public void overscrollAfterTheFingerIsUpDoesNotStart() {
        gesture.onDown(0, X, Y);
        gesture.onMove(1, 0, X, Y + 30);
        gesture.onUp();
        // What is left of the fling.
        gesture.onBeforeScroll(-90, 0);

        assertCalls();
    }

    @Test
    public void overscrollWithoutAFingerDoesNotStart() {
        gesture.onBeforeScroll(-90, 0);

        assertCalls();
    }

    @Test
    public void refusedStartLeavesTheGestureToThePage() {
        target.accepts = false;
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.onUp();

        assertFalse(gesture.isActive());
        assertCalls("start");
        assertEquals(0, gesture.getTouchOffsetY());
    }

    @Test
    public void withoutATargetNothingHappens() {
        gesture.setTarget(null);
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.onUp();

        assertFalse(gesture.isActive());
        assertCalls();
    }

    // Moving back up

    @Test
    public void movingBackUpRetractsTheIndicatorBeforeThePageScrolls() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.onMove(1, 0, X, Y + 90);

        assertCalls("start", "pull 100", "release 40 -> 40");
        // The page must not see those 40 pixels.
        assertEquals(40, gesture.getTouchOffsetY());

        gesture.onUp();
        assertFalse(target.refreshed);
    }

    @Test
    public void movingUpPastTheStartScrollsThePage() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.onMove(1, 0, X, Y - 20);

        assertCalls("start", "pull 100", "release 150 -> 100");
        // Only what the indicator took is hidden from the page, the other 50 pixels scroll it.
        assertEquals(100, gesture.getTouchOffsetY());
    }

    @Test
    public void pullingAgainNeedsThePageBackAtItsTop() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.onMove(1, 0, X, Y - 20);
        gesture.onBeforeScroll(50, 0);
        gesture.onAfterScroll(50);
        target.calls.clear();

        // The page is 50 pixels down: this scrolls it back, the indicator stays.
        gesture.onMove(1, 0, X, Y + 10);
        gesture.onBeforeScroll(-30, 50);
        gesture.onAfterScroll(-30);
        assertCalls();

        // Chromium reports the top again: the finger pulls from there.
        gesture.onMove(1, 0, X, Y + 40);
        gesture.onBeforeScroll(-30, 20);
        gesture.onAfterScroll(-30);
        gesture.onMove(1, 0, X, Y + 60);
        assertCalls("pull 20");
    }

    @Test
    public void pageScrollingDownRetractsTheIndicator() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        target.calls.clear();

        // Nothing is retracted before the page has scrolled.
        gesture.onBeforeScroll(30, 0);
        assertCalls();
        gesture.onAfterScroll(30);
        assertCalls("release 30 -> 30");

        // The page left its top: moving down does not pull any more.
        gesture.onMove(1, 0, X, Y + 150);
        assertCalls("release 30 -> 30");
    }

    @Test
    public void pageScrollingDownWithNothingPulledOnlyLeavesTheTop() {
        startPulling();
        gesture.onBeforeScroll(30, 0);
        gesture.onAfterScroll(30);
        gesture.onMove(1, 0, X, Y + 60);

        assertCalls("start");
    }

    // Ending

    @Test
    public void cancelRetractsFullyAndDoesNotRefresh() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.onCancel();

        assertCalls("start", "pull 100", "release 100 -> 100", "stop");
        assertFalse(target.refreshed);
        assertFalse(gesture.isActive());
    }

    @Test
    public void cancelWithNothingPulledOnlyStops() {
        startPulling();
        gesture.onCancel();

        assertCalls("start", "stop");
    }

    @Test
    public void downAfterAnUnfinishedGestureCancelsIt() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.onMove(1, 0, X, Y + 110);
        // No up, for instance after a detach.
        gesture.onDown(0, X, Y);

        assertCalls("start", "pull 100", "release 20 -> 20", "release 80 -> 80", "stop");
        assertFalse(target.refreshed);
        assertEquals(0, gesture.getTouchOffsetY());
    }

    @Test
    public void removingTheTargetCancelsTheGesture() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.setTarget(null);

        assertCalls("start", "pull 100", "release 100 -> 100", "stop");
        assertFalse(target.refreshed);
        assertFalse(gesture.isActive());
    }

    @Test
    public void upStopsOnlyOnce() {
        startPulling();
        gesture.onUp();
        gesture.onUp();
        gesture.onCancel();

        assertEquals(1, Collections.frequency(target.calls, "stop"));
    }

    // Fingers

    @Test
    public void secondFingerDuringThePullDoesNotMoveTheIndicator() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.onPointerDown();
        // While two fingers are down, then with only the second one left, far from the first.
        gesture.onMove(2, 0, X, Y + 300);
        gesture.onMove(1, 1, X, Y + 600);
        assertCalls("start", "pull 100");

        // The remaining finger pulls from where it is.
        gesture.onMove(1, 1, X, Y + 620);
        assertCalls("start", "pull 100", "pull 20");
    }

    @Test
    public void movementsSmallerThanAPixelAddUp() {
        startPulling();
        for (int i = 1; i <= 4; i++) {
            gesture.onMove(1, 0, X, Y + 30 + i * 0.5f);
        }

        assertCalls("start", "pull 1", "pull 1");
    }

    @Test
    public void touchOffsetIsResetByTheNextGesture() {
        startPulling();
        gesture.onMove(1, 0, X, Y + 130);
        gesture.onMove(1, 0, X, Y + 90);
        gesture.onUp();
        assertEquals(40, gesture.getTouchOffsetY());

        gesture.onDown(0, X, Y);
        assertEquals(0, gesture.getTouchOffsetY());
    }
}
