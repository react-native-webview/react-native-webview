declare const WebViewShared: {
    defaultOriginWhitelist: string[];
    extractOrigin: (url: string) => string;
    originWhitelistToRegex: (originWhitelist: string) => string;
};
export default WebViewShared;
