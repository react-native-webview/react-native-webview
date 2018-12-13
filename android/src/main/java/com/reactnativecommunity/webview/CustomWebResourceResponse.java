package com.reactnativecommunity.webview;

import android.webkit.WebResourceResponse;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.net.HttpURLConnection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Subclass the WebResourceResponse to allow all kinds of response codes.
 */
public class CustomWebResourceResponse extends android.webkit.WebResourceResponse {
    private static final Map<Integer, String> STATUS_CODE_MAP;

    private boolean mImmutable;
    private String mMimeType;
    private String mEncoding;
    private int mStatusCode;
    private String mReasonPhrase;
    private Map<String, String> mResponseHeaders;
    private InputStream mInputStream;
    /**
     * Constructs a resource response with the given MIME type, encoding, and
     * input stream. Callers must implement
     * {@link InputStream#read(byte[]) InputStream.read(byte[])} for the input
     * stream.
     *
     * @param mimeType the resource response's MIME type, for example text/html
     * @param encoding the resource response's encoding
     * @param data the input stream that provides the resource response's data. Must not be a
     *             StringBufferInputStream.
     */
    public CustomWebResourceResponse(String mimeType, String encoding,
                               InputStream data) {
        super("text/html", "utf-8", null);

        mMimeType = mimeType;
        mEncoding = encoding;
        setData(data);
    }
    /**
     * Constructs a resource response with the given parameters. Callers must
     * implement {@link InputStream#read(byte[]) InputStream.read(byte[])} for
     * the input stream.
     *
     * @param mimeType the resource response's MIME type, for example text/html
     * @param encoding the resource response's encoding
     * @param statusCode the status code needs to be in the ranges [100, 299], [400, 599].
     *                   Causing a redirect by specifying a 3xx code is not supported.
     * @param reasonPhrase the phrase describing the status code, for example "OK". Must be
     *                     non-empty.
     * @param responseHeaders the resource response's headers represented as a mapping of header
     *                        name -> header value.
     * @param data the input stream that provides the resource response's data. Must not be a
     *             StringBufferInputStream.
     */
    public CustomWebResourceResponse(String mimeType, String encoding, int statusCode,
                                     Map<String, String> responseHeaders, InputStream data) {
        this(mimeType, encoding, data);
        setStatusCode(statusCode);
        setResponseHeaders(responseHeaders);
    }
    /**
     * Sets the resource response's MIME type, for example &quot;text/html&quot;.
     *
     * @param mimeType The resource response's MIME type
     */
    public void setMimeType(String mimeType) {
        checkImmutable();
        mMimeType = mimeType;
    }
    /**
     * Gets the resource response's MIME type.
     *
     * @return The resource response's MIME type
     */
    public String getMimeType() {
        return mMimeType;
    }
    /**
     * Sets the resource response's encoding, for example &quot;UTF-8&quot;. This is used
     * to decode the data from the input stream.
     *
     * @param encoding The resource response's encoding
     */
    public void setEncoding(String encoding) {
        checkImmutable();
        mEncoding = encoding;
    }
    /**
     * Gets the resource response's encoding.
     *
     * @return The resource response's encoding
     */
    public String getEncoding() {
        return mEncoding;
    }
    /**
     * Sets the resource response's status code and reason phrase.
     *
     * @param statusCode The status code.
     * @param reasonPhrase the phrase describing the status code, for example "OK". Must be
     *                     non-empty.
     */
    public void setStatusCodeAndReasonPhrase(int statusCode, String reasonPhrase) {
        checkImmutable();

        mStatusCode = statusCode;
        mReasonPhrase = reasonPhrase;
    }

    /**
     * Sets the resource response's status code and reason phrase.
     *
     * @param statusCode the status code to return.
     */
    public void setStatusCode(int statusCode) {
        String reasonPhrase = STATUS_CODE_MAP.get(statusCode);

        if (reasonPhrase == null) {
            reasonPhrase = "Unknown";
        }

        this.setStatusCodeAndReasonPhrase(statusCode, reasonPhrase);
    }

    /**
     * Gets the resource response's status code.
     *
     * @return The resource response's status code.
     */
    public int getStatusCode() {
        return mStatusCode;
    }
    /**
     * Gets the description of the resource response's status code.
     *
     * @return The description of the resource response's status code.
     */
    public String getReasonPhrase() {
        return mReasonPhrase;
    }
    /**
     * Sets the headers for the resource response.
     *
     * @param headers Mapping of header name -> header value.
     */
    public void setResponseHeaders(Map<String, String> headers) {
        checkImmutable();
        mResponseHeaders = headers;
    }
    /**
     * Gets the headers for the resource response.
     *
     * @return The headers for the resource response.
     */
    public Map<String, String> getResponseHeaders() {
        return mResponseHeaders;
    }
    /**
     * Sets the input stream that provides the resource response's data. Callers
     * must implement {@link InputStream#read(byte[]) InputStream.read(byte[])}.
     *
     * @param data the input stream that provides the resource response's data. Must not be a
     *             StringBufferInputStream.
     */
    public void setData(InputStream data) {
        checkImmutable();
        // If data is (or is a subclass of) StringBufferInputStream
        if (data != null && StringBufferInputStream.class.isAssignableFrom(data.getClass())) {
            throw new IllegalArgumentException("StringBufferInputStream is deprecated and must " +
                    "not be passed to a WebResourceResponse");
        }
        mInputStream = data;
    }
    /**
     * Gets the input stream that provides the resource response's data.
     *
     * @return The input stream that provides the resource response's data
     */
    public InputStream getData() {
        return mInputStream;
    }

    private void checkImmutable() {
        if (mImmutable)
            throw new IllegalStateException("This WebResourceResponse instance is immutable");
    }

    public static WebResourceResponse buildErrorResponse(String message) {
        return new CustomWebResourceResponse(
            "text/plain",
            "UTF-8", HttpURLConnection.HTTP_UNAVAILABLE,
            Collections.EMPTY_MAP,
            new ByteArrayInputStream(message.getBytes()));
    }

    static {
        Map<Integer, String> statusCodeMap = new HashMap<>();

        // Unable to find a Map of this anywhere else in the Java doc, copied from here
        // https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html
        statusCodeMap.put(100, "Continue");
        statusCodeMap.put(101, "Switching Protocols");
        statusCodeMap.put(200, "OK");
        statusCodeMap.put(201, "Created");
        statusCodeMap.put(202, "Accepted");
        statusCodeMap.put(203, "Non-Authoritative Information");
        statusCodeMap.put(204, "No Content");
        statusCodeMap.put(205, "Reset Content");
        statusCodeMap.put(206, "Partial Content");
        statusCodeMap.put(300, "Multiple Choices");
        statusCodeMap.put(301, "Moved Permanently");
        statusCodeMap.put(302, "Found");
        statusCodeMap.put(303, "See Other");
        statusCodeMap.put(304, "Not Modified");
        statusCodeMap.put(305, "Use Proxy");
        statusCodeMap.put(307, "Temporary Redirect");
        statusCodeMap.put(400, "Bad Request");
        statusCodeMap.put(401, "Unauthorized");
        statusCodeMap.put(402, "Payment Required");
        statusCodeMap.put(403, "Forbidden");
        statusCodeMap.put(404, "Not Found");
        statusCodeMap.put(405, "Method Not Allowed");
        statusCodeMap.put(406, "Not Acceptable");
        statusCodeMap.put(407, "Proxy Authentication Required");
        statusCodeMap.put(408, "Request Time-out");
        statusCodeMap.put(409, "Conflict");
        statusCodeMap.put(410, "Gone");
        statusCodeMap.put(411, "Length Required");
        statusCodeMap.put(412, "Precondition Failed");
        statusCodeMap.put(413, "Request Entity Too Large");
        statusCodeMap.put(414, "Request-URI Too Large");
        statusCodeMap.put(415, "Unsupported Media Type");
        statusCodeMap.put(416, "Requested range not satisfiable");
        statusCodeMap.put(417, "Expectation Failed");
        statusCodeMap.put(500, "Internal Server Error");
        statusCodeMap.put(501, "Not Implemented");
        statusCodeMap.put(502, "Bad Gateway");
        statusCodeMap.put(503, "Service Unavailable");
        statusCodeMap.put(504, "Gateway Time-out");
        statusCodeMap.put(505, "HTTP Version not supported");

        STATUS_CODE_MAP = Collections.unmodifiableMap(statusCodeMap);

    }
}