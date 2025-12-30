import Foundation
import WebKit

@objc public enum RNCHeadlessWebViewScriptInjectionTime: Int {
    case documentStart = 0
    case documentEnd = 1
}

@objcMembers public class RNCHeadlessWebViewScriptDefinition: NSObject {
    public let source: String
    public let injectionTime: RNCHeadlessWebViewScriptInjectionTime
    public let mainFrameOnly: Bool

    public init(source: String, injectionTime: RNCHeadlessWebViewScriptInjectionTime, mainFrameOnly: Bool) {
        self.source = source
        self.injectionTime = injectionTime
        self.mainFrameOnly = mainFrameOnly
        super.init()
    }

    public static func from(_ dict: NSDictionary) -> RNCHeadlessWebViewScriptDefinition? {
        guard let source = dict["source"] as? String else {
            return nil
        }

        var injectionTime: RNCHeadlessWebViewScriptInjectionTime = .documentEnd
        if let injectionTimeStr = dict["injectionTime"] as? String {
            if injectionTimeStr == "documentStart" {
                injectionTime = .documentStart
            } else if injectionTimeStr == "documentEnd" {
                injectionTime = .documentEnd
            }
        }

        let mainFrameOnly = (dict["mainFrameOnly"] as? NSNumber)?.boolValue ?? true

        return RNCHeadlessWebViewScriptDefinition(
            source: source,
            injectionTime: injectionTime,
            mainFrameOnly: mainFrameOnly
        )
    }
}

@objcMembers public class RNCHeadlessWebViewManager: NSObject {
    // Singleton for shared access between module and view
    public static let shared = RNCHeadlessWebViewManager()

    private var webviews: [NSNumber: WKWebView] = [:]
    private var nextId: Int = 1

    private override init() {
        super.init()
    }

    public func createWebView() -> Int {
        var webviewId: Int = 0

        let createBlock = {
            let config = WKWebViewConfiguration()
            config.allowsInlineMediaPlayback = true

            let webview = WKWebView(frame: .zero, configuration: config)

            webviewId = self.nextId
            self.nextId += 1

            self.webviews[NSNumber(value: webviewId)] = webview
        }

        if Thread.isMainThread {
            createBlock()
        } else {
            DispatchQueue.main.sync(execute: createBlock)
        }

        return webviewId
    }

    public func getWebView(_ webviewId: Int) -> WKWebView? {
        return webviews[NSNumber(value: webviewId)]
    }

    public func loadUrl(_ webviewId: Int, url: String) {
        guard let webview = getWebView(webviewId),
              let nsUrl = URL(string: url) else {
            return
        }

        let request = URLRequest(url: nsUrl)
        DispatchQueue.main.async {
            webview.load(request)
        }
    }

    public func destroyWebView(_ webviewId: Int) {
        guard let webview = webviews[NSNumber(value: webviewId)] else {
            return
        }

        webview.stopLoading()
        webview.removeFromSuperview()
        webviews.removeValue(forKey: NSNumber(value: webviewId))
    }

    public func setScripts(_ webviewId: Int, scripts: [RNCHeadlessWebViewScriptDefinition]) {
        guard let webview = getWebView(webviewId) else {
            return
        }

        let setScriptsBlock = {
            let userContentController = webview.configuration.userContentController

            // Remove all existing user scripts
            userContentController.removeAllUserScripts()

            // Add new scripts
            for scriptDef in scripts {
                // Map our injection time enum to WKUserScriptInjectionTime
                let injectionTime: WKUserScriptInjectionTime
                switch scriptDef.injectionTime {
                case .documentStart:
                    injectionTime = .atDocumentStart
                case .documentEnd:
                    injectionTime = .atDocumentEnd
                @unknown default:
                    injectionTime = .atDocumentEnd
                }

                let userScript = WKUserScript(
                    source: scriptDef.source,
                    injectionTime: injectionTime,
                    forMainFrameOnly: scriptDef.mainFrameOnly
                )
                userContentController.addUserScript(userScript)
            }
        }

        if Thread.isMainThread {
            setScriptsBlock()
        } else {
            DispatchQueue.main.async(execute: setScriptsBlock)
        }
    }
}

