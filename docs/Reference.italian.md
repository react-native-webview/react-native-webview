# Riferimento all'API di React Native WebView

Questo documento elenca le attuali proprietà e metodi pubblici di React Native WebView.

## Indice delle Props

- [`source`](Reference.italian.md#source)
- [`automaticallyAdjustContentInsets`](Reference.italian.md#automaticallyadjustcontentinsets)
- [`automaticallyAdjustsScrollIndicatorInsets`](Reference.italian.md#automaticallyAdjustsScrollIndicatorInsets)
- [`injectedJavaScript`](Reference.italian.md#injectedjavascript)
- [`injectedJavaScriptBeforeContentLoaded`](Reference.italian.md#injectedjavascriptbeforecontentloaded)
- [`injectedJavaScriptForMainFrameOnly`](Reference.italian.md#injectedjavascriptformainframeonly)
- [`injectedJavaScriptBeforeContentLoadedForMainFrameOnly`](Reference.italian.md#injectedjavascriptbeforecontentloadedformainframeonly)
- [`mediaPlaybackRequiresUserAction`](Reference.italian.md#mediaplaybackrequiresuseraction)
- [`nativeConfig`](Reference.italian.md#nativeconfig)
- [`onError`](Reference.italian.md#onerror)
- [`onRenderProcessGone`](Reference.italian.md#onRenderProcessGone)
- [`onLoad`](Reference.italian.md#onload)
- [`onLoadEnd`](Reference.italian.md#onloadend)
- [`onLoadStart`](Reference.italian.md#onloadstart)
- [`onLoadProgress`](Reference.italian.md#onloadprogress)
- [`onHttpError`](Reference.italian.md#onhttperror)
- [`onMessage`](Reference.italian.md#onmessage)
- [`onNavigationStateChange`](Reference.italian.md#onnavigationstatechange)
- [`onContentProcessDidTerminate`](Reference.italian.md#oncontentprocessdidterminate)
- [`onScroll`](Reference.italian.md#onscroll)
- [`originWhitelist`](Reference.italian.md#originwhitelist)
- [`renderError`](Reference.italian.md#rendererror)
- [`renderLoading`](Reference.italian.md#renderloading)
- [`scalesPageToFit`](Reference.italian.md#scalespagetofit)
- [`onShouldStartLoadWithRequest`](Reference.italian.md#onshouldstartloadwithrequest)
- [`startInLoadingState`](Reference.italian.md#startinloadingstate)
- [`style`](Reference.italian.md#style)
- [`containerStyle`](Reference.italian.md#containerStyle)
- [`decelerationRate`](Reference.italian.md#decelerationrate)
- [`domStorageEnabled`](Reference.italian.md#domstorageenabled)
- [`javaScriptEnabled`](Reference.italian.md#javascriptenabled)
- [`javaScriptCanOpenWindowsAutomatically`](Reference.italian.md#javascriptcanopenwindowsautomatically)
- [`androidLayerType`](Reference.italian.md#androidLayerType)
- [`mixedContentMode`](Reference.italian.md#mixedcontentmode)
- [`thirdPartyCookiesEnabled`](Reference.italian.md#thirdpartycookiesenabled)
- [`userAgent`](Reference.italian.md#useragent)
- [`applicationNameForUserAgent`](Reference.italian.md#applicationNameForUserAgent)
- [`allowsFullscreenVideo`](Reference.italian.md#allowsfullscreenvideo)
- [`allowsInlineMediaPlayback`](Reference.italian.md#allowsinlinemediaplayback)
- [`allowsAirPlayForMediaPlayback`](Reference.italian.md#allowsAirPlayForMediaPlayback)
- [`bounces`](Reference.italian.md#bounces)
- [`overScrollMode`](Reference.italian.md#overscrollmode)
- [`contentInset`](Reference.italian.md#contentinset)
- [`contentInsetAdjustmentBehavior`](Reference.italian.md#contentInsetAdjustmentBehavior)
- [`contentMode`](Reference.italian.md#contentMode)
- [`dataDetectorTypes`](Reference.italian.md#datadetectortypes)
- [`scrollEnabled`](Reference.italian.md#scrollenabled)
- [`nestedScrollEnabled`](Reference.italian.md#nestedscrollenabled)
- [`setBuiltInZoomControls`](Reference.italian.md#setBuiltInZoomControls)
- [`setDisplayZoomControls`](Reference.italian.md#setDisplayZoomControls)
- [`directionalLockEnabled`](Reference.italian.md#directionalLockEnabled)
- [`geolocationEnabled`](Reference.italian.md#geolocationenabled)
- [`allowFileAccessFromFileURLs`](Reference.italian.md#allowFileAccessFromFileURLs)
- [`allowUniversalAccessFromFileURLs`](Reference.italian.md#allowUniversalAccessFromFileURLs)
- [`allowingReadAccessToURL`](Reference.italian.md#allowingReadAccessToURL)
- [`keyboardDisplayRequiresUserAction`](Reference.italian.md#keyboardDisplayRequiresUserAction)
- [`hideKeyboardAccessoryView`](Reference.italian.md#hidekeyboardaccessoryview)
- [`allowsBackForwardNavigationGestures`](Reference.italian.md#allowsbackforwardnavigationgestures)
- [`incognito`](Reference.italian.md#incognito)
- [`allowFileAccess`](Reference.italian.md#allowFileAccess)
- [`saveFormDataDisabled`](Reference.italian.md#saveFormDataDisabled)
- [`cacheEnabled`](Reference.italian.md#cacheEnabled)
- [`cacheMode`](Reference.italian.md#cacheMode)
- [`pagingEnabled`](Reference.italian.md#pagingEnabled)
- [`allowsLinkPreview`](Reference.italian.md#allowsLinkPreview)
- [`sharedCookiesEnabled`](Reference.italian.md#sharedCookiesEnabled)
- [`textZoom`](Reference.italian.md#textZoom)
- [`pullToRefreshEnabled`](Reference.italian.md#pullToRefreshEnabled)
- [`ignoreSilentHardwareSwitch`](Reference.italian.md#ignoreSilentHardwareSwitch)
- [`onFileDownload`](Reference.italian.md#onFileDownload)
- [`limitsNavigationsToAppBoundDomains`](Reference.italian.md#limitsNavigationsToAppBoundDomains)
- [`textInteractionEnabled`](Reference.italian.md#textInteractionEnabled)
- [`mediaCapturePermissionGrantType`](Reference.italian.md#mediaCapturePermissionGrantType)
- [`autoManageStatusBarEnabled`](Reference.italian.md#autoManageStatusBarEnabled)
- [`setSupportMultipleWindows`](Reference.italian.md#setSupportMultipleWindows)
- [`basicAuthCredential`](Reference.italian.md#basicAuthCredential)
- [`enableApplePay`](Reference.italian.md#enableApplePay)
- [`forceDarkOn`](Reference.italian.md#forceDarkOn)
- [`useWebView2`](Reference.italian.md#useWebView2)
- [`minimumFontSize`](Reference.italian.md#minimumFontSize)
- [`downloadingMessage`](Reference.italian.md#downloadingMessage)
- [`lackPermissionToDownloadMessage`](Reference.italian.md#lackPermissionToDownloadMessage)
- [`allowsProtectedMedia`](Reference.italian.md#allowsProtectedMedia)
- [`webviewDebuggingEnabled`](Reference.italian.md#webviewDebuggingEnabled)

## Methods Index

- [`goForward`](Reference.italian.md#goforward)
- [`goBack`](Reference.italian.md#goback)
- [`reload`](Reference.italian.md#reload)
- [`stopLoading`](Reference.italian.md#stoploading)
- [`injectJavaScript`](Reference.italian.md#injectjavascriptstr)
- [`clearFormData`](Reference.italian.md#clearFormData)
- [`clearCache`](Reference.italian.md#clearCachebool)
- [`clearHistory`](Reference.italian.md#clearHistory)
- [`requestFocus`](Reference.italian.md#requestFocus)
- [`postMessage`](Reference.italian.md#postmessagestr)

---

# Riferimento

## Props

### `source`[⬆](#props-index)
Carica HTML statico o un URI (con eventuali header) nella WebView. Si noti che l'HTML statico richiederà l'impostazione di [`originWhitelist`](Reference.italian.md#originWhiteList) a `["*"]`.

L'oggetto passato a `source` può avere una delle seguenti forme:

**Caricamento di un URI**
- `uri` (string) - L'URI da caricare nel `WebView`. Può essere un file locale o remoto e può essere modificato con lo stato o le props di React per navigare verso una nuova pagina.
- `method` (string) - Il metodo HTTP da utilizzare. Se non specificato, il valore predefinito è GET. Su Android e Windows, i metodi supportati sono solo GET e POST.
- `headers` (object) - Intestazioni HTTP aggiuntive da inviare con la richiesta. Su Android, queste possono essere utilizzate solo con richieste GET. Consulta la [Guida](Guida.italian.md#impostazione-degli-header-personalizzati) per ulteriori informazioni sull'impostazione di header personalizzati.
- `body` (string) - Il body HTTP da inviare con la richiesta. Deve essere una stringa valida in formato UTF-8 e verrà inviata esattamente come specificato, senza ulteriori codifiche (ad esempio, URL-escaping o base64) applicate. Su Android e Windows, questo può essere utilizzato solo con richieste POST.

**HTML Statico**
_Note that using static HTML requires the WebView property [originWhiteList](Reference.italian.md#originWhiteList) to `['*']`. For some content, such as video embeds (e.g. Twitter or Facebook posts with video), the baseUrl needs to be set for the video playback to work_

- `html` (string) -  Una pagina HTML statica da visualizzare nel WebView.
- `baseUrl` (string) - L'URL di base da utilizzare per i link relativi nell'HTML. Questo viene utilizzato anche per l'header dell'origine con le richieste CORS effettuate dal WebView. Consulta la documentazione di [Android WebView](https://developer.android.com/reference/android/webkit/WebView#loadDataWithBaseURL) per ulteriori informazioni.

| Tipo   | Obbligatorio |
| ------ | ------------ |
| object | No           |

---

### `automaticallyAdjustContentInsets`[⬆](#props-index)
Controlla se regolare l'inset del contenuto per le web view posizionate dietro una barra di navigazione, una barra delle schede o una barra degli strumenti. Il valore predefinito è `true`.

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | iOS          |

---

### `automaticallyAdjustsScrollIndicatorInsets`[⬆](#props-index)
Controlla se regolare l'inset dell'indicatore di scroll per le web view posizionate dietro una barra di navigazione, una barra delle schede o una barra degli strumenti. Il valore predefinito è `false`. (iOS 13+)

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | iOS(13+)     |

---

### `injectedJavaScript`[⬆](#props-index)
Imposta questo per fornire del codice JavaScript che verrà iniettato nella pagina web dopo il completamento del caricamento del documento, ma prima del completamento del caricamento di altre risorse secondarie.

Assicurati che la stringa abbia un tipo valido (`true` funziona) e non generi eccezioni.

Su iOS, consulta [`WKUserScriptInjectionTimeAtDocumentEnd`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentend?language=objc). Assicurati di impostare un handler [`onMessage`](Reference.italian.md#onmessage), anche se è una funzione vuota, altrimenti il codice non verrà eseguito.

| Tipo   | Obbligatorio | Piattaforma                  |
| ------ | ------------ | ---------------------------- |
| string | No           | iOS, Android, macOS, Windows |

Per saperne di più leggi la guida [Comunicazione tra JS e Native](Guide.italian.md#comunicazione-tra-js-e-native).

N.B.: Windows non ha [supporto nativo per gli alert](https://github.com/MicrosoftDocs/winrt-api/blob/docs/windows.ui.xaml.controls/webview.md#use-of-alert), pertanto eventuali script che mostrano un alert non funzioneranno.

Esempio:

Invia un messaggio contenente `window.location` sottoforma di un oggetto JSON  da gestire tramite [`onMessage`](Reference.italian.md#onmessage):

```jsx
const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
})();`;

<WebView
  source={{ uri: 'https://reactnative.dev' }}
  injectedJavaScript={INJECTED_JAVASCRIPT}
  onMessage={this.onMessage}
/>;
```

---

### `injectedJavaScriptBeforeContentLoaded`[⬆](#props-index)
Imposta questo per passare del codice JavaScript che verrà iniettato nella pagina web dopo la creazione dell'elemento del documento, ma prima del completamento del caricamento di altre risorse secondarie.

Assicurati che la stringa abbia un tipo valido (`true` funziona) e non generi eccezioni.

Su iOS, consulta [`WKUserScriptInjectionTimeAtDocumentStart`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentstart?language=objc).

> **Avviso**
> Su Android, funziona, ma non è affidabile al 100% (vedi [#1609](https://github.com/react-native-webview/react-native-webview/issues/1609) e [#1099](https://github.com/react-native-webview/react-native-webview/pull/1099)).

| Tipo   | Obbligatorio | Piattaforma                        |
| ------ | ------------ | ---------------------------------- |
| string | No           | iOS, macOS, Android (experimental) |

Per saperne di più leggi la guida [Comunicazione tra JS e Native](Guide.italian.md#comunicazione-tra-js-e-native).

Esempio:

Invia un messaggio contenente `window.location` sottoforma di un oggetto JSON  da gestire tramite [`onMessage`](Reference.italian.md#onmessage). `window.ReactNativeWebView.postMessage` questa volta _sarà_ disponibile.

```jsx
const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
})();`;

<WebView
  source={{ uri: 'https://reactnative.dev' }}
  injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
  onMessage={this.onMessage}
/>;
```

---

### `injectedJavaScriptForMainFrameOnly`[⬆](#props-index)
If `true` (default; mandatory for Android), loads the `injectedJavaScript` only into the main frame.

If `false`, (only supported on iOS and macOS), loads it into all frames (e.g. iframes).

| Tipo | Obbligatorio | Piattaforma                                              |
| ---- | ------------ | -------------------------------------------------------- |
| bool | No           | iOS e macOS (Android ha supporto solo quando è `true`) |

---

### `injectedJavaScriptBeforeContentLoadedForMainFrameOnly`[⬆](#props-index)
If `true` (default; mandatory for Android), loads the `injectedJavaScriptBeforeContentLoaded` only into the main frame.

If `false`, (only supported on iOS and macOS), loads it into all frames (e.g. iframes).

| Tipo | Obbligatorio | Piattaforma                                              |
| ---- | ------------ | -------------------------------------------------------- |
| bool | No           | iOS e macOS (Android ha supporto solo quando è `true`) |

---

### `mediaPlaybackRequiresUserAction`[⬆](#props-index)
Boolean che determina se è necessario che l'audio e il video HTML5 richiedano all'utente di interagire prima di avviare la riproduzione. Il valore predefinito è `true`. (Versione minima dell'API Android 17).

NOTA: il valore predefinito `true` potrebbe causare il blocco del caricamento di alcuni video su iOS. Impostarlo su `false` potrebbe risolvere questo problema.

| Tipo | Obbligatorio | Piattaforma         |
| ---- | ------------ | ------------------- |
| bool | No           | iOS, Android, macOS |

---

### `nativeConfig`[⬆](#props-index)
Sovrascrive il componente nativo utilizzato per il render della WebView. Consente di utilizzare una WebView nativa personalizzata che usa lo stesso JavaScript della WebView originale.

La prop `nativeConfig` si aspetta un oggetto con le seguenti chiavi:

- `component` (any)
- `props` (object)
- `viewManager` (object)

| Tipo   | Obbligatorio | Piattaforma         |
| ------ | ------------ | ------------------- |
| object | No           | iOS, Android, macOS |

---

### `onError`[⬆](#props-index)
Funzione che viene invocata quando il caricamento della `WebView` non riesce.

| Tipo     | Obbligatorio |
| -------- | ------------ |
| function | No           |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onError={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('Errore WebView: ', nativeEvent);
  }}
/>
```

La funzione passata a `onError` viene chiamata con un evento sintetico (`SyntheticEvent`) che racchiude un evento nativo con le seguenti proprietà:

```
canGoBack
canGoForward
code
description
didFailProvisionalNavigation
domain
loading
target
title
url
```

> **_Nota_**
> Domain è solo usato su iOS

Il `syntheticEvent` può essere interrotto nell'esecuzione dell'azione predefinita chiamando `syntheticEvent.preventDefault()`.

---

### `onLoad`[⬆](#props-index)
Funzione che viene invocata quando il caricamento della `WebView` è completato.

| Tipo     | Obbligatorio |
| -------- | ------------ |
| function | No           |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoad={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    this.url = nativeEvent.url;
  }}
/>
```

La funzione passata a `onLoad` viene chiamata con un evento sintetico (`SyntheticEvent`) che racchiude un evento nativo con le seguenti proprietà:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadEnd`[⬆](#props-index)
Funzione che viene invocata quando il caricamento della `WebView` va a buon fine o fallisce.

| Tipo     | Obbligatorio |
| -------- | ------------ |
| function | No           |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoadEnd={(syntheticEvent) => {
    // update component to be aware of loading status
    const { nativeEvent } = syntheticEvent;
    this.isLoading = nativeEvent.loading;
  }}
/>
```

La funzione passata a `onLoadEnd` viene chiamata con un evento sintetico (`SyntheticEvent`) che racchiude un evento nativo con le seguenti proprietà:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadStart`[⬆](#props-index)
Funzione che viene invocata quando il caricamento della `WebView` inizia.

| Tipo     | Obbligatorio |
| -------- | ------------ |
| function | No           |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev/=' }}
  onLoadStart={(syntheticEvent) => {
    // update component to be aware of loading status
    const { nativeEvent } = syntheticEvent;
    this.isLoading = nativeEvent.loading;
  }}
/>
```

La funzione passata a `onLoadStart` viene chiamata con un evento sintetico (`SyntheticEvent`) che racchiude un evento nativo con le seguenti proprietà:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadProgress`[⬆](#props-index)
Funzione che viene invocata quando la `WebView` sta caricando.

| Tipo     | Obbligatorio | Piattaforma             |
| -------- | ------------ | ------------------- |
| function | No           | iOS, Android, macOS |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoadProgress={({ nativeEvent }) => {
    this.loadingProgress = nativeEvent.progress;
  }}
/>
```

La funzione passata a `onLoadProgress` viene chiamata con un evento sintetico (`SyntheticEvent`) che racchiude un evento nativo con le seguenti proprietà:

```
canGoBack
canGoForward
loading
progress
target
title
url
```

---

### `onHttpError`[⬆](#props-index)
Funzione che viene invocata quando la `WebView` riceve un errore HTTP.

> **_Nota_**
> Versione minima dell'API Android 23.

| Tipo     | Obbligatorio |
| -------- | ------------ |
| function | No           |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onHttpError={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn(
      'WebView received error status code: ',
      nativeEvent.statusCode,
    );
  }}
/>
```

La funzione passata a `onHttpError` viene chiamata con un evento sintetico (`SyntheticEvent`) che racchiude un evento nativo con le seguenti proprietà:

```
canGoBack
canGoForward
description
loading
statusCode
target
title
url
```

> **_Note_**
> Description è usata solo su Android

---

### `onRenderProcessGone`[⬆](#props-index)
Funzione che viene invocata quando il processo della `WebView` si arresta in modo anomalo o viene interrotto dal sistema operativo su Android.

> **_Nota_**
> Versione minima dell'API Android. Solo Android

| Tipo     | Obbligatorio |
| -------- | ------------ |
| function | No           |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onRenderProcessGone={syntheticEvent => {
    const { nativeEvent } = syntheticEvent;
    console.warn(
      'La WebView ha crashato: ',
      nativeEvent.didCrash,
    );
  }}
/>
```

La funzione passata a `onRenderProcessGone` viene chiamata con un evento sintetico (`SyntheticEvent`) che racchiude un evento nativo con le seguenti proprietà:

```
didCrash
```
---

### `onMessage`[⬆](#props-index)
Funzione che viene invocata quando la WebView chiama `window.ReactNativeWebView.postMessage`. Impostando questa proprietà, verrà iniettato questo oggetto globale nella WebView.

`window.ReactNativeWebView.postMessage` accetta un argomento, `data`, che sarà disponibile sull'oggetto evento come `event.nativeEvent.data`. `data` deve essere una stringa.

| Tipo     | Obbligatorio |
| -------- | ------------ |
| function | No           |

Per saperne di più leggi la guida [Comunicazione tra JS e Native](Guide.italian.md#comunicazione-tra-js-e-native).

---

### `onNavigationStateChange`[⬆](#props-index)
Funzione che viene invocata quando il caricamento del `WebView` inizia o termina.

| Tipo     | Obbligatorio |
| -------- | ------------ |
| function | No           |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onNavigationStateChange={(navState) => {
    // Tenere traccia della navigazione "indietro" all'interno del componente
    this.canGoBack = navState.canGoBack;
  }}
/>
```

L'oggetto `navState` ha le seguenti proprietà:

```
canGoBack
canGoForward
loading
navigationType (solo iOS)
target
title
url
```

---

### `onContentProcessDidTerminate`[⬆](#props-index)
Funzione che viene invocata quando l'elaborazione del contenuto della `WebView` viene terminato.

| Tipo     | Obbligatorio | Piattaforma                 |
| -------- | ------------ | --------------------------- |
| function | No           | iOS e macOS WKWebView       |

Le web view di iOS utilizzano un processo separato per il rendering e la gestione dei contenuti web. WebKit chiama questo metodo quando il processo per la web view specificata termina per qualsiasi motivo.
Il motivo non è necessariamente un crash. Ad esempio, poiché le web view di iOS non sono incluse nella RAM totale dell'app, possono essere terminate indipendentemente dall'app per liberare memoria per nuove app che l'utente sta aprendo. Non è insolito che le Web view vengano terminate dopo un po' di tempo in background.

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onContentProcessDidTerminate={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('Elaborazione del contenuto terminato, ricaricamento in corso.', nativeEvent);
    this.refs.webview.reload();
  }}
/>
```

La funzione passata a `onContentProcessDidTerminate` viene chiamata con un evento sintetico (`SyntheticEvent`) che racchiude un evento nativo con le seguenti proprietà:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onScroll`[⬆](#props-index)
Funzione che viene invocata quando viene generato l'evento di scorrimento (`scroll`) nella `WebView`.

| Tipo     | Obbligatorio | Piattaforma                  |
| -------- | ------------ | ---------------------------- |
| function | No           | iOS, macOS, Android, Windows |

Esempio:

```jsx
<Webview
  source={{ uri: 'https://reactnative.dev' }}
  onScroll={syntheticEvent => {
    const { contentOffset } = syntheticEvent.nativeEvent
    console.table(contentOffset)
  }}
/>
```

La funzione passata a `onScroll` viene chiamata con un evento sintetico (`SyntheticEvent`) che racchiude un evento nativo con le seguenti proprietà:

```
contentInset
contentOffset
contentSize
layoutMeasurement
velocity
zoomScale
```

---

### `originWhitelist`[⬆](#props-index)
Elenco di stringhe di origine consentite per la navigazione. Le stringhe consentono caratteri jolly (*) e vengono confrontate solo con l'origine (non l'URL completo). Se l'utente schiaccia per navigare verso una nuova pagina ma la nuova pagina non è in questa lista di controllo, l'URL verrà gestito dal sistema operativo. Le origini predefinite in lista bianca (whitelist o allowlist) sono "http://*" e "https://*".

| Tipo             | Obbligatorio | Piattaforma         |
| ---------------- | ------------ | ------------------- |
| array of strings | No           | iOS, Android, macOS |

Esempio:

```jsx
// Consenti solo URI che iniziano con https:// or git://
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  originWhitelist={['https://*', 'git://*']}
/>
```

---

### `renderError`[⬆](#props-index)
Funzione che restituisce una View da mostrare in caso di errore.

| Tipo     | Obbligatorio | Piattaforma         |
| -------- | ------------ | ------------------- |
| function | No           | iOS, Android, macOS |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  renderError={(errorName) => <Error name={errorName} />}
/>
```

La funzione passata a `renderError` verrà chiamata con il nome dell'errore.

---

### `renderLoading`[⬆](#props-index)
Funzione che restituisce un indicatore di caricamento. La prop `startInLoadingState` deve essere impostata su `true` per utilizzare questa prop.

| Tipo     | Obbligatorio | Piattaforma         |
| -------- | ------------ | ------------------- |
| function | No           | iOS, Android, macOS |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  startInLoadingState={true}
  renderLoading={() => <Loading />}
/>
```

---

### `scalesPageToFit`[⬆](#props-index)
Boolean che controlla se il contenuto web viene ridimensionato per adattarsi alla vista e consente all'utente di modificare la scala. Il valore predefinito è `true`.

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | Android      |

---

### `onShouldStartLoadWithRequest`[⬆](#props-index)
Funzione che consente la gestione personalizzata di qualsiasi richiesta della web view. Restituisci `true` dalla funzione per continuare a caricare la richiesta e `false` per interrompere il caricamento.

Su Android, non viene chiamata durante il primo caricamento.

| Tipo     | Obbligatorio | Piattaforma         |
| -------- | ------------ | ------------------- |
| function | No           | iOS, Android, macOS |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onShouldStartLoadWithRequest={(request) => {
    // Consenti solo la navigazione all'interno di questo sito web.
    return request.url.startsWith('https://reactnative.dev');
  }}
/>
```

L'oggetto `request` include queste proprietà:

```
title
url
loading
target
canGoBack
canGoForward
lockIdentifier
mainDocumentURL (solo iOS)
navigationType (solo iOS)
isTopFrame (solo iOS)
```

---

### `startInLoadingState`[⬆](#props-index)
Boolean che forza la `WebView` a mostrare una View di caricamento durante il primo caricamento. Questa prop dev'essere impostata su `true` affinché la prop `renderLoading` funzioni.

| Tipo | Obbligatorio | Piattaforma         |
| ---- | ------------ | ------------------- |
| bool | No           | iOS, Android, macOS |

---

### `style`[⬆](#props-index)
[Style](https://reactnative.dev/docs/view-style-props) ti permette di personalizzare lo stile della `WebView`. Nota che ci sono stili predefiniti (ad esempio: è necessario aggiungere `flex: 0` allo stile se si desidera utilizzare la proprietà `height`).

| Tipo  | Obbligatorio |
| ----- | ------------ |
| style | No           |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  style={{ marginTop: 20 }}
/>
```

---

### `containerStyle`[⬆](#props-index)
[Style](https://reactnative.dev/docs/view-style-props) che consente di personalizzare lo stile del contenitore della `WebView`. Nota che ci sono stili predefiniti (ad esempio: è necessario aggiungere `flex: 0` allo stile se si desidera utilizzare la proprietà `height`).

| Tipo  | Obbligatorio |
| ----- | ------------ |
| style | No           |

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  containerStyle={{ marginTop: 20 }}
/>
```

---

### `decelerationRate`[⬆](#props-index)
Un numero in virgola mobile che determina quanto rapidamente lo scroll nella view decelera dopo che l'utente ha sollevato il dito. È possibile utilizzare anche i valori di stringa `"normal"` e `"fast"` che corrispondono alle impostazioni sottostanti di iOS per `UIScrollViewDecelerationRateNormal` e `UIScrollViewDecelerationRateFast` rispettivamente:
- `normal`: 0,998
- `fast`: 0,99 (impostazione predefinita per la web view di iOS)

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| number | No           | iOS          |

---

### `domStorageEnabled`[⬆](#props-index)
Valore booleano per controllare se il DOM Storage è abilitato. Usato solo in Android.

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | Android      |

---

### `javaScriptEnabled`[⬆](#props-index)
Valore booleano per abilitare JavaScript nella `WebView`. Il valore predefinito è `true`.

| Tipo | Obbligatorio |
| ---- | ------------ |
| bool | No           |

---

### `javaScriptCanOpenWindowsAutomatically`[⬆](#props-index)
Una boolean che indica se JavaScript può aprire finestre senza chel'utente interagisca. Il valore predefinito è `false`.

| Tipo | Obbligatorio |
| ---- | ------------ |
| bool | No           |

---

### `androidLayerType`[⬆](#props-index)
Specifica il tipo di layer.

I possibili valori per `androidLayerType` sono:

- `none` (predefinito): la view non ha un layer.
- `software`: la view ha un layer software. Un layer software è supportato da un bitmap e fa sì che la view venga renderizzata utilizzando la pipeline di rendering software di Android, anche se l'accelerazione hardware è abilitata.
- `hardware`: la view ha un layer hardware. Un layer hardware è supportato da una texture specifica dell'hardware e fa sì che la view venga renderizzata utilizzando la pipeline di rendering hardware di Android, ma solo se l'accelerazione hardware è abilitata per la gerarchia delle view.


| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| string | No           | Android      |

---

### `mixedContentMode`[⬆](#props-index)
Specifica la modalità di contenuto misto. Ad esempio, la WebView consentirà a un'origine sicura di caricare contenuti da qualsiasi altra origine.

I possibili valori per `mixedContentMode` sono:

- `never` (predefinito): la WebView non consentirà a un'origine sicura di caricare contenuti da un'origine non sicura.
- `always`: la WebView consentirà a un'origine sicura di caricare contenuti da qualsiasi altra origine, anche se questa origine non è sicura.
- `compatibility`: la WebView cercherà di essere compatibile con l'approccio di un web browser moderno per quanto riguarda i contenuti misti.

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| string | No           | Android      |

---

### `thirdPartyCookiesEnabled`[⬆](#props-index)
Boolean che abilita i cookie di terze parti nella WebView. Utilizzato solo su Android Lollipop e versioni successive, poiché i cookie di terze parti sono abilitati per impostazione predefinita su Android Kitkat e versioni precedenti e su iOS. Il valore predefinito è `true`. Per ulteriori informazioni sui cookie, leggi la [guida per come gestire i cookie](Guide.italian.md#gestione-dei-cookie).

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | Android      |

---

### `userAgent`[⬆](#props-index)
Imposta l'user-agent per la WebView.

| Tipo   | Obbligatorio | Piattaforma             |
| ------ | ------------ | ----------------------- |
| string | No           | iOS, Android, macOS     |

---

### `applicationNameForUserAgent`[⬆](#props-index)
Aggiungi all'user-agent esistente. Impostare `userAgent` sovrascriverà questa opzione.

| Tipo   | Obbligatorio | Piattaforma             |
| ------ | ------------ | ----------------------- |
| string | No           | iOS, Android, macOS     |

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  applicationNameForUserAgent={'DemoApp/1.1.0'}
/>
// Il risultato dell'user-agent sarà simile a:
// Mozilla/5.0 (Linux; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.021; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36 DemoApp/1.1.0
// Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 DemoApp/1.1.0
```

### `allowsFullscreenVideo`[⬆](#props-index)
Boolean che determina se è consentito riprodurre i video a schermo intero. Il valore predefinito è `false`.

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | Android      |

---

### `allowsInlineMediaPlayback`[⬆](#props-index)
Boolean che determina se i video HTML5 vengono riprodotti all'interno del contenuto o utilizzano il controller a schermo intero nativo. Il valore predefinito è `false`.

> **NOTA**
>
> Per consentire la riproduzione inline dei video, non basta solo che questa proprietà sia impostata su `true`, ma l'elemento video nel documento HTML deve anche includere l'attributo `webkit-playsinline`.

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | iOS          |

---
### `allowsAirPlayForMediaPlayback`[⬆](#props-index)
Un valore booleano che indica se è consentito l'uso di AirPlay. Il valore predefinito è `false`.

| Tipo    | Obbligatorio | Piattaforma       |
| ------- | ------------ | ----------------- |
| boolean | No           | iOS e macOS       |

---

### `bounces`[⬆](#props-index)
Valore booleano che determina se la web view effettua l'effetto di "rimbalzo" (bounce) quando raggiunge il bordo del contenuto. Il valore predefinito è `true`.

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | iOS          |

---

### `overScrollMode`[⬆](#props-index)
Specifica la modalità di overscroll.

I possibili valori per `overScrollMode` sono:

- `always` (predefinito): consente sempre all'utente di eseguire l'overscroll su questa view, a condizione che sia una view scrollabile.
- `content`: consente all'utente di eseguire l'overscroll su questa view solo se il contenuto è sufficientemente grande da poter usare lo scrolling in modo significativo, a condizione che sia una view che ha lo scrolling.
- `never`: Non consente mai all'utente di eseguire l'overscroll su questa view.

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| string | No           | Android      |

---

### `contentInset`[⬆](#props-index)

La quantità di spazio tra il contenuto della WebView e i bordi della ScrollView. Impostato di default su {top: 0, left: 0, bottom: 0, right: 0}.

| Tipo                                                               | Obbligatorio | Piattaforma  |
| ------------------------------------------------------------------ | ------------ | ------------ |
| object: {top: number, left: number, bottom: number, right: number} | No           | iOS          |

---

### `contentInsetAdjustmentBehavior`[⬆](#props-index)
Questa proprietà specifica come gli inset della safe area vengono utilizzati per modificare l'area del contenuto della scroll view. Il valore predefinito di questa proprietà è "never" (mai). Disponibile su iOS 11 e versioni successive. Il valore Predefinito è `never`.

Valori possibili:
- `automatic` (automatico)
- `scrollableAxes` (assi scorrevoli)
- `never` (mai)
- `always` (sempre)

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| string | No           | iOS          |

---

### `contentMode`[⬆](#props-index)
Controlla il tipo di contenuto da caricare. Disponibile su iOS 13 e versioni successive. Predefinito a `recommended` (consigliato), che carica contenuti per dispositivi mobili su iPhone e iPad Mini, ma contenuti per desktop su iPad più grandi.

Per ulteriori informazioni consulta [Introducing Desktop-class Browsing on iPad](https://developer.apple.com/videos/play/wwdc2019/203/).

Valori possibili:
- `recommended` (consigliato)
- `mobile`
- `desktop`

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| string | No           | iOS          |

---

### `dataDetectorTypes`[⬆](#props-index)
I tipi di dati riconosciuti per la rilevazione dei link nel contenuto della web view. Di seguito sono riportati i possibili valori per `dataDetectorTypes`:

- `phoneNumber`
- `link`
- `address`
- `calendarEvent`
- `none`
- `all`
- `trackingNumber`
- `flightNumber`
- `lookupSuggestion`

| Tipo             | Obbligatorio | Piattaforma  |
| ---------------- | ------------ | ------------ |
| string o array   | No           | iOS          |

---

### `scrollEnabled`[⬆](#props-index)
Boolean che determina se la funzionalità di scroll è abilitata nella `WebView`. Il valore predefinito è `true`. Impostando questo valore su `false`, la webview non sposterà il body del documento quando la tastiera appare sopra un campo di input.

| Tipo | Obbligatorio | Piattaforma       |
| ---- | ------------ | ----------------- |
| bool | No           | iOS e macOS       |

---

### `nestedScrollEnabled`[⬆](#props-index)
Boolean che determina se è possibile effettuare lo scroll nella `WebView` quando viene utilizzato all'interno di un `ScrollView` su Android. Il valore predefinito è `false`.

Impostando questo valore su `true`, verrà impedito alla `ScrollView` di effettuare lo scrolling quando si scorre all'interno della `WebView`.

| Tipo | Obbligatorio | Piattaforma       |
| ---- | ------------ | ----------------- |
| bool | No           | Android           |

---

### `setBuiltInZoomControls`[⬆](#props-index)
Imposta se la WebView usa meccanismi di zoom integrati. Il valore predefinito è `true`. Impostando questo valore su `false`, verrà impedito l'uso del gesto di pinch (pizzico) per il controllo dello zoom.

| Tipo | Obbligatorio | Piattaforma       |
| ---- | ------------ | ----------------- |
| bool | No           | Android           |

---

### `setDisplayZoomControls`[⬆](#props-index)
Imposta se la WebView deve mostrare i controlli di zoom sullo schermo quando si utilizzano i meccanismi di zoom integrati (vedi `setBuiltInZoomControls`). Il valore predefinito è `false`.

| Tipo | Obbligatorio | Piattaforma       |
| ---- | ------------ | ----------------- |
| bool | No           | Android           |

---

### `directionalLockEnabled`[⬆](#props-index)
Un valore booleano che determina se lo scrolling è disabilitato per una direzione specifica. Il valore predefinito è `true`.

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | iOS          |

---

### `showsHorizontalScrollIndicator`[⬆](#props-index)
Boolean che determina se l'indicatore di scrolling orizzontale viene mostrato nella `WebView`. Il valore predefinito è `true`.

| Tipo | Obbligatorio | Piattaforma             |
| ---- | ------------ | ----------------------- |
| bool | No           | iOS, Android, macOS     |

---

### `showsVerticalScrollIndicator`[⬆](#props-index)
Boolean che determina se l'indicatore di scrolling verticale viene mostrato nella `WebView`. Il valore predefinito è `true`.

| Tipo | Obbligatorio | Piattaforma             |
| ---- | ------------ | ----------------------- |
| bool | No           | iOS, Android, macOS     |

---

### `geolocationEnabled`[⬆](#props-index)
Imposta se la geolocalizzazione è abilitata nella `WebView`. Il valore predefinito è `false`. Supportato solo su Android.

| Tipo | Obbligatorio | Piattaforma  |
| ---- | ------------ | ------------ |
| bool | No           | Android      |

---

### `allowFileAccessFromFileURLs`[⬆](#props-index)
Il valore booleano determina se è consentito a JavaScript, in esecuzione all'interno di un URL con schema file, di accedere ai contenuti di altri URL con schema file. Il valore predefinito è `false`.

| Tipo | Obbligatorio | Piattaforma             |
| ---- | ------------ | ----------------------- |
| bool | No           | iOS, Android, macOS     |

---

### `allowUniversalAccessFromFileURLs`[⬆](#props-index)
Il valore booleano determina se è consentito a JavaScript, in esecuzione all'interno di un URL con schema file, di accedere ai contenuti di qualsiasi origine, compresi i contenuti di altri URL con schema file. Il valore predefinito è `false`.

| Tipo | Obbligatorio | Piattaforma              |
| ---- | ------------ | ------------------------ |
| bool | No           | iOS, Android, macOS      |

---

### `allowingReadAccessToURL`[⬆](#props-index)
Il valore di tipo stringa indica a quali URL il file della WebView può fare riferimento negli script, nelle richieste AJAX e negli import di CSS. Questo viene utilizzato solo per le WebView che vengono caricate con un `source.uri` impostato su un URL `'file://'`. Se non viene fornito, il valore predefinito è consentire solo l'accesso in lettura all'URL fornito in `source.uri` stesso.

| Tipo   | Obbligatorio | Piattaforma       |
| ------ | ------------ | ----------------- |
| string | No           | iOS e macOS       |

---

### `keyboardDisplayRequiresUserAction`[⬆](#props-index)
Se impostato su `false`, il contenuto web non mostra la tastiera mediante codice (programmatically). Il valore predefinito è `true`.

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | iOS          |

---

### `hideKeyboardAccessoryView`[⬆](#props-index)
Se impostato su `true`, nasconde la view accessorio della tastiera(< > e Fatto).

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | iOS          |

---

### `allowsBackForwardNavigationGestures`[⬆](#props-index)
Se impostato su `true`, sarà possibile utilizzare i gesti di scrolling orizzontale. Il valore predefinito è `false`.

| Tipo    | Obbligatorio | Piattaforma       |
| ------- | ------------ | ----------------- |
| boolean | No           | iOS e macOS       |

---

### `incognito`[⬆](#props-index)
Non memorizza alcun dato durante il ciclo di vita della WebView.

| Tipo    | Obbligatorio | Piattaforma             |
| ------- | ------------ | ----------------------- |
| boolean | No           | iOS, Android, macOS     |

---

### `allowFileAccess`[⬆](#props-index)
Se impostato su `true`, consentirà l'accesso ai file di sistema tramite URI `file://`. Il valore predefinito è `false`.

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | Android      |

---

### `saveFormDataDisabled`[⬆](#props-index)
Imposta se la WebView deve disabilitare il salvataggio dei dati dei form. Il valore predefinito è `false`. Questa funzione non ha alcun effetto dall'API level 26 di Android in poi, in quanto è presente una funzionalità di compilazione automatica che memorizza i dati dei form.

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | Android      |

---

### `cacheEnabled`[⬆](#props-index)
Imposta se la WebView deve utilizzare la cache del browser.

| Tipo    | Obbligatorio | Default | Piattaforma             |
| ------- | ------------ | ------- | ----------------------- |
| boolean | No           | true    | iOS, Android, macOS     |

---

### `cacheMode`[⬆](#props-index)
Sovrascrive il modo in cui viene usata la cache. Il modo in cui viene utilizzata la cache dipende dal tipo di navigazione. Per un normale caricamento della pagina, la cache viene controllata e il contenuto viene rivalidato se necessario. Quando si torna indietro, il contenuto non viene rivalidato, ma viene semplicemente recuperato dalla cache. Questa proprietà consente al client di sovrascrivere questo comportamento.

I valori possibili sono:

- `LOAD_DEFAULT`: modalità di utilizzo predefinita della cache. Se il tipo di navigazione non impone alcun comportamento specifico, usa le risorse in cache quando sono disponibili e non scadute, altrimenti carica le risorse dalla rete.
- `LOAD_CACHE_ELSE_NETWORK`: utilizza le risorse in cache quando sono disponibili, anche se sono scadute. Altrimenti carica le risorse dalla rete.
- `LOAD_NO_CACHE`: non utilizza la cache, carica dalla rete.
- `LOAD_CACHE_ONLY`: non utilizza la rete, carica dalla cache.

| Tipo   | Obbligatorio | Default      | Piattaforma  |
| ------ | ------------ | ------------ | ------------ |
| string | No           | LOAD_DEFAULT | Android      |

---

### `pagingEnabled`[⬆](#props-index)
Quando il valore di questa proprietà è impostato su `true`, la view di scrolling si fermerà sugli intervalli corrispondenti ai limiti della vista stessa quando l'utente effettua uno scroll. Il valore predefinito è `false`.

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | iOS          |

---

### `allowsLinkPreview`[⬆](#props-index)
Boolean che determina se la pressione su un link visualizza un'anteprima della destinazione del link. In iOS, questa proprietà è disponibile sui dispositivi che supportano il 3D Touch. In iOS 10 e versioni successive, il valore predefinito è `true`. Prima di iOS 10, il valore predefinito è `false`.

| Tipo    | Obbligatorio | Piattaforma       |
| ------- | ------------ | ----------------- |
| boolean | No           | iOS e macOS       |

---

### `sharedCookiesEnabled`[⬆](#props-index)
Imposta `true` se i cookie condivisi da `[NSHTTPCookieStorage sharedHTTPCookieStorage]` devono essere usati per ogni richiesta di caricamento nella WebView. Il valore predefinito è `false`. Per ulteriori informazioni sui cookie, leggi la [guida di gestione dei cookie](Guide.italian.md#gestione-dei-cookie)

| Tipo    | Obbligatorio | Piattaforma       |
| ------- | ------------ | ----------------- |
| boolean | No           | iOS e macOS       |

---

### `textZoom`[⬆](#props-index)
Se l'utente ha impostato una dimensione del carattere personalizzata nel sistema Android, si verifica una scala indesiderata dell'interfaccia del sito nella WebView.

Impostando la prop `textZoom` standard (100), questa conseguenza indesiderata scompare.

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| number | No           | Android      |

Esempio:

```jsx
<WebView textZoom={100} />
```

---

### `pullToRefreshEnabled`[⬆](#props-index)
Boolean che determina se è abilitato il gesto di trascinamento per aggiornare nella WebView. Il valore predefinito è `false`, il che significa che il gesto di trascinamento per aggiornare non è disponibile. Se impostato su `true`, abiliterà automaticamente la proprietà `bounces` a `true`, consentendo al contenuto di rimbalzare quando viene trascinato oltre i limiti.

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | iOS          |

### `ignoreSilentHardwareSwitch`[⬆](#props-index)
(solo iOS)

Quando impostato su `true`, viene ignorato il pulsante del silenzioso dell'hardware fisico. Predefinito: `false`.

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | iOS          |

### `onFileDownload`[⬆](#props-index)
(solo iOS)

È una funzione che viene invocata quando il client ha bisogno di scaricare un file.

Solo su iOS 13 e successivi: Se la WebView naviga verso un URL che restituisce una risposta HTTP con un'intestazione Content-Disposition 'attachment...', allora questa funzione verrà chiamata.

Su iOS 8 e successivi: Se il tipo MIME indica che il contenuto non può essere visualizzato dalla WebView, ciò causerà anche la chiamata di questa funzione. Prima di iOS 13, questa è l'unica condizione che provocherà la chiamata di questa funzione.

L'applicazione dovrà fornire il proprio codice per effettuare effettivamente il download del file.

Se non viene fornito codice, il comportamento predefinito è consentire alla WebView di provare a visualizzare il file.

Esempio:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onFileDownload={({ nativeEvent: { downloadUrl } }) => {
    // Puoi utilizzare la prop downloadUrl come una stringa per scaricare i file nel modo desiderato.
  }}
/>
```

| Tipo     | Obbligatorio | Piattaforma  |
| -------- | ------------ | ------------ |
| function | No           | iOS          |

---

### `limitsNavigationsToAppBoundDomains`[⬆](#props-index)
Se impostato su `true`, indica a WebKit che un WKWebView può navigare solo su domini legati all'applicazione. Applicabile solo su iOS 14 o versioni successive.

Una volta impostato, qualsiasi tentativo di navigare su una pagina che non ha un dominio legato all'applicazione fallirà con l'errore "App-bound domain failure" (mancato dominio legato all'applicazione).
Le applicazioni possono specificare fino a 10 domini "app-bound" utilizzando una nuova chiave `WKAppBoundDomains` nel file `Info.plist`. Per ulteriori informazioni, consulta [App-Bound Domains](https://webkit.org/blog/10882/app-bound-domains/).

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | iOS          |

Esempio:

```jsx
<WebView limitsNavigationsToAppBoundDomains={true} />
```

---

### `textInteractionEnabled`[⬆](#props-index)
Se impostato su `false`, indica a WebKit che un WKWebView non interagirà con il testo e non mostrerà quindi un'area di selezione del testo. Applicabile solo su iOS 14.5 o versioni successive.

Il valore predefinito è `true`.

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | iOS          |

Esempio:

```jsx
<WebView textInteractionEnabled={false} />
```

---

### `mediaCapturePermissionGrantType`[⬆](#props-index)
Questa prop specifica come gestire le richieste di autorizzazione per la cattura degli strumenti di comunicazione. Il valore predefinito è `prompt`, il che comporta che all'utente venga richiesta l'autorizzazione ripetutamente. Disponibile su iOS 15 e versioni successive.

I possibili valori sono:

- `grantIfSameHostElsePrompt`: se l'host dell'origine di sicurezza della richiesta di autorizzazione corrisponde all'host dell'URL corrente della WebView, l'autorizzazione viene concessa se è stata concessa in precedenza. In caso contrario, viene richiesta l'autorizzazione all'utente.
- `grantIfSameHostElseDeny`: se l'host dell'origine di sicurezza della richiesta di autorizzazione corrisponde all'host dell'URL corrente della WebView, l'autorizzazione viene concessa se è stata concessa in precedenza. In caso contrario, viene negata.
- `deny`
- `grant`: l'autorizzazione viene concessa se è stata concessa in precedenza.
- `prompt`

Nota che anche una concessione può comportare una richiesta all'utente, ad esempio se l'autorizzazione non è mai stata richiesta all'utente in precedenza.

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| string | No           | iOS          |

Esempio:

```jsx
<WebView mediaCapturePermissionGrantType={'grantIfSameHostElsePrompt'} />
```

---

### `autoManageStatusBarEnabled`[⬆](#props-index)
Se impostato su `true`, la barra di stato verrà automaticamente nascosta/mostrata dalla WebView, in particolare quando si guarda un video a schermo intero. Se impostato su `false`, WebView non gestirà affatto la barra di stato. Il valore predefinito è `true`.

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | iOS          |

Esempio:

```jsx
<WebView autoManageStatusBarEnabled={false} />
```

### `setSupportMultipleWindows`[⬆](#props-index)
Imposta se la WebView supporta più finestre. Consulta la [documentazione di Android]('https://developer.android.com/reference/android/webkit/WebSettings#setSupportMultipleWindows(boolean)') per ulteriori informazioni.
Impostando questo valore su `false`, si potrebbe esporre l'applicazione a questa [vulnerabilità](https://alesandroortiz.com/articles/uxss-android-webview-cve-2020-6506/), consentendo a un iframe maligno di sfuggire al DOM del livello superiore.

| Tipo    | Obbligatorio | Default | Piattaforma  |
| ------- | ------------ | ------- | ------------ |
| boolean | No           | true    | Android      |

Esempio:

```jsx
<WebView setSupportMultipleWindows={false} />
```

### `enableApplePay`[⬆](#props-index)
Una boolean che, quando impostata su `true`, renderizzerà la WebView con il supporto di Apple Pay. Una volta impostato, i siti web saranno in grado di invocare Apple Pay da React Native Webview.
Tuttavia, ciò comporta alcune limitazioni, ad esempio le funzionalità come [`injectJavaScript`](Reference.italian.md#injectjavascriptstr), la cronologia di HTML5, [`sharedCookiesEnabled`](Reference.italian.md#sharedCookiesEnabled), [`injectedJavaScript`](Reference.italian.md#injectedjavascript) e [`injectedJavaScriptBeforeContentLoaded`](Reference.italian.md#injectedjavascriptbeforecontentloaded) non funzioneranno. Consulta la [nota di rilascio di Apple Pay](https://developer.apple.com/documentation/safari-release-notes/safari-13-release-notes#Payment-Request-API) per ulteriori informazioni.

Se devi inviare messaggi all'app, la pagina web dovrà chiamare esplicitamente l'handler dei messaggi di WebKit e riceverli tramite l'handler `onMessage` nel lato di React Native.

```javascript
window.webkit.messageHandlers.ReactNativeWebView.postMessage("ciao apple pay")
```

| Tipo    | Obbligatorio | Default | Piattaforma  |
| ------- | ------------ | ------- | ------------ |
| boolean | No           | false   | iOS          |

Esempio:

```jsx
<WebView enableApplePay={true} />
```

### `forceDarkOn`[⬆](#props-index)
Configurazione del tema scuro (Dark Mode).

*NOTA*: L'impostazione della Dark Mode non è persistente. È necessario chiamare il metodo statico ogni volta che il processo dell'app viene avviato.

*NOTA*: Il passaggio da modalità giorno a modalità notte è una modifica di configurazione, quindi per l'impostazione predefinita l'attività verrà riavviata e registrerà i nuovi valori per attivare il tema. Presta attenzione quando sovrascrivi questo comportamento predefinito e assicurati che questo metodo venga comunque chiamato quando vengono apportate modifiche.

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | Android      |

Esempio:

```javascript
<WebView forceDarkOn={false} />
```

### `menuItems`[⬆](#props-index)
Un array di oggetti di elementi di menu personalizzati che verranno aggiunti all'UIMenu che appare quando si seleziona del testo (appariranno dopo 'Copia' e 'Condividi...'). Utilizzato insieme a `onCustomMenuSelection`.

| Tipo                                                               | Obbligatorio | Piattaforma  |
| ------------------------------------------------------------------ | ------------ | ------------ |
| array of objects: {label: string, key: string}                     | No           | iOS          |

Esempio:

```jsx
<WebView menuItems={[
  { label: 'Tweet', key: 'tweet' },
  { label: 'Save for later', key: 'saveForLater' }
  ]}
/>
```

### `onCustomMenuSelection`[⬆](#props-index)
La funzione chiamata quando viene selezionato un elemento di menu personalizzato. Riceve un evento Native che include tre chiavi personalizzate: `label`, `key` e `selectedText`.

| Tipo                                                               | Obbligatorio | Piattaforma  |
| ------------------------------------------------------------------ | ------------ | ------------ |
| function                                                           | No           | iOS          |

```javascript
<WebView
  menuItems={[{ label: 'Tweet', key: 'tweet' }, { label: 'Save for later', key: 'saveForLater' }]}
  onCustomMenuSelection={(webViewEvent) => {
    const { label } = webViewEvent.nativeEvent; // Il nome dell'elemento di menu, i.e. 'Tweet'
    const { key } = webViewEvent.nativeEvent; // La chiave dell'elemento di menu, i.e. 'tweet'
    const { selectedText } = webViewEvent.nativeEvent; // Testo evidenziato
  }}
/>
```

### `basicAuthCredential`[⬆](#props-index)
Un oggetto che specifica le credenziali di un utente da usare per l'autenticazione di base.
- `username` (string): un nome utente usato per l'autenticazione di base.
- `password` (string): una password usata per l'autenticazione di base.

| Tipo   | Obbligatorio |
| ------ | ------------ |
| object | No           |

### `useWebView2`[⬆](#props-index)
Usa il controllo WebView2 di WinUI al posto del controllo WebView come visualizzatore web nativo. Il controllo WebView2 è un controllo WinUI che renderizza il contenuto web utilizzando il motore di esecuzione Microsoft Edge (Chromium). L'opzione può essere attivata o disattivata durante l'esecuzione e supporta Fast Refresh. Per saperne di più leggi la sezione riguardante WebView2 nella [guida getting-started](Getting-Started.italian.md#3-supporto-per-webview2).

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | Windows      |

Esempio:

```javascript
<WebView useWebView2={true} />
```

### `minimumFontSize`[⬆](#props-index)
Android impone una dimensione minima del carattere basata su questo valore. Un numero intero non negativo compreso tra `1` e `72`. Qualsiasi numero al di fuori di questo intervallo verrà limitato ai valori consentiti. Il valore predefinito è `8`. Se si utilizzano dimensioni del carattere più piccole e si riscontrano problemi nel visualizzare l'intera finestra su un unico schermo, si consiglia di impostare un valore più piccolo.

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| number | No           | Android      |

Esempio:

```jsx
<WebView minimumFontSize={1} />
```

### `downloadingMessage`[⬆](#props-index)
Questo è il messaggio visualizzato nel Toast (finestra di dialogo o notifica) durante il download di un file tramite la WebView. Il messaggio predefinito è "Downloading".

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | -------- | ------------ |
| string | No           | Android  |

### `lackPermissionToDownloadMessage`[⬆](#props-index)
Questo è il messaggio visualizzato nel Toast (finestra di dialogo o notifica) quando la WebView non è in grado di scaricare un file. Il messaggio predefinito è "Cannot download files as permission was denied. Please provide permission to write to storage, in order to download files." (_Impossibile scaricare i file in quanto è stato negato l'accesso. Fornisci il permesso di scrittura sulla memoria per poter scaricare i file._).

| Tipo   | Obbligatorio | Piattaforma  |
| ------ | ------------ | ------------ |
| string | No           | Android      |

### `allowsProtectedMedia`[⬆](#props-index)
Se impostato su `true`, la WebView può riprodurre contenuti multimediali protetti da DRM (Digital Rights Management). Il valore predefinito è `false`.
⚠️ L'impostazione di questa opzione su `false` non revoca automaticamente il permesso già concesso alla pagina web corrente. Per farlo, è necessario ricaricare la pagina. ⚠️

| Tipo    | Obbligatorio | Piattaforma  |
| ------- | ------------ | ------------ |
| boolean | No           | Android      |

### `fraudulentWebsiteWarningEnabled`[⬆](#props-index)
Boolean che indica se la WebView mostra avvisi per contenuti sospetti di frode, come malware o tentativi di phishing. Il valore predefinito è `true`. (iOS 13+)

| Tipo    | Obbligatorio | Default | Piattaforma  |
| ------- | ------------ | ------- | ------------ |
| boolean | No           | true    | iOS          |

### `webviewDebuggingEnabled`[⬆](#props-index)
Valore che determina se la WebView può essere debuggata in remoto utilizzando Safari/Chrome. Il valore predefinito è `false`. Supportato su iOS a partire dalla versione 16.4, nelle versioni precedenti il debug è sempre abilitato di default.

| Tipo    | Obbligatorio | Piattaforma    |
| ------- | ------------ | -------------- |
| boolean | No           | iOS e Android  |

## Methods
### `goForward()`[⬆](#methods-index)

```javascript
goForward();
```

Vai avanti di una pagina nella cronologia web.

### `goBack()`[⬆](#methods-index)

```javascript
goBack();
```

Torna indietro di una pagina nella cronologia web.

### `reload()`[⬆](#methods-index)

```javascript
reload();
```

Ricarica la pagina corrente.

### `stopLoading()`[⬆](#methods-index)

```javascript
stopLoading();
```

Ferma il caricamento della pagina corrente.

### `injectJavaScript(str)`[⬆](#methods-index)

```javascript
injectJavaScript('... javascript string ...');
```

Esegue il codice JavaScript fornito come stringa di testo.

Per saperne di più leggi la guida [Comunicazione tra JS e Native](Guide.italian.md#comunicazione-tra-js-e-native).

### `requestFocus()`[⬆](#methods-index)

```javascript
requestFocus();
```

Richiedi alla WebView di ottenere il focus. (Se lavori su app per TV potresti trovare questa funzione interessante!)

### `postMessage(str)`[⬆](#methods-index)

```javascript
postMessage('message');
```

Invia un messaggio alla WebView, tramite l'handler [`onMessage`](Reference.italian.md#onmessage).

### `clearFormData()`[⬆](#methods-index)

(solo android)

```javascript
clearFormData();
```

Se presente, toglie la popup di autocompletamento dal campo di form attualmente selezionato. [developer.android.com reference](<https://developer.android.com/reference/android/webkit/WebView.html#clearFormData()>)

### `clearCache(bool)`[⬆](#methods-index)

(solo android)

```javascript
clearCache(true)
```

Cancella la cache delle risorse. Nota che la cache è specifica dell'applicazione, quindi questa operazione cancellerà la cache per tutte le WebView in uso. [developer.android.com reference](<https://developer.android.com/reference/android/webkit/WebView.html#clearCache(boolean)>)

### `clearHistory()`[⬆](#methods-index)

(solo android)

```javascript
clearHistory();
```

Indica a questa WebView di cancellare la sua cronologia interna di pagine precedenti/successive.[developer.android.com reference](<https://developer.android.com/reference/android/webkit/WebView.html#clearHistory()>)

## Altri Documenti
Fai anche riferimento alla nostra [Guida per Iniziare](Getting-Started.italian.md) e alla [Guida Approfondita](Guide.italian.md).


### Traduzioni
Questo file è disponibile nelle seguenti lingue:
- [Inglese](Reference.md)
- [Portoghese brasiliano](Reference.portuguese.md)