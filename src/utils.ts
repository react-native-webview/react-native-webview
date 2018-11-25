import { WebViewSourceUri } from "./types/WebViewTypes";
export const isWebViewUriSource = (source: any): source is WebViewSourceUri =>
  typeof source !== "number" && !("html" in source);
