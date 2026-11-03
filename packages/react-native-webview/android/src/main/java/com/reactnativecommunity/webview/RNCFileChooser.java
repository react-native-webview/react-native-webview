package com.reactnativecommunity.webview;

import android.Manifest;

import java.util.Arrays;

/**
 * Decides how a WebView file input is opened: camera app, file chooser, or a CAMERA
 * permission request first.
 */
final class RNCFileChooser {

    enum Action {
        // Ask for the CAMERA permission, then decide again with the result
        REQUEST_CAMERA_PERMISSION,
        // Open the camera app directly
        CAPTURE,
        // Open the file chooser, with camera options when they are available
        CHOOSE_FILE,
    }

    private RNCFileChooser() {}

    /**
     * @param isCaptureEnabled whether the input has the {@code capture} attribute
     * @param acceptsMedia whether the input accepts images or videos, i.e. can be captured
     * @param cameraPermissionNeeded whether camera intents are blocked until CAMERA is granted
     * @param canRequestCameraPermission whether CAMERA can be requested, {@code false} once the
     *                                   user has answered, so that a denial falls back to the
     *                                   file chooser instead of asking again
     */
    static Action getAction(boolean isCaptureEnabled, boolean acceptsMedia, boolean cameraPermissionNeeded, boolean canRequestCameraPermission) {
        if (!isCaptureEnabled || !acceptsMedia) {
            return Action.CHOOSE_FILE;
        }
        if (!cameraPermissionNeeded) {
            return Action.CAPTURE;
        }
        return canRequestCameraPermission ? Action.REQUEST_CAMERA_PERMISSION : Action.CHOOSE_FILE;
    }

    /**
     * Camera intents need no permission, unless the app declares CAMERA in its manifest: then
     * starting them throws a SecurityException until CAMERA is granted.
     *
     * @param declaredPermissions the permissions declared in the app manifest, {@code null} when
     *                            it declares none
     */
    static boolean needsCameraPermission(String[] declaredPermissions, boolean cameraGranted) {
        return declaredPermissions != null
                && Arrays.asList(declaredPermissions).contains(Manifest.permission.CAMERA)
                && !cameraGranted;
    }
}
