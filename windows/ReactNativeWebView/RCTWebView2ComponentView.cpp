// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "RCTWebView2ComponentView.h"
#include "ReactWebViewHelpers.h"

#ifdef RNW_NEW_ARCH

#include <winrt/Windows.Foundation.Metadata.h>
#include <winrt/Windows.System.h>
#include <winrt/Windows.Data.Json.h>
#include <winrt/Windows.Web.Http.h>
#include <winrt/Windows.Storage.Streams.h>
#include <winrt/Windows.Security.Cryptography.h>
#include <limits>
#include <optional>
#include <string>
#include <thread>

namespace winrt::ReactNativeWebView::implementation {

namespace {
// Registered via AddScriptToExecuteOnDocumentCreatedAsync (see
// ResetupDocumentStartScripts) so window.ReactNativeWebView exists before
// ANY page script runs -- including a synchronous inline <script> in
// <head>. Previously this same script was run via ExecuteScriptAsync from
// NavigationCompleted, i.e. after the page had already finished loading;
// page scripts that read window.ReactNativeWebView during load never saw
// it. Contents unchanged from the original NavigationCompleted injection.
constexpr wchar_t kMessageBridgeScript[] =
    LR"(
        window.alert = function (msg) {window.chrome.webview.postMessage(`{"type":"__alert","message":"${msg}"}`)};
        window.ReactNativeWebView = {postMessage: function (data) {window.chrome.webview.postMessage(String(data))}};
        const originalPostMessage = globalThis.postMessage;
        globalThis.postMessage = function (data) { originalPostMessage(data); globalThis.ReactNativeWebView.postMessage(typeof data == 'string' ? data : JSON.stringify(data));};
        window.chrome.webview.addEventListener('message', function(e) {
            window.dispatchEvent(new MessageEvent('message', {data: e.data}));
            document.dispatchEvent(new MessageEvent('message', {data: e.data}));
        });
    )";
} // namespace

void RegisterRCTWebView2ComponentView(
    winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder) noexcept {
    
    // Verify we can QI for IReactPackageBuilderFabric
    auto fabricBuilder = packageBuilder.try_as<winrt::Microsoft::ReactNative::IReactPackageBuilderFabric>();
    if (!fabricBuilder) {
        return;
    }
    
    RNCWebViewCodegen::RegisterRCTWebView2NativeComponent<RCTWebView2ComponentView>(
        packageBuilder,
        [](const winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder &builder) {
            builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().XamlSupport(true);
            
            // Use SetContentIslandComponentViewInitializer for XAML hosting
            builder.SetContentIslandComponentViewInitializer(
                [](const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView &islandView) noexcept {
                    auto userData = winrt::make_self<RCTWebView2ComponentView>();
                    userData->InitializeContentIsland(islandView);
                    islandView.UserData(*userData);
                });
            
            // Set up initial state with zero size
            builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetInitialStateDataFactory(
                [](const winrt::Microsoft::ReactNative::IComponentProps& /*props*/) noexcept {
                    return winrt::make<RCTWebView2StateData>(winrt::Windows::Foundation::Size{0, 0});
                });

            // Register the measure function - WebView fills available space
            builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetMeasureContentHandler(
                [](winrt::Microsoft::ReactNative::ShadowNode const& /*shadowNode*/,
                   winrt::Microsoft::ReactNative::LayoutContext const&,
                   winrt::Microsoft::ReactNative::LayoutConstraints const& constraints) noexcept {
                    // WebView should fill available space. Cap infinity to reasonable defaults.
                    float w = constraints.MaximumSize.Width;
                    float h = constraints.MaximumSize.Height;
                    if (w == std::numeric_limits<float>::infinity() || w <= 0) w = 300;
                    if (h == std::numeric_limits<float>::infinity() || h <= 0) h = 200;
                    return winrt::Windows::Foundation::Size{w, h};
                });

            // Handle state updates
            builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetUpdateStateHandler(
                [](const winrt::Microsoft::ReactNative::ComponentView& view,
                   const winrt::Microsoft::ReactNative::IComponentState& newState) noexcept {
                    try {
                        auto islandView = view.as<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView>();
                        auto userData = islandView.UserData().as<RCTWebView2ComponentView>();
                        userData->UpdateState(view, newState);
                    } catch (...) {
                        // Silently handle state update failures
                    }
                });
        });
}

void RCTWebView2ComponentView::InitializeContentIsland(
    const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView &islandView) {
    
    // Create WebView2 control
    m_webView = winrt::Microsoft::UI::Xaml::Controls::WebView2();
    m_webView.HorizontalAlignment(winrt::Microsoft::UI::Xaml::HorizontalAlignment::Stretch);
    m_webView.VerticalAlignment(winrt::Microsoft::UI::Xaml::VerticalAlignment::Stretch);

    // NOTE: SizeChanged → RefreshSize → UpdateStateWithMutation loop disabled.
    // This caused infinite recursion with sibling components (TextInput).
    // WebView fills available space via Yoga constraints instead.
    // m_webView.SizeChanged([this](auto const& /*sender*/, auto const& /*args*/) {
    //     RefreshSize();
    // });

    // Register WebView2 events
    RegisterEvents();

    // Create XamlIsland and connect
    m_island = winrt::Microsoft::UI::Xaml::XamlIsland{};
    m_island.Content(m_webView);
    islandView.Connect(m_island.ContentIsland());
    m_islandView = winrt::make_weak(islandView);

    // Tear down the XamlIsland and WebView2 when the component view is
    // destroyed. Leaving the orphaned island alive breaks input routing for
    // the entire window: after unmounting a WebView, every composition-level
    // click in the app starts failing.
    m_destroyingRevoker = islandView.Destroying(
        winrt::auto_revoke,
        [wkThis = get_weak()](auto const & /*sender*/, auto const & /*args*/) noexcept {
            if (auto strongThis = wkThis.get()) {
                strongThis->Cleanup();
            }
        });

    // Explicitly trigger CoreWebView2 initialization.
    // In XamlIsland hosting, the WebView2 won't auto-initialize its browser process.
    m_webView.EnsureCoreWebView2Async();
}

void RCTWebView2ComponentView::Cleanup() noexcept {
    // Supersede any in-flight ResetupDocumentStartScripts coroutine so it stops
    // before writing its script ID into a member of a view being torn down. Note
    // this does NOT stop it touching the CoreWebView2: on a generation mismatch it
    // still calls RemoveScriptToExecuteOnDocumentCreated on the core view that
    // Cleanup() closes just below, which then throws and is swallowed by that
    // coroutine's catch-all. Harmless, but it is a swallowed throw, not avoidance.
    ++m_documentStartScriptGeneration;
    m_bridgeScriptId = winrt::hstring{};
    m_beforeContentLoadedScriptId = winrt::hstring{};

    m_navigationStartingRevoker.revoke();
    m_navigationCompletedRevoker.revoke();
    m_CoreWebView2InitializedRevoker.revoke();
    m_webResourceRequestedRevoker.revoke();
    m_CoreWebView2DOMContentLoadedRevoker.revoke();
    m_sourceChangedRevoker.revoke();
    m_newWindowRequestedRevoker.revoke();

    try {
        if (m_webView) {
            if (m_messageToken) {
                m_webView.WebMessageReceived(m_messageToken);
                m_messageToken = {};
            }
            m_webView.Close();
            m_webView = nullptr;
        }
        if (m_island) {
            m_island.Content(nullptr);
            if (auto closable = m_island.try_as<winrt::Windows::Foundation::IClosable>()) {
                closable.Close();
            }
            m_island = nullptr;
        }
    } catch (...) {
        // Teardown must not throw
    }
}

void RCTWebView2ComponentView::UpdateProps(
    const winrt::Microsoft::ReactNative::ComponentView &view,
    const winrt::com_ptr<RNCWebViewCodegen::RCTWebView2Props> &newProps,
    const winrt::com_ptr<RNCWebViewCodegen::RCTWebView2Props> &oldProps) noexcept {
    
    try {
        BaseRCTWebView2::UpdateProps(view, newProps, oldProps);
    } catch (...) {
        // Continue with prop application even if base fails
    }
    
    if (!m_webView || !newProps) {
        return;
    }
    
    m_updating = true;

    // Snapshot the document-start script inputs BEFORE any prop member is
    // overwritten below. The dirty check at the bottom of this function
    // compares these captured old values against the members as they stand
    // after every assignment has run -- old-vs-new by construction, no matter
    // where the individual assignments sit or later move to.
    const bool previousMessagingEnabled = m_messagingEnabled;
    const winrt::hstring previousInjectedJavaScriptBeforeContentLoaded =
        m_injectedJavaScriptBeforeContentLoaded;

    // Apply messaging enabled
    m_messagingEnabled = newProps->messagingEnabled;

    // Apply link handling
    if (newProps->linkHandlingEnabled.has_value()) {
        m_linkHandlingEnabled = newProps->linkHandlingEnabled.value();
    }
    
    // Apply injected JavaScript
    if (newProps->injectedJavaScript.has_value()) {
        m_injectedJavascript = winrt::to_hstring(newProps->injectedJavaScript.value());
    }

    // Apply pre-content-load injected JavaScript. This prop already existed
    // in the codegen'd spec (RCTWebView2Props::injectedJavaScriptBeforeContentLoaded)
    // but was never read on Windows. Registered as a document-created script by
    // ResetupDocumentStartScripts; a change applies to the next navigation, not
    // to the document already loaded -- the same as a WKUserScript at
    // WKUserScriptInjectionTimeAtDocumentStart on iOS. Clearing the prop
    // removes the script, matching iOS handing nil to
    // -setInjectedJavaScriptBeforeContentLoaded:.
    m_injectedJavaScriptBeforeContentLoaded =
        newProps->injectedJavaScriptBeforeContentLoaded.has_value()
            ? winrt::to_hstring(newProps->injectedJavaScriptBeforeContentLoaded.value())
            : winrt::hstring{};

    // Apply user agent
    if (newProps->userAgent.has_value()) {
        m_userAgent = winrt::to_hstring(newProps->userAgent.value());
        if (m_webView.CoreWebView2()) {
            m_webView.CoreWebView2().Settings().UserAgent(m_userAgent);
        }
    }
    
    // Handle source navigation
    if (newProps->newSource.uri.has_value() && !newProps->newSource.uri.value().empty()) {
        try {
            auto uri = winrt::Windows::Foundation::Uri(winrt::to_hstring(newProps->newSource.uri.value()));
            m_webView.Source(uri);
        } catch (...) {
            // Invalid URI
        }
    } else if (newProps->newSource.html.has_value() && !newProps->newSource.html.value().empty()) {
        if (m_webView.CoreWebView2()) {
            try {
                m_webView.NavigateToString(winrt::to_hstring(newProps->newSource.html.value()));
            } catch (...) {
                // Navigation failed
            }
        } else {
            // CoreWebView2 not ready yet - save HTML for later navigation in OnCoreWebView2Initialized
            m_pendingHtml = newProps->newSource.html.value();
        }
    }
    
    // Apply debugging enabled
    if (newProps->webviewDebuggingEnabled.has_value() && m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().Settings().AreDevToolsEnabled(newProps->webviewDebuggingEnabled.value());
    }
    
    // Apply JavaScript enabled
    if (m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().Settings().IsScriptEnabled(newProps->javaScriptEnabled);
    }

    // Swap the document-created scripts (message bridge +
    // injectedJavaScriptBeforeContentLoaded) when either input actually
    // changed: compare the old values captured at the top of this function --
    // before the assignments above overwrote them -- against the members as
    // they now stand. The swap removes the previous script by ID and re-adds,
    // which is not free, so it must only run on a real change. Skipped until
    // CoreWebView2 exists -- OnCoreWebView2Initialized does the first
    // registration with whatever props have arrived by then.
    const bool documentStartScriptsDirty =
        m_messagingEnabled != previousMessagingEnabled ||
        m_injectedJavaScriptBeforeContentLoaded !=
            previousInjectedJavaScriptBeforeContentLoaded;
    if (documentStartScriptsDirty && m_webView.CoreWebView2()) {
        ResetupDocumentStartScripts();
    }

    m_updating = false;
}

void RCTWebView2ComponentView::RefreshSize() {
    if (!m_webView) {
        return;
    }
    
    try {
        m_webView.Measure(winrt::Windows::Foundation::Size{
            std::numeric_limits<float>::infinity(),
            std::numeric_limits<float>::infinity()
        });

        auto desiredSize = m_webView.DesiredSize();

        if (m_state) {
            auto currentState = winrt::get_self<RCTWebView2StateData>(m_state.Data());
            if (desiredSize != currentState->desiredSize) {
                m_state.UpdateStateWithMutation([desiredSize](winrt::Windows::Foundation::IInspectable /*data*/) {
                    return winrt::make<RCTWebView2StateData>(desiredSize);
                });
            }
        }
    } catch (...) {
        // RefreshSize failure is non-fatal
    }
}

void RCTWebView2ComponentView::UpdateState(
    const winrt::Microsoft::ReactNative::ComponentView& /*view*/,
    const winrt::Microsoft::ReactNative::IComponentState& newState) noexcept {
    m_state = newState;
}

void RCTWebView2ComponentView::UpdateLayoutMetrics(
    const winrt::Microsoft::ReactNative::ComponentView& /*view*/,
    const winrt::Microsoft::ReactNative::LayoutMetrics& newLayoutMetrics,
    const winrt::Microsoft::ReactNative::LayoutMetrics& /*oldLayoutMetrics*/) noexcept {
    if (m_webView && newLayoutMetrics.Frame.Width > 0 && newLayoutMetrics.Frame.Height > 0) {
        m_webView.Width(newLayoutMetrics.Frame.Width);
        m_webView.Height(newLayoutMetrics.Frame.Height);
    }
}

void RCTWebView2ComponentView::RegisterEvents() {
    if (!m_webView) return;
    
    m_navigationStartingRevoker = m_webView.NavigationStarting(
        winrt::auto_revoke, [this](auto const& /*sender*/, auto const& args) {
            OnNavigationStarting(args);
        });

    m_navigationCompletedRevoker = m_webView.NavigationCompleted(
        winrt::auto_revoke, [this](auto const& /*sender*/, auto const& args) {
            OnNavigationCompleted(args);
        });

    m_CoreWebView2InitializedRevoker = m_webView.CoreWebView2Initialized(
        winrt::auto_revoke, [this](auto const& /*sender*/, auto const& args) {
            OnCoreWebView2Initialized(args);
        });
}

void RCTWebView2ComponentView::RegisterCoreWebView2Events() {
    if (!m_webView || !m_webView.CoreWebView2()) return;
    
    auto coreWebView = m_webView.CoreWebView2();
    
    m_webResourceRequestedRevoker = coreWebView.WebResourceRequested(
        winrt::auto_revoke,
        [this](auto const& sender, auto const& args) {
            OnCoreWebView2ResourceRequested(sender, args);
        });

    m_CoreWebView2DOMContentLoadedRevoker = coreWebView.DOMContentLoaded(
        winrt::auto_revoke,
        [this](auto const& sender, auto const& args) {
            OnCoreWebView2DOMContentLoaded(sender, args);
        });

    m_sourceChangedRevoker = coreWebView.SourceChanged(
        winrt::auto_revoke,
        [this](auto const& sender, auto const& args) {
            OnCoreWebView2SourceChanged(sender, args);
        });

    m_newWindowRequestedRevoker = coreWebView.NewWindowRequested(
        winrt::auto_revoke,
        [this](auto const& sender, auto const& args) {
            OnCoreWebView2NewWindowRequested(sender, args);
        });
}

bool RCTWebView2ComponentView::Is17763OrHigher() {
    static std::optional<bool> hasUniversalAPIContract_v7;
    if (!hasUniversalAPIContract_v7.has_value()) {
        hasUniversalAPIContract_v7 = winrt::Windows::Foundation::Metadata::ApiInformation::IsApiContractPresent(
            L"Windows.Foundation.UniversalApiContract", 7);
    }
    return hasUniversalAPIContract_v7.value();
}

void RCTWebView2ComponentView::OnNavigationStarting(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationStartingEventArgs const& /*args*/) {
    
    try {
        if (auto eventEmitter = EventEmitter()) {
            RNCWebViewCodegen::RCTWebView2EventEmitter::OnLoadingStart event;
            if (m_webView && m_webView.Source()) {
                event.url = winrt::to_string(m_webView.Source().AbsoluteCanonicalUri());
            }
            event.loading = true;
            event.canGoBack = m_webView ? m_webView.CanGoBack() : false;
            event.canGoForward = m_webView ? m_webView.CanGoForward() : false;
            event.navigationType = "other";
            eventEmitter->onLoadingStart(event);
        }
    } catch (...) {
        // Event dispatch failure is non-fatal
    }

    // WebMessageReceived is now registered once, at CoreWebView2 init (see
    // OnCoreWebView2Initialized), instead of being re-registered on every
    // navigation start.
}

void RCTWebView2ComponentView::OnNavigationCompleted(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationCompletedEventArgs const& /*args*/) {
    
    try {
        if (auto eventEmitter = EventEmitter()) {
            RNCWebViewCodegen::RCTWebView2EventEmitter::OnLoadingFinish event;
            if (m_webView && m_webView.Source()) {
                event.url = winrt::to_string(m_webView.Source().AbsoluteCanonicalUri());
            }
            event.loading = false;
            event.canGoBack = m_webView ? m_webView.CanGoBack() : false;
            event.canGoForward = m_webView ? m_webView.CanGoForward() : false;
            event.navigationType = "other";
            eventEmitter->onLoadingFinish(event);
        }
    } catch (...) {
        // Event dispatch failure is non-fatal
    }

    // The message bridge is registered as a document-created script (see
    // ResetupDocumentStartScripts), rather than re-injected here on every
    // completed navigation -- see kMessageBridgeScript for why.
}

void RCTWebView2ComponentView::OnCoreWebView2Initialized(
    winrt::Microsoft::UI::Xaml::Controls::CoreWebView2InitializedEventArgs const& /*args*/) {
    
    if (!m_webView || !m_webView.CoreWebView2()) return;

    RegisterCoreWebView2Events();

    // window.ReactNativeWebView (when messagingEnabled) + (optional)
    // injectedJavaScriptBeforeContentLoaded.
    ResetupDocumentStartScripts();

    // WebMessageReceived is registered once here rather than on every
    // NavigationStarting. It is registered unconditionally and the handler
    // checks the current messagingEnabled instead: the JS side derives
    // messagingEnabled from `typeof onMessage === 'function'`, so it can flip
    // to true after mount, and this way there is no handler to re-hook when it
    // does.
    if (m_messageToken) {
        m_webView.WebMessageReceived(m_messageToken);
    }
    m_messageToken = m_webView.WebMessageReceived(
        [this](auto const& /*sender*/, winrt::Microsoft::Web::WebView2::Core::CoreWebView2WebMessageReceivedEventArgs const& messageArgs) {
            if (!m_messagingEnabled) {
                return;
            }
            try {
                auto message = messageArgs.TryGetWebMessageAsString();
                OnMessagePosted(message);
            } catch (...) {
                return;
            }
        });

    // Apply user agent if set
    if (!m_userAgent.empty()) {
        m_webView.CoreWebView2().Settings().UserAgent(m_userAgent);
    }

    // Navigate to deferred HTML source if pending
    if (!m_pendingHtml.empty()) {
        try {
            m_webView.NavigateToString(winrt::to_hstring(m_pendingHtml));
        } catch (...) {
            // Deferred navigation failed
        }
        m_pendingHtml.clear();
    }
}

winrt::fire_and_forget RCTWebView2ComponentView::ResetupDocumentStartScripts() {
    auto strongThis = get_strong();

    // Called on the UI thread; every CoreWebView2 call and every member write
    // below has to stay there, so hop back after each co_await instead of
    // trusting the async completion to resume in this apartment.
    winrt::apartment_context uiThread;

    // Any call supersedes an earlier one that is still awaiting an
    // AddScriptToExecuteOnDocumentCreatedAsync completion.
    const uint32_t generation = ++strongThis->m_documentStartScriptGeneration;

    try {
        if (!strongThis->m_webView || !strongThis->m_webView.CoreWebView2()) {
            co_return;
        }
        auto coreWebView = strongThis->m_webView.CoreWebView2();

        // Drop whatever is registered now. RemoveScriptToExecuteOnDocumentCreated
        // is synchronous and takes the ID the matching Add call returned. The
        // members are cleared first so a throw cannot leave a stale ID behind,
        // and each removal is isolated so that failing to remove one script
        // still registers the new ones below.
        const winrt::hstring previousBridgeScriptId = strongThis->m_bridgeScriptId;
        const winrt::hstring previousBeforeContentLoadedScriptId =
            strongThis->m_beforeContentLoadedScriptId;
        strongThis->m_bridgeScriptId = winrt::hstring{};
        strongThis->m_beforeContentLoadedScriptId = winrt::hstring{};
        if (!previousBridgeScriptId.empty()) {
            try {
                coreWebView.RemoveScriptToExecuteOnDocumentCreated(previousBridgeScriptId);
            } catch (...) {
                // Already gone (e.g. a recreated CoreWebView2).
            }
        }
        if (!previousBeforeContentLoadedScriptId.empty()) {
            try {
                coreWebView.RemoveScriptToExecuteOnDocumentCreated(previousBeforeContentLoadedScriptId);
            } catch (...) {
                // Already gone (e.g. a recreated CoreWebView2).
            }
        }

        // Read the props once: they can change again while the Add calls below
        // are in flight, and that change bumps the generation.
        const bool messagingEnabled = strongThis->m_messagingEnabled;
        const winrt::hstring beforeContentLoaded =
            strongThis->m_injectedJavaScriptBeforeContentLoaded;

        if (messagingEnabled) {
            const auto scriptId =
                co_await coreWebView.AddScriptToExecuteOnDocumentCreatedAsync(kMessageBridgeScript);

            // The script is registered from here on, so until its ID reaches the
            // member every exit has to remove it. Letting a throw escape with the
            // ID only in this local would orphan the registration: the next call
            // would read an empty m_bridgeScriptId, remove nothing, and Add a
            // SECOND bridge -- and because kMessageBridgeScript is not
            // IIFE-wrapped, its top-level `const originalPostMessage` would then
            // be a redeclaration and the second copy would die on a SyntaxError.
            // co_await on an apartment_context is check_hresult'd and can throw,
            // and so can Remove, hence the explicit handling on both.
            bool keepScript = false;
            try {
                co_await uiThread;
                keepScript = (generation == strongThis->m_documentStartScriptGeneration);
                if (keepScript) {
                    strongThis->m_bridgeScriptId = scriptId;
                }
            } catch (...) {
                keepScript = false;
            }
            if (!keepScript) {
                // Either the hop failed, or a newer call (or Cleanup) took over
                // while this one was in flight. Undo the Add and let that one win.
                // Best effort: if this Remove also fails the script stays
                // registered, but no ID is stored, which is the one residual case
                // the redeclaration guard cannot cover.
                try {
                    coreWebView.RemoveScriptToExecuteOnDocumentCreated(scriptId);
                } catch (...) {
                }
                co_return;
            }
        }

        // Registered whether or not messaging is enabled, matching iOS
        // (-resetupScripts: adds atStartScript outside the messagingEnabled
        // branch) and Android (callInjectedJavaScriptBeforeContentLoaded runs
        // from onPageStarted regardless of messagingEnabled).
        if (!beforeContentLoaded.empty()) {
            const auto scriptId =
                co_await coreWebView.AddScriptToExecuteOnDocumentCreatedAsync(beforeContentLoaded);

            // Same ownership window as the bridge script above: registered now,
            // so every exit before the member write has to remove it.
            bool keepScript = false;
            try {
                co_await uiThread;
                keepScript = (generation == strongThis->m_documentStartScriptGeneration);
                if (keepScript) {
                    strongThis->m_beforeContentLoadedScriptId = scriptId;
                }
            } catch (...) {
                keepScript = false;
            }
            if (!keepScript) {
                try {
                    coreWebView.RemoveScriptToExecuteOnDocumentCreated(scriptId);
                } catch (...) {
                }
                co_return;
            }
        }
    } catch (...) {
        // Script registration failure is non-fatal: the page still loads,
        // just without window.ReactNativeWebView / the pre-content script.
        // Nothing may escape a fire_and_forget -- it would terminate the app.
    }
}

void RCTWebView2ComponentView::OnCoreWebView2ResourceRequested(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& /*sender*/,
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2WebResourceRequestedEventArgs const& /*args*/) {
    // Handle web resource requests if needed
}

void RCTWebView2ComponentView::OnCoreWebView2DOMContentLoaded(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& sender,
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2DOMContentLoadedEventArgs const& /*args*/) {
    
    if (!m_injectedJavascript.empty()) {
        sender.ExecuteScriptAsync(m_injectedJavascript);
    }
}

void RCTWebView2ComponentView::OnCoreWebView2SourceChanged(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& /*sender*/,
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2SourceChangedEventArgs const& /*args*/) {
    
    if (auto eventEmitter = EventEmitter()) {
        RNCWebViewCodegen::RCTWebView2EventEmitter::OnSourceChanged event;
        if (m_webView && m_webView.Source()) {
            event.url = winrt::to_string(m_webView.Source().AbsoluteCanonicalUri());
        }
        event.loading = false;
        event.canGoBack = m_webView ? m_webView.CanGoBack() : false;
        event.canGoForward = m_webView ? m_webView.CanGoForward() : false;
        event.navigationType = "other";
        eventEmitter->onSourceChanged(event);
    }
}

void RCTWebView2ComponentView::OnCoreWebView2NewWindowRequested(
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2 const& /*sender*/,
    winrt::Microsoft::Web::WebView2::Core::CoreWebView2NewWindowRequestedEventArgs const& args) {
    
    if (m_linkHandlingEnabled) {
        if (auto eventEmitter = EventEmitter()) {
            RNCWebViewCodegen::RCTWebView2EventEmitter::OnOpenWindow event;
            event.targetUrl = winrt::to_string(args.Uri());
            eventEmitter->onOpenWindow(event);
        }
        args.Handled(true);
    } else {
        try {
            winrt::Windows::Foundation::Uri uri(args.Uri());
            winrt::Windows::System::Launcher::LaunchUriAsync(uri);
            args.Handled(true);
        } catch (winrt::hresult_error&) {
            // Do Nothing
        }
    }
}

void RCTWebView2ComponentView::OnMessagePosted(winrt::hstring const& message) {
    HandleMessageFromJS(message);
}

void RCTWebView2ComponentView::HandleMessageFromJS(winrt::hstring const& message) {
    try {
        winrt::Windows::Data::Json::JsonObject jsonObject;
        if (winrt::Windows::Data::Json::JsonObject::TryParse(message, jsonObject) && jsonObject.HasKey(L"type")) {
            if (auto v = jsonObject.Lookup(L"type"); v && v.ValueType() == winrt::Windows::Data::Json::JsonValueType::String) {
                auto type = v.GetString();
                if (type == L"__alert") {
                    // Use Win32 MessageBoxW instead of UWP MessageDialog which is incompatible
                    // with Win32/WinAppSDK Composition apps. MessageBoxW blocks its calling
                    // thread, so run it detached to keep the UI thread responsive while the
                    // dialog is up.
                    std::wstring alertMsg{jsonObject.GetNamedString(L"message")};
                    std::thread([msg = std::move(alertMsg)]() {
                        MessageBoxW(nullptr, msg.c_str(), L"Alert", MB_OK);
                    }).detach();
                    return;
                }
            }
        }

        if (auto eventEmitter = EventEmitter()) {
            RNCWebViewCodegen::RCTWebView2EventEmitter::OnMessage event;
            if (m_webView && m_webView.Source()) {
                event.url = winrt::to_string(m_webView.Source().AbsoluteCanonicalUri());
            }
            event.data = winrt::to_string(message);
            event.loading = false;
            event.canGoBack = m_webView ? m_webView.CanGoBack() : false;
            event.canGoForward = m_webView ? m_webView.CanGoForward() : false;
            eventEmitter->onMessage(event);
        }
    } catch (...) {
        // Message handling failure is non-fatal
    }
}

void RCTWebView2ComponentView::WriteCookiesToWebView2(std::string const& cookies) {
    if (!m_webView || !m_webView.CoreWebView2()) return;
    
    auto cookieManager = m_webView.CoreWebView2().CookieManager();
    auto cookiesList = ReactWebViewHelpers::SplitString(cookies, ";,");
    for (const auto& cookie_str : cookiesList) {
        auto cookieData = ReactWebViewHelpers::ParseSetCookieHeader(ReactWebViewHelpers::TrimString(cookie_str));

        if (!cookieData.count("Name") || !cookieData.count("Value")) {
            continue;
        }

        auto cookie = cookieManager.CreateCookie(
            winrt::to_hstring(cookieData["Name"]),
            winrt::to_hstring(cookieData["Value"]),
            cookieData.count("Domain") ? winrt::to_hstring(cookieData["Domain"]) : L"",
            cookieData.count("Path") ? winrt::to_hstring(cookieData["Path"]) : L"");
        cookieManager.AddOrUpdateCookie(cookie);
    }
}

// Command handlers
void RCTWebView2ComponentView::HandleGoBackCommand() noexcept {
    if (m_webView && m_webView.CanGoBack()) {
        m_webView.GoBack();
    }
}

void RCTWebView2ComponentView::HandleGoForwardCommand() noexcept {
    if (m_webView && m_webView.CanGoForward()) {
        m_webView.GoForward();
    }
}

void RCTWebView2ComponentView::HandleReloadCommand() noexcept {
    if (m_webView) {
        m_webView.Reload();
    }
}

void RCTWebView2ComponentView::HandleStopLoadingCommand() noexcept {
    if (m_webView && m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().Stop();
    }
}

void RCTWebView2ComponentView::HandleInjectJavaScriptCommand(std::string javascript) noexcept {
    if (m_webView && m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().ExecuteScriptAsync(winrt::to_hstring(javascript));
    }
}

void RCTWebView2ComponentView::HandleRequestFocusCommand() noexcept {
    if (m_webView) {
        m_webView.Focus(winrt::Microsoft::UI::Xaml::FocusState::Programmatic);
    }
}

void RCTWebView2ComponentView::HandlePostMessageCommand(std::string data) noexcept {
    if (m_webView && m_webView.CoreWebView2()) {
        m_webView.CoreWebView2().PostWebMessageAsString(winrt::to_hstring(data));
    }
}

void RCTWebView2ComponentView::HandleLoadUrlCommand(std::string url) noexcept {
    if (m_webView) {
        m_webView.Source(winrt::Windows::Foundation::Uri(winrt::to_hstring(url)));
    }
}

void RCTWebView2ComponentView::HandleClearCacheCommand(bool /*includeDiskFiles*/) noexcept {
    if (m_webView && m_webView.CoreWebView2()) {
        auto profile = m_webView.CoreWebView2().Profile();
        if (profile) {
            profile.ClearBrowsingDataAsync();
        }
    }
}

} // namespace winrt::ReactNativeWebView::implementation

#endif // RNW_NEW_ARCH
