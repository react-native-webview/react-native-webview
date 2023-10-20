package com.reactnativecommunity.webview;

class RNCGigyaCredentials {
    String sessionToken;
    String sessionSecret;
    String apiKey;
    String apiDomain;

    RNCGigyaCredentials(String sessionToken, String sessionSecret, String apiKey, String apiDomain) {
        this.sessionToken = sessionToken;
        this.sessionSecret = sessionSecret;
        this.apiKey = apiKey;
        this.apiDomain = apiDomain;
    }
}