package com.reactnativecommunity.webview;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import android.Manifest;
import android.content.pm.PackageManager;

import org.junit.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class RNCGeolocationPermissionsTest {

    private static final String FINE = Manifest.permission.ACCESS_FINE_LOCATION;
    private static final String COARSE = Manifest.permission.ACCESS_COARSE_LOCATION;
    private static final String CAMERA = Manifest.permission.CAMERA;
    private static final String INTERNET = Manifest.permission.INTERNET;

    private static final int GRANTED = PackageManager.PERMISSION_GRANTED;
    private static final int DENIED = PackageManager.PERMISSION_DENIED;

    private static RNCGeolocationPermissions.PermissionChecker granted(String... permissions) {
        Set<String> grantedPermissions = new HashSet<>(Arrays.asList(permissions));
        return grantedPermissions::contains;
    }

    // hasLocationPermission

    @Test
    public void noLocationPermissionGranted() {
        assertFalse(RNCGeolocationPermissions.hasLocationPermission(granted()));
        assertFalse(RNCGeolocationPermissions.hasLocationPermission(granted(CAMERA)));
    }

    @Test
    public void preciseLocationGranted() {
        assertTrue(RNCGeolocationPermissions.hasLocationPermission(granted(FINE, COARSE)));
    }

    @Test
    public void approximateLocationGrantedIsEnough() {
        // The user picked "Approximate": the app must not prompt again on every request.
        assertTrue(RNCGeolocationPermissions.hasLocationPermission(granted(COARSE)));
    }

    // permissionsToRequest

    @Test
    public void requestsPreciseTogetherWithApproximateWhenPreciseIsDeclared() {
        // Android 12+ ignores or rejects ACCESS_FINE_LOCATION requested on its own.
        assertEquals(
                Arrays.asList(FINE, COARSE),
                RNCGeolocationPermissions.permissionsToRequest(new String[] {INTERNET, FINE, COARSE}));
    }

    @Test
    public void requestsOnlyApproximateWhenOnlyApproximateIsDeclared() {
        assertEquals(
                Collections.singletonList(COARSE),
                RNCGeolocationPermissions.permissionsToRequest(new String[] {INTERNET, COARSE}));
    }

    @Test
    public void requestsApproximateWhenNoLocationPermissionIsDeclared() {
        assertEquals(
                Collections.singletonList(COARSE),
                RNCGeolocationPermissions.permissionsToRequest(new String[] {INTERNET}));
        assertEquals(
                Collections.singletonList(COARSE),
                RNCGeolocationPermissions.permissionsToRequest(new String[0]));
    }

    @Test
    public void requestsBothWhenDeclaredPermissionsAreUnknown() {
        // PackageInfo.requestedPermissions is null when it cannot be read.
        assertEquals(Arrays.asList(FINE, COARSE), RNCGeolocationPermissions.permissionsToRequest(null));
    }

    @Test
    public void neverRequestsPreciseLocationAlone() {
        String[][] manifests = {
            null,
            new String[0],
            new String[] {FINE},
            new String[] {COARSE},
            new String[] {FINE, COARSE},
            new String[] {INTERNET, CAMERA},
        };
        for (String[] manifest : manifests) {
            List<String> requested = RNCGeolocationPermissions.permissionsToRequest(manifest);
            assertTrue(
                    "requested " + requested + " for manifest " + Arrays.toString(manifest),
                    requested.contains(COARSE));
        }
    }

    // locationResult

    @Test
    public void preciseGrantAllowsGeolocation() {
        assertEquals(
                Boolean.TRUE,
                RNCGeolocationPermissions.locationResult(
                        new String[] {FINE, COARSE}, new int[] {GRANTED, GRANTED}));
    }

    @Test
    public void approximateGrantAllowsGeolocation() {
        // "Approximate" in the Android 12+ dialog: precise denied, approximate granted.
        assertEquals(
                Boolean.TRUE,
                RNCGeolocationPermissions.locationResult(
                        new String[] {FINE, COARSE}, new int[] {DENIED, GRANTED}));
        assertEquals(
                Boolean.TRUE,
                RNCGeolocationPermissions.locationResult(
                        new String[] {COARSE, FINE}, new int[] {GRANTED, DENIED}));
    }

    @Test
    public void approximateOnlyRequestResult() {
        assertEquals(
                Boolean.TRUE,
                RNCGeolocationPermissions.locationResult(new String[] {COARSE}, new int[] {GRANTED}));
        assertEquals(
                Boolean.FALSE,
                RNCGeolocationPermissions.locationResult(new String[] {COARSE}, new int[] {DENIED}));
    }

    @Test
    public void deniedLocationDeniesGeolocation() {
        assertEquals(
                Boolean.FALSE,
                RNCGeolocationPermissions.locationResult(
                        new String[] {FINE, COARSE}, new int[] {DENIED, DENIED}));
    }

    @Test
    public void ignoresResultsWithoutLocationPermissions() {
        assertNull(RNCGeolocationPermissions.locationResult(new String[] {CAMERA}, new int[] {GRANTED}));
        assertNull(RNCGeolocationPermissions.locationResult(new String[0], new int[0]));
    }

    @Test
    public void readsLocationAmongOtherPermissions() {
        // Pending camera and location requests can be answered in one result.
        assertEquals(
                Boolean.TRUE,
                RNCGeolocationPermissions.locationResult(
                        new String[] {CAMERA, FINE, COARSE}, new int[] {DENIED, DENIED, GRANTED}));
        assertEquals(
                Boolean.FALSE,
                RNCGeolocationPermissions.locationResult(
                        new String[] {CAMERA, FINE, COARSE}, new int[] {GRANTED, DENIED, DENIED}));
    }

    @Test
    public void toleratesMismatchedResultArrays() {
        // A cancelled request can return fewer results than permissions.
        assertNull(RNCGeolocationPermissions.locationResult(new String[] {FINE, COARSE}, new int[0]));
    }
}
