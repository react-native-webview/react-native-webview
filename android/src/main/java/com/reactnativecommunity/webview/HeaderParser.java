package com.reactnativecommunity.webview;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import okhttp3.Headers;
import okhttp3.Response;

public class HeaderParser {
  public static final String DEFAULT_CHARSET = "text/html";
  public static final String DEFAULT_MIME_TYPE = "utf-8";

  public static final Pattern MIME_TYPE_RE = Pattern.compile("^.*(?=;)");
  public static final Pattern CHARSET_RE = Pattern.compile("charset=([a-zA-Z0-9-]+)", Pattern.CASE_INSENSITIVE);

  public String getMimeType(String contentType) {
    Matcher matcher = MIME_TYPE_RE.matcher(contentType);

    if (matcher.find()) {
      return matcher.group(0);
    }

    return DEFAULT_MIME_TYPE;
  }

  public String getCharset(String contentType) {
    Matcher matcher = CHARSET_RE.matcher(contentType);

    if (matcher.groupCount() != 2) {
      return DEFAULT_CHARSET;
    }

    return matcher.find() ? matcher.group(2) : DEFAULT_CHARSET;
  }

  public String getContentTypeHeader(Response response) {
    Headers headers = response.headers();
    String contentType = headers.get("Content-Type");

    if (contentType != null) {
      return contentType.trim();
    }

    return DEFAULT_CHARSET + "; charset=" + DEFAULT_MIME_TYPE;
  }
}
