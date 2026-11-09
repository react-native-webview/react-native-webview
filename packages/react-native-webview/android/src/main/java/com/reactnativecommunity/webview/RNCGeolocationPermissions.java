package com.reactnativecommunity.webview;

import android.Manifest;
import android.content.pm.PackageManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Decides which Android location permissions a WebView geolocation prompt needs.
 *
 * The WebView geolocation API only needs some location access: with approximate
 * (coarse) location, the platform simply returns less accurate positions.
 */
final class RNCGeolocationPermissions {

    interface PermissionChecker {
        boolean isGranted(String permission);
    }

    private RNCGeolocationPermissions() {}

    static boolean isLocationPermission(String permission) {
        return Manifest.permission.ACCESS_FINE_LOCATION.equals(permission)
                || Manifest.permission.ACCESS_COARSE_LOCATION.equals(permission);
    }

    /**
     * Whether the app can already answer a geolocation prompt without asking the user.
     * Either precise or approximate location is enough.
     */
    static boolean hasLocationPermission(PermissionChecker checker) {
        return checker.isGranted(Manifest.permission.ACCESS_FINE_LOCATION)
                || checker.isGranted(Manifest.permission.ACCESS_COARSE_LOCATION);
    }

    /**
     * Permissions to request, given the permissions declared in the app manifest
     * ({@code null} when they cannot be read).
     *
     * Apps that declare precise location request it together with approximate location:
     * Android 12+ ignores or rejects a request for ACCESS_FINE_LOCATION on its own, and
     * the combined request lets the user choose "Approximate". Apps that only declare
     * approximate location (for privacy or Play Store policy) request just that.
     */
    static List<String> permissionsToRequest(String[] declaredPermissions) {
        if (declaredPermissions != null
                && !Arrays.asList(declaredPermissions).contains(Manifest.permission.ACCESS_FINE_LOCATION)) {
            return Collections.singletonList(Manifest.permission.ACCESS_COARSE_LOCATION);
        }
        return Arrays.asList(
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION);
    }

    /**
     * Reads a permission request result. Returns {@code null} when it contains no location
     * permission, otherwise whether any location permission was granted, so that a user who
     * picks "Approximate" (precise denied, approximate granted) is answered once, positively.
     */
    static Boolean locationResult(String[] permissions, int[] grantResults) {
        Boolean result = null;
        for (int i = 0; i < permissions.length && i < grantResults.length; i++) {
            if (isLocationPermission(permissions[i])) {
                boolean granted = grantResults[i] == PackageManager.PERMISSION_GRANTED;
                result = (result != null && result) || granted;
            }
        }
        return result;
    }
}
