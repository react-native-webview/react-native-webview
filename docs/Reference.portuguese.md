# React Native WebView API Referência

Este documento apresenta as propriedades e métodos públicos para o React Native WebView.

## Props Index

- [`source`](Reference.portuguese.md#source)
- [`automaticallyAdjustContentInsets`](Reference.portuguese.md#automaticallyadjustcontentinsets)
- [`automaticallyAdjustsScrollIndicatorInsets`](Reference.portuguese.md#automaticallyAdjustsScrollIndicatorInsets)
- [`injectedJavaScript`](Reference.portuguese.md#injectedjavascript)
- [`injectedJavaScriptBeforeContentLoaded`](Reference.portuguese.md#injectedjavascriptbeforecontentloaded)
- [`injectedJavaScriptForMainFrameOnly`](Reference.portuguese.md#injectedjavascriptformainframeonly)
- [`injectedJavaScriptBeforeContentLoadedForMainFrameOnly`](Reference.portuguese.md#injectedjavascriptbeforecontentloadedformainframeonly)
- [`mediaPlaybackRequiresUserAction`](Reference.portuguese.md#mediaplaybackrequiresuseraction)
- [`nativeConfig`](Reference.portuguese.md#nativeconfig)
- [`onError`](Reference.portuguese.md#onerror)
- [`onRenderProcessGone`](Reference.portuguese.md#onRenderProcessGone)
- [`onLoad`](Reference.portuguese.md#onload)
- [`onLoadEnd`](Reference.portuguese.md#onloadend)
- [`onLoadStart`](Reference.portuguese.md#onloadstart)
- [`onLoadProgress`](Reference.portuguese.md#onloadprogress)
- [`onHttpError`](Reference.portuguese.md#onhttperror)
- [`onMessage`](Reference.portuguese.md#onmessage)
- [`onNavigationStateChange`](Reference.portuguese.md#onnavigationstatechange)
- [`onContentProcessDidTerminate`](Reference.portuguese.md#oncontentprocessdidterminate)
- [`onScroll`](Reference.portuguese.md#onscroll)
- [`originWhitelist`](Reference.portuguese.md#originwhitelist)
- [`renderError`](Reference.portuguese.md#rendererror)
- [`renderLoading`](Reference.portuguese.md#renderloading)
- [`scalesPageToFit`](Reference.portuguese.md#scalespagetofit)
- [`onShouldStartLoadWithRequest`](Reference.portuguese.md#onshouldstartloadwithrequest)
- [`startInLoadingState`](Reference.portuguese.md#startinloadingstate)
- [`style`](Reference.portuguese.md#style)
- [`containerStyle`](Reference.portuguese.md#containerStyle)
- [`decelerationRate`](Reference.portuguese.md#decelerationrate)
- [`domStorageEnabled`](Reference.portuguese.md#domstorageenabled)
- [`javaScriptEnabled`](Reference.portuguese.md#javascriptenabled)
- [`javaScriptCanOpenWindowsAutomatically`](Reference.portuguese.md#javascriptcanopenwindowsautomatically)
- [`androidLayerType`](Reference.portuguese.md#androidLayerType)
- [`mixedContentMode`](Reference.portuguese.md#mixedcontentmode)
- [`thirdPartyCookiesEnabled`](Reference.portuguese.md#thirdpartycookiesenabled)
- [`userAgent`](Reference.portuguese.md#useragent)
- [`applicationNameForUserAgent`](Reference.portuguese.md#applicationNameForUserAgent)
- [`allowsFullscreenVideo`](Reference.portuguese.md#allowsfullscreenvideo)
- [`allowsInlineMediaPlayback`](Reference.portuguese.md#allowsinlinemediaplayback)
- [`allowsAirPlayForMediaPlayback`](Reference.portuguese.md#allowsAirPlayForMediaPlayback)
- [`bounces`](Reference.portuguese.md#bounces)
- [`overScrollMode`](Reference.portuguese.md#overscrollmode)
- [`contentInset`](Reference.portuguese.md#contentinset)
- [`contentInsetAdjustmentBehavior`](Reference.portuguese.md#contentInsetAdjustmentBehavior)
- [`contentMode`](Reference.portuguese.md#contentMode)
- [`dataDetectorTypes`](Reference.portuguese.md#datadetectortypes)
- [`scrollEnabled`](Reference.portuguese.md#scrollenabled)
- [`nestedScrollEnabled`](Reference.portuguese.md#nestedscrollenabled)
- [`setBuiltInZoomControls`](Reference.portuguese.md#setBuiltInZoomControls)
- [`setDisplayZoomControls`](Reference.portuguese.md#setDisplayZoomControls)
- [`directionalLockEnabled`](Reference.portuguese.md#directionalLockEnabled)
- [`geolocationEnabled`](Reference.portuguese.md#geolocationenabled)
- [`allowFileAccessFromFileURLs`](Reference.portuguese.md#allowFileAccessFromFileURLs)
- [`allowUniversalAccessFromFileURLs`](Reference.portuguese.md#allowUniversalAccessFromFileURLs)
- [`allowingReadAccessToURL`](Reference.portuguese.md#allowingReadAccessToURL)
- [`keyboardDisplayRequiresUserAction`](Reference.portuguese.md#keyboardDisplayRequiresUserAction)
- [`hideKeyboardAccessoryView`](Reference.portuguese.md#hidekeyboardaccessoryview)
- [`allowsBackForwardNavigationGestures`](Reference.portuguese.md#allowsbackforwardnavigationgestures)
- [`incognito`](Reference.portuguese.md#incognito)
- [`allowFileAccess`](Reference.portuguese.md#allowFileAccess)
- [`saveFormDataDisabled`](Reference.portuguese.md#saveFormDataDisabled)
- [`cacheEnabled`](Reference.portuguese.md#cacheEnabled)
- [`cacheMode`](Reference.portuguese.md#cacheMode)
- [`pagingEnabled`](Reference.portuguese.md#pagingEnabled)
- [`allowsLinkPreview`](Reference.portuguese.md#allowsLinkPreview)
- [`sharedCookiesEnabled`](Reference.portuguese.md#sharedCookiesEnabled)
- [`textZoom`](Reference.portuguese.md#textZoom)
- [`pullToRefreshEnabled`](Reference.portuguese.md#pullToRefreshEnabled)
- [`refreshControlLightMode`](Reference.portuguese.md#refreshControlLightMode)
- [`ignoreSilentHardwareSwitch`](Reference.portuguese.md#ignoreSilentHardwareSwitch)
- [`onFileDownload`](Reference.portuguese.md#onFileDownload)
- [`limitsNavigationsToAppBoundDomains`](Reference.portuguese.md#limitsNavigationsToAppBoundDomains)
- [`textInteractionEnabled`](Reference.portuguese.md#textInteractionEnabled)
- [`mediaCapturePermissionGrantType`](Reference.portuguese.md#mediaCapturePermissionGrantType)
- [`autoManageStatusBarEnabled`](Reference.portuguese.md#autoManageStatusBarEnabled)
- [`setSupportMultipleWindows`](Reference.portuguese.md#setSupportMultipleWindows)
- [`basicAuthCredential`](Reference.portuguese.md#basicAuthCredential)
- [`enableApplePay`](Reference.portuguese.md#enableApplePay)
- [`forceDarkOn`](Reference.portuguese.md#forceDarkOn)
- [`minimumFontSize`](Reference.portuguese.md#minimumFontSize)

## Methods Index

- [`goForward`](Reference.portuguese.md#goforward)
- [`goBack`](Reference.portuguese.md#goback)
- [`reload`](Reference.portuguese.md#reload)
- [`stopLoading`](Reference.portuguese.md#stoploading)
- [`injectJavaScript`](Reference.portuguese.md#injectjavascriptstr)
- [`clearFormData`](Reference.portuguese.md#clearFormData)
- [`clearCache`](Reference.portuguese.md#clearCachebool)
- [`clearHistory`](Reference.portuguese.md#clearHistory)
- [`requestFocus`](Reference.portuguese.md#requestFocus)
- [`postMessage`](Reference.portuguese.md#postmessagestr)

---

# Referências

## Props

### `source`[⬆](#props-index)<!-- Link gerado com jump2header -->

Carrega HTML estático ou um URI (com cabeçalhos opcionais) na WebView. Observe que o HTML estático exigirá a configuração de [`originWhitelist`](Reference.portuguese.md#originwhitelist) como `["*"]`.

O objeto passado para `source` pode ter uma das seguintes formas:

**Carregar uri**

- `uri` (string) - O URI a ser carregada na `WebView`. Pode ser um arquivo local ou remoto e pode ser alterado com o estado React ou props para navegar para uma nova página.
- `method` (string) - O método HTTP é o usado. O padrão é GET se não for especificado. No Android e no Windows, os únicos métodos suportados são GET e POST.
- `headers` (object) - Cabeçalhos HTTP adicionais para enviar com a solicitação. No Android, isso só pode ser usado com solicitações GET. Consulte o [Guia](Guide.portuguese.md#setting-custom-headers) para obter mais informações sobre a configuração de cabeçalhos personalizados.
- `body` (string) - O corpo HTTP a ser enviado com a solicitação. Esta deve ser uma string UTF-8 válida e será enviada exatamente conforme especificado, sem codificação adicional (por exemplo, escape de URL ou base64) aplicada. No Android e no Windows, isso só pode ser usado com solicitações POST.

**HTML Estático**

_Observe que usar HTML estático requer a propriedade WebView [originWhiteList](Reference.portuguese.md#originWhiteList) `['*']`. Para alguns conteúdos, como incorporações de vídeo (por exemplo, postagens no Twitter ou Facebook com vídeo), o baseUrl precisa ser definido para que a reprodução do vídeo funcione_

- `html` (string) - Uma página HTML estática para exibir na WebView.
- `baseUrl` (string) - A URL base a ser usada para quaisquer links relativos no HTML. Isso também é usado para o cabeçalho de origem com solicitações CORS feitas a partir da WebView. Ver [Documentação do Android WebView](https://developer.android.com/reference/android/webkit/WebView#loadDataWithBaseURL)

| Tipo   | Requerido |
| ------ | --------  |
| object | Falso     |

---

### `automaticallyAdjustContentInsets`[⬆](#props-index)<!-- Link gerado com jump2header -->

Controla se a inserção de conteúdo deve ser ajustada para exibições da Web que são colocadas atrás de uma barra de navegação, barra de guias ou barra de ferramentas. O valor padrão é `true`.

| Tipo | Requerido | Plataforma |
| ---- | --------  | ---------- |
| bool | Falso     | iOS        |

---

### `automaticallyAdjustsScrollIndicatorInsets`[⬆](#props-index)<!-- Link gerado com jump2header -->

Controla se a inserção do indicador de rolagem deve ser ajustada para exibições da Web que são colocadas atrás de uma barra de navegação, barra de guias ou barra de ferramentas. O valor padrão `falso`. (iOS 13+)

| Tipo | Requerido | Plataforma |
| ---- | --------  | ---------- |
| bool | Falso     | iOS(13+)   |

---

### `injectedJavaScript`[⬆](#props-index)<!-- Link gerado com jump2header -->

Defina isso para fornecer ao JavaScript que será injetado na página da Web depois que o documento terminar de carregar, mas antes que outros sub-recursos terminem de carregar.

Certifique-se de que a string seja avaliada como um tipo válido (`true`) e não lance uma exceção.

No iOS, consulte [`WKUserScriptInjectionTimeAtDocumentEnd`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentend?language=objc). Tenha certeza
para definir um manipulador [`onMessage`](Reference.portuguese.md#onmessage), mesmo que seja um operação vazia, ou o código não será executado.

| Tipo   | Requerido | Plataforma                   |
| ------ | --------- | ---------------------------- |
| string | Falso     | iOS, Android, macOS, Windows |

Para saber mais, leia o guia [Comunicação entre JS e Native](Guide.portuguese.md#communicating-between-js-and-native).

_Observação: o Windows não tem [suporte nativo para alertas](https://github.com/MicrosoftDocs/winrt-api/blob/docs/windows.ui.xaml.controls/webview.md#use-of-alert) , como tal, quaisquer scripts para mostrar um alerta não funcionarão._

Exemplo:

Post envia um objeto JSON de `window.location` para ser tratado por [`onMessage`](Reference.portuguese.md#onmessage)

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

### `injectedJavaScriptBeforeContentLoaded`[⬆](#props-index)<!-- Link gerado com jump2header -->

Defina isso para fornecer JavaScript que será injetado na página da Web depois que o elemento do documento for criado, mas antes que outros sub-recursos terminem de carregar.

Certifique-se de que a string seja avaliada como um tipo válido (`true` funciona) e não lance uma exceção.

No iOS, consulte [`WKUserScriptInjectionTimeAtDocumentStart`](https://developer.apple.com/documentation/webkit/wkuserscriptinjectiontime/wkuserscriptinjectiontimeatdocumentstart?language=objc)

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| string | Não       | iOS, macOS |

Para saber mais, leia o guia [Comunicação entre JS e Native](Guide.portuguese.md#communicating-between-js-and-native).

Exemplo:

Post message um objeto JSON de `window.location` para ser tratado por [`onMessage`](Reference.portuguese.md#onmessage). `window.ReactNativeWebView.postMessage` _estará_ disponível neste momento.

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

### `injectedJavaScriptForMainFrameOnly`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se `true` (padrão; obrigatório para Android), carrega o `injectedJavaScript` apenas no quadro principal.

Se `false`, (suportado apenas em iOS e macOS), carrega-o em todos os quadros (por exemplo, iframes).

| Tipo | Requerido | Plataforma                                        |
| ---- | --------- | ------------------------------------------------- |
| bool | Não       | iOS e macOS (`true` somente suportado no Android) |

---

### `injectedJavaScriptBeforeContentLoadedForMainFrameOnly`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se `true` (padrão; obrigatório para Android), carrega o `injectedJavaScriptBeforeContentLoaded` apenas no quadro principal.

Se `false`, (suportado apenas em iOS e macOS), carrega-o em todos os quadros (por exemplo, iframes).

| Tipo | Requerido | Plataforma                                        |
| ---- | --------- | ------------------------------------------------- |
| bool | Não       | iOS e macOS (`true` somente suportado para Android) |

---

### `mediaPlaybackRequiresUserAction`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor boleano que determina se o áudio e o vídeo HTML5 exigem que o usuário toque neles antes de iniciar a reprodução. O valor padrão é `true`. (API Android versão mínima 17).

NOTA: o valor padrão `true` pode fazer com que alguns vídeos travem o carregamento no iOS. Defini-lo como `false` pode corrigir esse problema.

| Tipo | Requerido | Plataforma          |
| ---- | --------- | ------------------- |
| bool | Não       | iOS, Android, macOS |

---

### `nativeConfig`[⬆](#props-index)<!-- Link gerado com jump2header -->

Substitua o componente nativo usado para renderizar a WebView. Habilita uma WebView nativo personalizado que usa o mesmo JavaScript que a WebView original.

O prop `nativeConfig` espera um objeto com as seguintes chaves:

- `component` (any)
- `props` (object)
- `viewManager` (object)

| Tipo   | Requerido | Plataforma          |
| ------ | --------- | ------------------- |
| object | Não       | iOS, Android, macOS |

---

### `onError`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando o carregamento da `WebView` falha.

| Tipo     | Requerido |
| -------- | --------- |
| function | Não       |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onError={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
  }}
/>
```

A função passada para `onError` é chamada com um SyntheticEvent envolvendo um nativeEvent com estas propriedades:

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

> **_Observação_**
> O domínio é usado apenas no iOS

O `syntheticEvent` pode ser interrompido fazendo sua ação padrão chamando `syntheticEvent.preventDefault()`.

---

### `onLoad`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando a `WebView` termina de carregar.

| Tipo     | Requerido |
| -------- | --------- |
| function | Não       |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoad={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    this.url = nativeEvent.url;
  }}
/>
```

A função passada para `onLoad` é chamada com um SyntheticEvent envolvendo um nativeEvent com estas propriedades:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadEnd`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando o carregamento da `WebView` é bem-sucedido ou falha.

| Tipo     | Requerido |
| -------- | --------- |
| function | Não       |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoadEnd={(syntheticEvent) => {
    // componente de atualização para estar ciente do status de carregamento
    const { nativeEvent } = syntheticEvent;
    this.isLoading = nativeEvent.loading;
  }}
/>
```

A função passada para `onLoadEnd` é chamada com um SyntheticEvent envolvendo um nativeEvent com estas propriedades:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadStart`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando a `WebView` começa a carregar.

| Tipo     | Requerido |
| -------- | --------- |
| function | Não       |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev/=' }}
  onLoadStart={(syntheticEvent) => {
    // atualiza o componente para estar ciente do status de carregamento
    const { nativeEvent } = syntheticEvent;
    this.isLoading = nativeEvent.loading;
  }}
/>
```

A função passada para `onLoadStart` é chamada com um SyntheticEvent envolvendo um nativeEvent com estas propriedades:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onLoadProgress`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando a `WebView` está carregando.

| Tipo     | Requerido | Plataforma          |
| -------- | --------- | ------------------- |
| function | Não       | iOS, Android, macOS |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onLoadProgress={({ nativeEvent }) => {
    this.loadingProgress = nativeEvent.progress;
  }}
/>
```

A função passada para `onLoadProgress` é chamada com um SyntheticEvent envolvendo um nativeEvent com estas propriedades:

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

### `onHttpError`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando a `WebView` recebe um erro http.

> **_Observação_**
> API Android nível mínimo 23.

| Tipo     | Requerido |
| -------- | --------- |
| function | Não       |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onHttpError={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn(
      'Código de status de erro recebido da WebView: ',
      nativeEvent.statusCode,
    );
  }}
/>
```

A função passada para `onHttpError` é chamada com um SyntheticEvent envolvendo um nativeEvent com estas propriedades:

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

> **_Observação_**
> A descrição é usada apenas no Android

---

### `onRenderProcessGone`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando o processo da `WebView` falha ou é morto pelo sistema operacional no Android.

> **_Observação_**
> API do Android nível mínimo 26. Somente Android

| Tipo     | Requerido |
| -------- | --------- |
| function | Não       |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onRenderProcessGone={syntheticEvent => {
    const { nativeEvent } = syntheticEvent;
    console.warn(
      'WebView falhou: ',
      nativeEvent.didCrash,
    );
  }}
/>
```

A função passada para `onRenderProcessGone` é chamada com um SyntheticEvent envolvendo um nativeEvent com estas propriedades:

```
didCrash
```
---

### `onMessage`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando a webview chama `window.ReactNativeWebView.postMessage`. Definir essa propriedade injetará esse global em sua visualização da web.

`window.ReactNativeWebView.postMessage` aceita um argumento, `data`, que estará disponível no objeto de evento, `event.nativeEvent.data`. `data` deve ser uma string.

| Tipo     | Requerido |
| -------- | --------- |
| function | Não       |

Para saber mais, leia o guia [Comunicação entre JS e Native](Guide.portuguese.md#communicating-between-js-and-native).

---

### `onNavigationStateChange`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando o carregamento da `WebView` começa ou termina.

| Tipo     | Requerido |
| -------- | --------- |
| function | Não       |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onNavigationStateChange={(navState) => {
    // Acompanhe a navegação de volta no componente
    this.canGoBack = navState.canGoBack;
  }}
/>
```

O objeto `navState` inclui estas propriedades:

```
canGoBack
canGoForward
loading
navigationType (iOS only)
target
title
url
```

---

### `onContentProcessDidTerminate`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando o processo de conteúdo da `WebView` é encerrado.

| Tipo     | Requerido | Plataforma              |
| -------- | --------- | ----------------------- |
| function | Não       | iOS e macOS WKWebView   |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onContentProcessDidTerminate={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('Processo de conteúdo encerrado, recarregando', nativeEvent);
    this.refs.webview.reload();
  }}
/>
```

A função passada para onContentProcessDidTerminate é chamada com um SyntheticEvent envolvendo um nativeEvent com estas propriedades:

```
canGoBack
canGoForward
loading
target
title
url
```

---

### `onScroll`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que é invocada quando o evento scroll é acionado na `WebView`.

| Tipo     | Requerido | Plataforma                   |
| -------- | --------- | ---------------------------- |
| function | Não       | iOS, macOS, Android, Windows |

Exemplo:

```jsx
<Webview
  source={{ uri: 'https://reactnative.dev' }}
  onScroll={syntheticEvent => {
    const { contentOffset } = syntheticEvent.nativeEvent
    console.table(contentOffset)
  }}
/>
```

A função passada para `onScroll` é chamada com um SyntheticEvent envolvendo um nativeEvent com estas propriedades:

```
contentInset
contentOffset
contentSize
layoutMeasurement
velocity
zoomScale
```

---

### `originWhitelist`[⬆](#props-index)<!-- Link gerado com jump2header -->

Lista de strings de origem para permitir a navegação. As strings permitem curingas e são correspondidas com __somente a origem (não o URL completo). Se o usuário tocar para navegar para uma nova página, mas a nova página não estiver nesta lista de permissões, a URL será tratada pelo sistema operacional. As origens padrão da lista de permissões são "http://*" e "https://*".

| Tipo             | Requerido | Plataforma          |
| ---------------- | --------- | ------------------- |
| array of strings | Não       | iOS, Android, macOS |

Exemplo:

```jsx
// permitir apenas URIs que comecem com https:// ou git://

<WebView
  source={{ uri: 'https://reactnative.dev' }}
  originWhitelist={['https://*', 'git://*']}
/>
```

---

### `renderError`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que retorna uma view para mostrar se há um erro.

| Tipo     | Requerido | Plataforma          |
| -------- | --------- | ------------------- |
| function | Não       | iOS, Android, macOS |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  renderError={(errorName) => <Error name={errorName} />}
/>
```

A função passada para `renderError` será chamada com o nome do erro.

---

### `renderLoading`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que retorna um indicador de carregamento. A prop startInLoadingState deve ser definida como true para usar essa prop.

| Tipo     | Requerido | Plataforma          |
| -------- | --------- | ------------------- |
| function | Não       | iOS, Android, macOS |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  startInLoadingState={true}
  renderLoading={() => <Loading />}
/>
```

---

### `scalesPageToFit`[⬆](#props-index)<!-- Link gerado com jump2header -->

Booleano que controla se o conteúdo da Web é dimensionado para caber na exibição e permite que o usuário altere a escala. O valor padrão é `true`.

| Tipo | Requerido | Plataforma |
| ---- | --------- | ---------- |
| bool | Não       | Android    |

---

### `onShouldStartLoadWithRequest`[⬆](#props-index)<!-- Link gerado com jump2header -->

Função que permite o tratamento personalizado de qualquer solicitação de visualização da web. Retorne `true` da função para continuar carregando a solicitação e `false` para interromper o carregamento.

No Android, não é chamado no primeiro carregamento.

| Tipo     | Requerido | Plataforma          |
| -------- | --------- | ------------------- |
| function | Não       | iOS, Android, macOS |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onShouldStartLoadWithRequest={(request) => {
    // Permitir apenas navegar neste site
    return request.url.startsWith('https://reactnative.dev');
  }}
/>
```

O objeto `request` inclui estas propriedades:

```
title
url
loading
target
canGoBack
canGoForward
lockIdentifier
mainDocumentURL (iOS only)
navigationType (iOS only)
isTopFrame (iOS only)
```

---

### `startInLoadingState`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor booleano que força a `WebView` mostrar a visualização de carregamento no primeiro carregamento. Esta prop deve ser definida como `true` para que a prop `renderLoading` funcione.

| Tipo | Requerido | Plataforma          |
| ---- | --------- | ------------------- |
| bool | Não       | iOS, Android, macOS |

---

### `style`[⬆](#props-index)<!-- Link gerado com jump2header -->

Um objeto de estilo que permite personalizar o estilo da `WebView`. Observe que existem estilos padrão (exemplo: você precisa adicionar `flex: 0` ao estilo se quiser usar a propriedade `height`).

| Tipo  | Requerido |
| ----- | --------- |
| style | Não       |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  style={{ marginTop: 20 }}
/>
```

---

### `containerStyle`[⬆](#props-index)<!-- Link gerado com jump2header -->

Um objeto de estilo que permite personalizar o estilo do contêiner da `WebView`. Observe que existem estilos padrão (exemplo: você precisa adicionar `flex: 0` ao estilo se quiser usar a propriedade `height`).

| Tipo  | Requerido |
| ----- | --------- |
| style | Não       |

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  containerStyle={{ marginTop: 20 }}
/>
```

---

### `decelerationRate`[⬆](#props-index)<!-- Link gerado com jump2header -->

Um número de ponto flutuante que determina a rapidez com que a visualização de rolagem desacelera depois que o usuário levanta o dedo. Você também pode usar os atalhos de string `"normal"` e `"fast"` que correspondem às configurações subjacentes do iOS para `UIScrollViewDecelerationRateNormal` e `UIScrollViewDecelerationRateFast` respectivamente:

- normal: 0,998
- rápido: 0,99 (o padrão para visualização na web do iOS)

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| number | Não       | iOS        |

---

### `domStorageEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor booleano para controlar se o DOM Storage está habilitado. Usado apenas no Android.

| Tipo | Requerido | Plataforma |
| ---- | --------- | ---------- |
| bool | Não       | Android    |

---

### `javaScriptEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor booleano para habilitar JavaScript na `WebView`. O valor padrão é `true`.

| Tipo | Requerido |
| ---- | --------- |
| bool | Não       |

---

### `javaScriptCanOpenWindowsAutomatically`[⬆](#props-index)<!-- Link gerado com jump2header -->

Um valor booleano que indica se o JavaScript pode abrir janelas sem interação do usuário. O valor padrão é `falso`.

| Tipo | Requerido |
| ---- | --------- |
| bool | Não       |

---

### `androidLayerType`[⬆](#props-index)<!-- Link gerado com jump2header -->

Especifica o tipo de camada.

Os valores possíveis para `androidLayerType` são:

- `none` (padrão) - A visualização não possui uma camada.
- `software` - A visão tem uma camada de software. Uma camada de software é apoiada por um bitmap e faz com que a exibição seja renderizada usando o pipeline de renderização de software do Android, mesmo se a aceleração de hardware estiver habilitada.
- `hardware` - A visualização tem uma camada de hardware. Uma camada de hardware é apoiada por uma textura específica de hardware e faz com que a exibição seja renderizada usando o pipeline de renderização de hardware do Android, mas somente se a aceleração de hardware estiver ativada para a hierarquia de exibição.

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| string | Não       | Android    |

---

### `mixedContentMode`[⬆](#props-index)<!-- Link gerado com jump2header -->

Especifica o modo de conteúdo misto. ou seja, a WebView permitirá que uma origem segura carregue conteúdo de qualquer outra origem.

Os valores possíveis para `mixedContentMode` são:

- `never` (padrão) - WebView não permitirá que uma origem segura carregue conteúdo de uma origem insegura.
- `always` - A WebView permitirá que uma origem segura carregue conteúdo de qualquer outra origem, mesmo que essa origem seja insegura.
- `compatibility` - WebView tentará ser compatível com a abordagem de um navegador web moderno em relação ao conteúdo misto.

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| string | Não       | Android    |

---

### `thirdPartyCookiesEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor booleano para habilitar cookies de terceiros na `WebView`. Usado no Android Lollipop e acima apenas porque os cookies de terceiros são ativados por padrão no Android Kitkat e abaixo e no iOS. O valor padrão é `true`. Para saber mais sobre cookies, leia o [Guia](Guide.portuguese.md#Managing-Cookies)

| Tipo | Requerido | Plataforma |
| ---- | --------- | ---------- |
| bool | Não       | Android    |

---

### `userAgent`[⬆](#props-index)<!-- Link gerado com jump2header -->

Define o agente do usuário para a `WebView`.

| Tipo   | Requerido | Plataforma          |
| ------ | --------- | ------------------- |
| string | Não       | iOS, Android, macOS |

---

### `applicationNameForUserAgent`[⬆](#props-index)<!-- Link gerado com jump2header -->

Anexar ao agente de usuário existente. Definir `userAgent` substituirá isso.

| Tipo   | Requerido | Plataforma          |
| ------ | --------- | ------------------- |
| string | Não       | iOS, Android, macOS |

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  applicationNameForUserAgent={'DemoApp/1.1.0'}
/>
// O User-Agent resultante será semelhante a:
// Mozilla/5.0 (Linux; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.021; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36 DemoApp/1.1.0
// Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 DemoApp/1.1.0
```

### `allowsFullscreenVideo`[⬆](#props-index)<!-- Link gerado com jump2header -->

Booleano que determina se os vídeos podem ser reproduzidos em tela cheia. O valor padrão é `falso`.

| Tipo | Requerido | Plataforma |
| ---- | --------- | ---------- |
| bool | Não       | Android    |

---

### `allowsInlineMediaPlayback`[⬆](#props-index)<!-- Link gerado com jump2header -->

Booleano que determina se os vídeos HTML5 são reproduzidos inline ou usam o controlador de tela cheia nativo. O valor padrão é `falso`.

> **NOTA**
>
> Para que o vídeo seja reproduzido inline, não apenas esta propriedade precisa ser definida como `true`, mas o elemento de vídeo no documento HTML também deve incluir o atributo `webkit-playsinline`.

| Tipo | Requerido | Plataforma |
| ---- | --------- | ---------- |
| bool | Não       | iOS        |

---
### `allowsAirPlayForMediaPlayback`[⬆](#props-index)<!-- Link generated with jump2header -->

Um valor booleano que indica se o AirPlay é permitido. O valor padrão é `falso`.

| Tipo | Requerido | Plataforma      |
| ---- | --------- | --------------- |
| bool | Não       | iOS e macOS     |

---
### `bounces`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor booleano que determina se a visualização da Web é rejeitada quando atinge a borda do conteúdo. O valor padrão é `true`.

| Tipo | Requerido | Plataforma |
| ---- | --------- | ---------- |
| bool | Não       | iOS        |

---

### `overScrollMode`[⬆](#props-index)<!-- Link gerado com jump2header -->

Especifica o modo de sobrerolagem.

Os valores possíveis para `overScrollMode` são:

- `always` (padrão) - Sempre permite que um usuário sobrescreva esta visualização, desde que seja uma visualização que possa rolar.
- `content` - Permitir que um usuário sobrescreva esta visualização somente se o conteúdo for grande o suficiente para rolar significativamente, desde que seja uma visualização que possa rolar.
- `never` - Nunca permita que um usuário sobrescreva esta visualização.

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| string | Não       | Android    |

---

### `contentInset`[⬆](#props-index)<!-- Link gerado com jump2header -->

A quantidade pela qual o conteúdo da visualização da web é inserido a partir das bordas da visualização de rolagem. Padrão {top: 0, left: 0, bottom: 0, right: 0}.

| Tipo                                                               | Requerido | Plataforma |
|  ----------------------------------------------------------------- | --------- | ---------- |
| object: {top: number, left: number, bottom: number, right: number} | Não       | iOS        |

---

### `contentInsetAdjustmentBehavior`[⬆](#props-index)<!-- Link gerado com jump2header -->

Esta propriedade especifica como as inserções da área segura são usadas para modificar a área de conteúdo da visualização de rolagem. O valor padrão dessa propriedade é "never". Disponível no iOS 11 e posterior. O padrão é `never`.

Valores possíveis:

- `automatic`
- `scrollableAxes`
- `never`
- `always`

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| string | Não       | iOS        |

---

### `contentMode`[⬆](#props-index)<!-- Link gerado com jump2header -->

Controla o tipo de conteúdo a ser carregado. Disponível no iOS 13 ou posterior. O padrão é "recomendado", que carrega conteúdo móvel no iPhone e iPad Mini, mas conteúdo de desktop em iPads maiores.

Consulte [Apresentando a navegação de classe desktop no iPad](https://developer.apple.com/videos/play/wwdc2019/203/) para saber mais.

Valores possíveis:

- `recommended`
- `mobile`
- `desktop`

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| string | Não       | iOS        |

---

### `dataDetectorTypes`[⬆](#props-index)<!-- Link gerado com jump2header -->

Determina os tipos de dados convertidos em URLs clicáveis no conteúdo da visualização da web. Por padrão, apenas números de telefone são detectados.

Você pode fornecer um tipo ou uma matriz de vários tipos.

Os valores possíveis para `dataDetectorTypes` são:

- `phoneNumber`
- `link`
- `address`
- `calendarEvent`
- `none`
- `all`
- `trackingNumber`
- `flightNumber`
- `lookupSuggestion`

| Tipo             | Requerido | Plataforma |
| ---------------- | --------- | ---------- |
| string, or array | Não       | iOS        |

---

### `scrollEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor booleano que determina se a rolagem está habilitada na `WebView`. O valor padrão é `true`. Definir isso como `false` impedirá que a visualização da Web mova o corpo do documento quando o teclado aparecer sobre uma entrada.

| Tipo | Requerido | Plataforma      |
| ---- | --------- | --------------- |
| bool | Não       | iOS e macOS     |

---

### `nestedScrollEnabled`[⬆](#props-index)

Valor booleano que determina se a rolagem é possível na `WebView` quando usado dentro de um `ScrollView` no Android. O valor padrão é `falso`.

Definir isso como `true` impedirá que o `ScrollView` role ao rolar de dentro do `WebView`.

| Tipo | Requerido | Plataforma    |
| ---- | --------- | ------------- |
| bool | Não       | Android       |

---

### `setBuiltInZoomControls`[⬆](#props-index)<!-- Link gerado com jump2header -->

Define se o WebView deve usar seus mecanismos de zoom integrados. O valor padrão é `true`. Definir isso como "falso" impedirá o uso de um gesto de pinça para controlar o zoom.

| Tipo | Requerido | Plataforma    |
| ---- | --------- | ------------- |
| bool | Não       | Android       |

---

### `setDisplayZoomControls`[⬆](#props-index)<!-- Link gerado com jump2header -->

Define se o WebView deve exibir controles de zoom na tela ao usar os mecanismos de zoom integrados (consulte `setBuiltInZoomControls`). O valor padrão é `falso`.

| Tipo | Requerido | Plataforma    |
| ---- | --------- | ------------- |
| bool | Não       | Android       |

---

### `directionalLockEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Um valor booleano que determina se a rolagem está desabilitada em uma direção específica.
O valor padrão é `true`.

| Tipo | Requerido | Plataforma |
| ---- | --------- | ---------- |
| bool | Não       | iOS        |

---

### `showsHorizontalScrollIndicator`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor booleano que determina se um indicador de rolagem horizontal é mostrado na `WebView`. O valor padrão é `true`.

| Tipo | Requerido | Plataforma          |
| ---- | --------- | ------------------- |
| bool | Não       | iOS, Android, macOS |

---

### `showsVerticalScrollIndicator`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor booleano que determina se um indicador de rolagem vertical é mostrado na `WebView`. O valor padrão é `true`.

| Tipo | Requerido | Plataforma          |
| ---- | --------- | ------------------- |
| bool | Não       | iOS, Android, macOS |

---

### `geolocationEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Defina se a geolocalização está habilitada na `WebView`. O valor padrão é `falso`. Usado apenas no Android.

| Tipo | Requerido | Plataforma |
| ---- | --------- | ---------- |
| bool | Não       | Android    |

---

### `allowFileAccessFromFileURLs`[⬆](#props-index)<!-- Link gerado com jump2header -->

Booleano que define se o JavaScript executado no contexto de uma URL de esquema de arquivo deve ter permissão para acessar o conteúdo de outras URLs de esquema de arquivo. O valor padrão é `falso`.

| Tipo | Requerido | Plataforma          |
| ---- | --------- | ------------------- |
| bool | Não       | iOS, Android, macOS |

---

### `allowUniversalAccessFromFileURLs`[⬆](#props-index)<!-- Link gerado com jump2header -->

Booleano que define se o JavaScript executado no contexto de uma URL de esquema de arquivo deve ter permissão para acessar conteúdo de qualquer origem. Incluindo o acesso ao conteúdo de outros URLs de esquema de arquivos. O valor padrão é `falso`.

| Tipo | Requerido | Plataforma           |
| ---- | --------- | -------------------- |
| bool | Não       | iOS, Android, macOS  |

---

### `allowingReadAccessToURL`[⬆](#props-index)<!-- Link gerado com jump2header -->

Um valor String que indica quais URLs o arquivo da WebView pode referenciar em scripts, solicitações AJAX e importações CSS. Isso é usado apenas para WebViews que são carregados com um source.uri definido como um URL `'file://'`. Se não for fornecido, o padrão é permitir apenas acesso de leitura à URL fornecida no próprio source.uri.

| Tipo   | Requerido | Plataforma    |
| ------ | --------- | ------------- |
| string | Não       | iOS e macOS   |

---

### `keyboardDisplayRequiresUserAction`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se false, o conteúdo da Web pode exibir programaticamente o teclado. O valor padrão é `true`.

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | iOS        |

---

### `hideKeyboardAccessoryView`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se true, isso ocultará a visualização do acessório de teclado (< > e Feito).

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | iOS        |

---

### `allowsBackForwardNavigationGestures`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se for verdade, isso será capaz de gestos de furto horizontal. O valor padrão é `falso`.

| Tipo    | Requerido | Plataforma    |
| ------- | --------- | ------------- |
| boolean | Não       | iOS e macOS   |

---

### `incognito`[⬆](#props-index)<!-- Link gerado com jump2header -->

Não armazena nenhum dado durante o tempo de vida da WebView.

| Tipo    | Requerido | Plataforma          |
| ------- | --------- | ------------------- |
| boolean | Não       | iOS, Android, macOS |

---

### `allowFileAccess`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se true, isso permitirá o acesso ao sistema de arquivos por meio de URIs `file://`. O valor padrão é `falso`.

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | Android    |

---

### `saveFormDataDisabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Define se a WebView deve desabilitar o salvamento de dados de formulário. O valor padrão é `falso`. Esta função não tem nenhum efeito a partir do nível 26 da API do Android, pois há um recurso de preenchimento automático que armazena dados de formulário.

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | Android    |

---

### `cacheEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Define se a WebView deve usar o cache do navegador.

| Tipo    | Requerido | Padrão | Plataforma           |
| ------- | --------- | ------- | ------------------- |
| boolean | Não       | true    | iOS, Android, macOS |

---

### `cacheMode`[⬆](#props-index)<!-- Link gerado com jump2header -->

Substitui a maneira como o cache é usado. A forma como o cache é usado é baseado no tipo de navegação. Para um carregamento de página normal, o cache é verificado e o conteúdo é revalidado conforme necessário. Ao navegar de volta, o conteúdo não é revalidado, em vez disso, o conteúdo é apenas recuperado do cache. Essa propriedade permite que o cliente substitua esse comportamento.

Os valores possíveis são:

- `LOAD_DEFAULT` - Modo de uso de cache padrão. Se o tipo de navegação não impor nenhum comportamento específico, use recursos em cache quando estiverem disponíveis e não expirados, caso contrário, carregue recursos da rede.
- `LOAD_CACHE_ELSE_NETWORK` - Use recursos em cache quando estiverem disponíveis, mesmo que tenham expirado. Caso contrário, carregue recursos da rede.
- `LOAD_NO_CACHE` - Não use o cache, carregue da rede.
- `LOAD_CACHE_ONLY` - Não use a rede, carregue do cache.

| Tipo   | Requerido | Padrão       | Plataforma |
| ------ | --------- | ------------ | ---------- |
| string | Não       | LOAD_DEFAULT | Android    |

---

### `pagingEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se o valor desta propriedade for true, a visualização de rolagem para em múltiplos dos limites da visualização de rolagem quando o usuário rola. O valor padrão é falso.

| Tipo    | Requerido | Plataforma |
| ------- | --------- | -------- |
| boolean | Não       | iOS      |

---

### `allowsLinkPreview`[⬆](#props-index)<!-- Link gerado com jump2header -->

Um valor booleano que determina se pressionar um link exibe uma visualização do destino do link. No iOS esta propriedade está disponível em dispositivos que suportam 3D Touch. No iOS 10 e posterior, o valor padrão é true; antes disso, o valor padrão é false.

| Tipo    | Requerido | Plataforma    |
| ------- | --------- | ------------- |
| boolean | Não       | iOS e macOS   |

---

### `sharedCookiesEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Defina `true` se os cookies compartilhados de `[NSHTTPCookieStorage sharedHTTPCookieStorage]` devem ser usados ​​para cada solicitação de carregamento no WebView. O valor padrão é `falso`. Para saber mais sobre cookies, leia o [Guia](Guide.portuguese.md#Managing-Cookies)

| Tipo    | Requerido | Plataforma    |
| ------- | --------- | ------------- |
| boolean | Não       | iOS e macOS   |

---

### `textZoom`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se o usuário definiu um tamanho de fonte personalizado no sistema Android, ocorre uma escala indesejável da interface do site no WebView.

Ao definir o tamanho padrão do parâmetro textZoom (100), esse efeito indesejável desaparece.

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| number | Não       | Android    |

Exemplo:

`<WebView textZoom={100} />`

---

### `pullToRefreshEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Valor booleano que determina se um gesto de puxar para atualizar está disponível na `WebView`. O valor padrão é `falso`. Se `true`, define `bounces` automaticamente para `true`.

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | iOS        |

### `refreshControlLightMode`[⬆](#props-index)<!-- Link gerado com jump2header -->

(somente ios)

Valor booleano que determina se a cor do controle de atualização é branca ou não.
O padrão é `false`, o que significa que a cor do controle de atualização será o padrão.

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | iOS        |

### `ignoreSilentHardwareSwitch`[⬆](#props-index)<!-- Link gerado com jump2header -->

(somente ios)

Quando definido como true, o switch silencioso do hardware é ignorado. Padrão: `falso`

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | iOS        |

### `onFileDownload`[⬆](#props-index)<!-- Link gerado com jump2header -->
Esta propriedade é somente para iOS.

Função que é chamada quando o cliente precisa baixar um arquivo.

Somente iOS 13+: se a visualização da web navegar para um URL que resulta em um HTTP
resposta com um cabeçalho Content-Disposition 'attachment...', então
isso será chamado.

iOS 8+: Se o tipo MIME indicar que o conteúdo não pode ser renderizado pelo
webview, que também fará com que isso seja chamado. Nas versões do iOS anteriores a 13,
esta é a única condição que fará com que esta função seja chamada.

O aplicativo precisará fornecer seu próprio código para realmente fazer o download
o arquivo.

Se não for fornecido, o padrão é permitir que o webview tente renderizar o arquivo.

Exemplo:

```jsx
<WebView
  source={{ uri: 'https://reactnative.dev' }}
  onFileDownload={({ nativeEvent: { downloadUrl } }) => {
    // Você usa downloadUrl que é uma string para baixar arquivos como quiser.
  }}
/>
```

| Tipo     | Requerido | Plataforma |
| -------- | --------- | ---------- |
| function | Não       | iOS        |

---

### `limitsNavigationsToAppBoundDomains`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se true indica ao WebKit que um WKWebView navegará apenas para domínios vinculados a aplicativos. Aplicável apenas para iOS 14 ou superior.

Uma vez definido, qualquer tentativa de sair de um domínio vinculado ao aplicativo falhará com o erro "Falha no domínio vinculado ao aplicativo".
Os aplicativos podem especificar até 10 domínios "limitados ao aplicativo" usando uma nova chave Info.plist `WKAppBoundDomains`. Para obter mais informações, consulte [Domínios vinculados a aplicativos](https://webkit.org/blog/10882/app-bound-domains/).

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | iOS        |

Exemplo:

```jsx
<WebView limitsNavigationsToAppBoundDomains={true} />
```

---

### `textInteractionEnabled`[⬆](#props-index)<!-- Link gerado com jump2header -->

Se false indica ao WebKit que um WKWebView não irá interagir com o texto, não mostrando um loop de seleção de texto. Aplicável apenas para iOS 14.5 ou superior.

O padrão é `true`.

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | iOS        |

Exemplo:

```jsx
<WebView textInteractionEnabled={false} />
```

---

### `mediaCapturePermissionGrantType`

Esta propriedade especifica como lidar com solicitações de permissão de captura de mídia. O padrão é `prompt`, fazendo com que o usuário seja solicitado repetidamente. Disponível no iOS 15 e posterior.

Valores possíveis:

- `grantIfSameHostElsePrompt`: Se o host da origem de segurança da solicitação de permissão for igual ao host da URL atual do WebView, a permissão será concedida se já tiver sido concedida antes. Caso contrário, o usuário será solicitado.
- `grantIfSameHostElseDeny`: Se o host da origem de segurança da solicitação de permissão for igual ao host da URL atual do WebView, a permissão será concedida se já tiver sido concedida antes. Caso contrário, é negado.
- `deny`
- `grant`: A permissão é concedida se já tiver sido concedida antes.
- `prompt`

Observe que uma concessão ainda pode resultar em um prompt, por exemplo, se o usuário nunca tiver sido solicitado a fornecer a permissão antes.

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| string | Não       | iOS        |

Exemplo:

```javascript
<WebView mediaCapturePermissionGrantType={'grantIfSameHostElsePrompt'} />
```

---

### `autoManageStatusBarEnabled`

Se definido como `true`, a barra de status será automaticamente ocultada/exibida pela WebView, especificamente quando o vídeo em tela cheia estiver sendo assistido. Se for `false`, a WebView não gerenciará a barra de status. O valor padrão é `true`.

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | iOS        |

Exemplo:

```javascript
<WebView autoManageStatusBarEnabled={false} />
```

### `setSupportMultipleWindows`

Define se a WebView oferece suporte a várias janelas. Consulte [documentação do Android]('https://developer.android.com/reference/android/webkit/WebSettings#setSupportMultipleWindows(boolean)') para obter mais informações.
Definir isso como false pode expor o aplicativo a essa [vulnerabilidade](https://alesandroortiz.com/articles/uxss-android-webview-cve-2020-6506/), permitindo que um iframe malicioso escape para o DOM da camada superior.

| Tipo    | Requerido | Padrão  | Plataforma |
| ------- | --------- | ------- | ---------- |
| boolean | Não       | true    | Android    |

Exemplo:

```javascript
<WebView setSupportMultipleWindows={false} />
```

### `enableApplePay`

Um valor booleano quando definido como `true`, a WebView será renderizado com suporte ao Apple Pay. Uma vez definido, os sites poderão invocar o Apple Pay a partir do React Native Webview.
Isso vem com recursos como [`injectJavaScript`](Reference.portuguese.md#injectjavascriptstr), html5 histórico, [`sharedCookiesEnabled`](Reference.portuguese.md#sharedCookiesEnabled), [`injectedJavaScript`](Reference.portuguese.md#injectedjavascript), [`injectedJavaScriptBeforeContentLoaded`](Reference.portuguese.md#injectedjavascriptbeforecontentloaded) não funcionará veja na [Nota de lançamento do Apple Pay](https://developer.apple.com/documentation/safari-release-notes/safari-13-release-notes#Payment-Request-API).

Se você for solicitado a enviar uma mensagem para App , a página da Web deve chamar explicitamente o manipulador de mensagens do webkit e recebê-lo no manipulador `onMessage` no lado nativo.

```javascript
window.webkit.messageHandlers.ReactNativeWebView.postMessage("hello apple pay")
```

| Tipo    | Requerido | Padrão  | Plataforma |
| ------- | --------- | ------- | --------- |
| boolean | Não       | false   | iOS       |

Exemplo:

```javascript
<WebView enableApplePay={true} />
```

### `forceDarkOn`

Configurando o tema escuro
*NOTA* : A configuração de forçar o tema escuro não é persistente. Você deve chamar o método estático sempre que o processo do aplicativo for iniciado.

*NOTA* : A mudança do modo dia<->noite é uma alteração de configuração, portanto, por padrão, a atividade será reiniciada e serão coletados os novos valores para aplicar o tema. Tome cuidado ao substituir esse comportamento padrão para garantir que esse método ainda seja chamado quando as alterações forem feitas.

| Tipo    | Requerido | Plataforma |
| ------- | --------- | ---------- |
| boolean | Não       | Android    |

Exemplo:

```javascript
<WebView forceDarkOn={false} />
```
### `menuItems`

Uma matriz de objetos de itens de menu personalizados que serão exibidos ao selecionar o texto. Uma matriz vazia suprimirá o menu. Usado em conjunto com `onCustomMenuSelection`

| Tipo                                                               | Requerido | Plataforma |
| ------------------------------------------------------------------ | --------  | --------   |
| array of objects: {label: string, key: string}                     | Não       | iOS, Android        |

Exemplo:

```javascript
<WebView menuItems={[{ label: 'Tweet', key: 'tweet' }, { label: 'Guardar para depois', key: 'saveForLater' }]} />
```

### `onCustomMenuSelection`

Função chamada quando um item de menu personalizado é selecionado. Ele recebe um evento Nativo, que inclui três chaves personalizadas: `label`, `key` e `selectedText`.

| Tipo                                                               | Requerido | Plataforma |
| ------------------------------------------------------------------ | --------  | --------   |
| function                                                           | Não       | iOS, Android        |

```javascript
<WebView
  menuItems={[{ label: 'Tweet', key: 'tweet' }, { label: 'Guardar para depois', key: 'saveForLater' }]}
  onCustomMenuSelection={(webViewEvent) => {
    const { label } = webViewEvent.nativeEvent; // O nome do item de menu, ou seja, 'Tweet'
    const { key } = webViewEvent.nativeEvent; // A chave do item de menu, ou seja, 'tweet'
    const { selectedText } = webViewEvent.nativeEvent; // Texto destacado
  }}
/>
```

### `basicAuthCredential`

Um objeto que especifica as credenciais de um usuário a serem usadas para autenticação básica.

- `username` (string) - Um nome de usuário usado para autenticação básica.
- `password` (string) - Uma senha usada para autenticação básica.

| Tipo   | Requerido |
| ------ | --------- |
| object | Não       |

### `minimumFontSize`

O Android impõe um tamanho mínimo de fonte com base nesse valor. Um número inteiro não negativo entre 1 e 72. Qualquer número fora do intervalo especificado será fixado. O valor padrão é 8. Se você estiver usando tamanhos de fonte menores e estiver tendo problemas para ajustar a janela inteira em uma tela, tente definir um valor menor.

| Tipo   | Requerido | Plataforma |
| ------ | --------- | ---------- |
| number | Não       | Android    |

Exemplo:

```javascript
<WebView minimumFontSize={1} />
```

## Métodos

### `goForward()`[⬆](#methods-index)<!-- Link gerado com jump2header -->

```javascript
goForward();
```

Avançar uma página no histórico da visualização da web.

### `goBack()`[⬆](#methods-index)<!-- Link gerado com jump2header -->

```javascript
goBack();
```

Volte uma página no histórico da visualização da web.

### `reload()`[⬆](#methods-index)<!-- Link gerado com jump2header -->

```javascript
reload();
```

Recarrega a página atual.

### `stopLoading()`[⬆](#methods-index)<!-- Link gerado com jump2header -->

```javascript
stopLoading();
```

Pare de carregar a página atual.

### `injectJavaScript(str)`[⬆](#methods-index)<!-- Link gerado com jump2header -->

```javascript
injectJavaScript('... javascript string ...');
```

Executa a string JavaScript.

Para saber mais, leia o guia [Comunicação entre JS e Native](Guide.portuguese.md#communicating-between-js-and-native).

### `requestFocus()`[⬆](#methods-index)<!-- Link gerado com jump2header -->

```javascript
requestFocus();
```

Solicite a webView para pedir o foco. (As pessoas que trabalham em aplicativos de TV podem querer dar uma olhada nisso!)

### `postMessage(str)`[⬆](#methods-index)<!-- Link gerado com jump2header -->

```javascript
postMessage('mensagem');
```

Postagem de uma mensagem no WebView, tratada por [`onMessage`](Reference.portuguese.md#onmessage).

### `clearFormData()`[⬆](#methods-index)<!-- Link gerado com jump2header -->

(somente Android)

```javascript
clearFormData();
```

Remove o pop-up de preenchimento automático do campo de formulário em foco no momento, se presente. [referência do desenvolvedor.android.com](<https://developer.android.com/reference/android/webkit/WebView.html#clearFormData()>)

### `clearCache(bool)`[⬆](#methods-index)<!-- Link gerado com jump2header -->

(somente Android)

```javascript
clearCache(true)
```

Limpa o cache de recursos. Observe que o cache é por aplicativo, portanto, isso limpará o cache de todos os WebViews usados. [referência do desenvolvedor.android.com](<https://developer.android.com/reference/android/webkit/WebView.html#clearCache(boolean)>)

### `clearHistory()`[⬆](#methods-index)<!-- Link gerado com jump2header -->

(somente Android)

```javascript
clearHistory();
```

Diz a este WebView para limpar sua lista interna de retorno/encaminhamento. [referência do desenvolvedor.android.com](<https://developer.android.com/reference/android/webkit/WebView.html#clearHistory()>)

## Outros documentos

Confira também nosso [Guia de Introdução](Getting-Started.portuguese.md) e [Guia Detalhado](Guide.portuguese.md).

## Traduções

Esse arquivo está disponível em:

- [Inglês](Reference.md)
- [Italiano](Reference.italian.md)

