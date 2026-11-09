package com.reactnativecommunity.webview;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import android.Manifest;

import com.reactnativecommunity.webview.RNCFileChooser.Action;

import org.junit.Test;

public class RNCFileChooserTest {

    private static final String CAMERA = Manifest.permission.CAMERA;
    private static final String INTERNET = Manifest.permission.INTERNET;

    // getAction

    @Test
    public void choosesFileWithoutCaptureAttribute() {
        // A plain file input never prompts for CAMERA, even when it is needed for camera options.
        for (boolean acceptsMedia : new boolean[] {true, false}) {
            for (boolean cameraPermissionNeeded : new boolean[] {true, false}) {
                for (boolean canRequest : new boolean[] {true, false}) {
                    assertEquals(
                            Action.CHOOSE_FILE,
                            RNCFileChooser.getAction(false, acceptsMedia, cameraPermissionNeeded, canRequest));
                }
            }
        }
    }

    @Test
    public void choosesFileWhenTheInputDoesNotAcceptMedia() {
        // e.g. <input type="file" accept="application/pdf" capture>: there is nothing to capture.
        assertEquals(Action.CHOOSE_FILE, RNCFileChooser.getAction(true, false, false, true));
        assertEquals(Action.CHOOSE_FILE, RNCFileChooser.getAction(true, false, true, true));
    }

    @Test
    public void capturesWhenNoPermissionIsNeeded() {
        assertEquals(Action.CAPTURE, RNCFileChooser.getAction(true, true, false, true));
    }

    @Test
    public void requestsCameraPermissionBeforeCapturing() {
        assertEquals(Action.REQUEST_CAMERA_PERMISSION, RNCFileChooser.getAction(true, true, true, true));
    }

    @Test
    public void capturesOnceCameraPermissionIsGranted() {
        assertEquals(Action.CAPTURE, RNCFileChooser.getAction(true, true, false, false));
    }

    @Test
    public void choosesFileOnceCameraPermissionIsDenied() {
        // The user is not asked again: the input completes through the file chooser instead.
        assertEquals(Action.CHOOSE_FILE, RNCFileChooser.getAction(true, true, true, false));
    }

    @Test
    public void neverRequestsCameraPermissionWhenItCannotBeRequested() {
        for (boolean isCaptureEnabled : new boolean[] {true, false}) {
            for (boolean acceptsMedia : new boolean[] {true, false}) {
                for (boolean cameraPermissionNeeded : new boolean[] {true, false}) {
                    assertNotEquals(
                            Action.REQUEST_CAMERA_PERMISSION,
                            RNCFileChooser.getAction(isCaptureEnabled, acceptsMedia, cameraPermissionNeeded, false));
                }
            }
        }
    }

    // needsCameraPermission

    @Test
    public void needsCameraPermissionWhenDeclaredButNotGranted() {
        assertTrue(RNCFileChooser.needsCameraPermission(new String[] {INTERNET, CAMERA}, false));
    }

    @Test
    public void doesNotNeedCameraPermissionOnceGranted() {
        assertFalse(RNCFileChooser.needsCameraPermission(new String[] {INTERNET, CAMERA}, true));
    }

    @Test
    public void doesNotNeedCameraPermissionWhenNotDeclared() {
        // Camera intents need no permission when the app does not declare CAMERA.
        assertFalse(RNCFileChooser.needsCameraPermission(new String[] {INTERNET}, false));
        assertFalse(RNCFileChooser.needsCameraPermission(new String[0], false));
    }

    @Test
    public void doesNotNeedCameraPermissionWhenNoPermissionIsDeclared() {
        // PackageInfo.requestedPermissions is null when the manifest declares no permission.
        assertFalse(RNCFileChooser.needsCameraPermission(null, false));
    }
}
