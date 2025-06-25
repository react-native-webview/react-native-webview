package com.reactnativecommunity.webview.extension.file

/**
 * JavaScript code to detect all iFrames in the page and report their URLs
 * This script runs after page load and also monitors for dynamically added iFrames
 */
fun getIFrameDetectorScript(): String = """
    (function() {
        if (window.iframeDetectorInjected) return;
        window.iframeDetectorInjected = true;
        
        function collectIFrameUrls() {
            const iframes = document.getElementsByTagName('iframe');
            const urls = [];
            
            for (let i = 0; i < iframes.length; i++) {
                const iframe = iframes[i];
                const src = iframe.src;
                
                if (src && src.trim() !== '' && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//'))) {
                    const normalizedUrl = src.startsWith('//') ? 'https:' + src : src;
                    urls.push(normalizedUrl);
                }
            }
            
            return urls;
        }
        
        function reportIFrames() {
            try {
                const urls = collectIFrameUrls();
                if (urls.length > 0) {
                    const message = {
                        type: 'IFRAME_DETECTED',
                        iframeUrls: urls
                    };
                    
                    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                        window.ReactNativeWebView.postMessage(JSON.stringify(message));
                    }
                }
            } catch (e) {
                console.error('Error reporting iFrames:', e);
            }
        }
        
        // Initial check for iFrames
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', reportIFrames);
        } else {
            // Document already loaded
            setTimeout(reportIFrames, 100);
        }
        
        // Monitor for dynamically added iFrames
        const observer = new MutationObserver(function(mutations) {
            let shouldCheck = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.tagName === 'IFRAME' || node.querySelector('iframe')) {
                                shouldCheck = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldCheck) {
                setTimeout(reportIFrames, 100);
            }
        });
        
        observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true
        });
        
        // Also check periodically as a fallback
        setInterval(reportIFrames, 5000);
    })();
""".trimIndent() 