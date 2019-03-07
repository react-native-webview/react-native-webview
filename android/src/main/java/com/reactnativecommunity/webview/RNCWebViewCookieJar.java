package com.reactnativecommunity.webview;

import android.webkit.CookieManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

public class RNCWebViewCookieJar implements CookieJar {
  private CookieManager cookieManager = CookieManager.getInstance();

  @Override
  public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
    String urlString = url.toString();

    for (Cookie cookie : cookies) {
      cookieManager.setCookie(urlString, cookie.toString());
    }
  }

  @Override
  public List<Cookie> loadForRequest(HttpUrl url) {
    String urlString = url.toString();
    String cookiesString = cookieManager.getCookie(urlString);

    if (cookiesString != null && !cookiesString.isEmpty()) {
      String[] cookieHeaders = cookiesString.split(";");
      ArrayList<Cookie> cookiesList = new ArrayList<>();

      for (String cookieStr : cookieHeaders) {
        Cookie parsedCookie = Cookie.parse(url, cookieStr);

        if (parsedCookie != null) {
          cookiesList.add(parsedCookie);
        }
      }

      return cookiesList;
    }

    return Collections.emptyList();
  }
}
