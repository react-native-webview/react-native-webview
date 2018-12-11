package com.reactnativecommunity.webview;

import com.facebook.common.logging.FLog;
import com.facebook.react.common.ReactConstants;

import java.io.IOException;
import java.net.CookieManager;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

public class OkHttpCookieJar implements CookieJar {
    private final CookieManager cookieManager = new CookieManager();

    @Override
    public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
        Map<String, List<String>> requestHeaders = new HashMap<>();
        List<String> cookieHeaders = new LinkedList<>();
        for (Cookie cookie: cookies) {
            cookieHeaders.add(cookie.toString());
        }

        requestHeaders.put("Set-Cookie", cookieHeaders);

        try {
            cookieManager.put(url.uri(), requestHeaders);
        } catch (IOException e) {
            FLog.w(ReactConstants.TAG, "Unable to save cookies", e);
        }
    }

    @Override
    public List<Cookie> loadForRequest(HttpUrl url) {
        Map<String, List<String>> requestHeaders = new HashMap<>();
        try {
            Map<String, List<String>> cookieHeaders = cookieManager.get(url.uri(), requestHeaders);
            if (cookieHeaders == null) {
                return new ArrayList<>();
            }

            List<String> cookieStrings = cookieHeaders.get("Cookie");

            if (cookieStrings == null) {
                return new ArrayList<>();
            }

            List<Cookie> cookies = new ArrayList<>(cookieStrings.size());
            for (String cookieListString : cookieStrings) {
                for (String cookieString : cookieListString.split(";")) {
                    Cookie cookie = Cookie.parse(url, cookieString);
                    if (cookie != null) {
                        cookies.add(cookie);
                    }
                }
            }

            return cookies;
        } catch (IOException e) {
            FLog.w(ReactConstants.TAG, "Unable to read cookies", e);
            throw new IllegalStateException("Unable to read cookies", e);
        }
    }
}

