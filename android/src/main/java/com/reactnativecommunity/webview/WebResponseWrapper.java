package com.reactnativecommunity.webview;

import android.webkit.WebResourceResponse;

import java.io.InputStream;
import android.net.Uri;

public class WebResponseWrapper extends WebResourceResponse {
    private final Uri url;

    WebResponseWrapper(Uri url) {
        super("", "", null);
        this.url = url;
    }

    @Override
    public InputStream getData() {
        System.out.println("net-test: Getting data for " + this.url);
        return null;
    }

    @Override
    public String getEncoding() {
        System.out.println("net-test: Getting encoding for " + this.url);
        return null;
    }

    @Override
    public String getMimeType() {
        System.out.println("net-test: Getting mimeType for " + this.url);
        try {
            Thread.sleep(10000);
        } catch (Exception exn) {

        }
        return null;
    }
}
