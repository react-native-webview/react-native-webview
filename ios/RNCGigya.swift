//
//  RNCGigya.swift
//  RNCWebView
//
//  Created by Martin Frouin on 19/10/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

import Foundation
import UIKit
import WebKit
import Gigya

@objc
class RNCGigya: NSObject {
  
  @objc
  static let shared = RNCGigya()
  
  func initialize(controller: UIViewController, webview: WKWebView, sessionToken: String, sessionSecret: String, apiKey: String, apiDomain: String) {
    gigya.initFor(apiKey: apiKey, apiDomain: apiDomain)

    self.attachBridge(controller: controller, webview: webview)
    self.logUser(sessionToken: sessionToken, sessionSecret: sessionSecret)
  }
  
  func attachBridge(controller: UIViewController, webview: WKWebView) {
      let webBridge = gigya.createWebBridge()
      
      webBridge.attachTo(webView: webview, viewController: controller) { _ in }
  
  }

  func logUser(sessionToken: String, sessionSecret: String) {
      let session = GigyaSession(sessionToken: sessionToken, secret: sessionSecret)
      
      if (session != nil) {
          gigya.setSession(session!)
      }
  }
  
}
