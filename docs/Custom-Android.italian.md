Nonostante la web view integrata disponga di molte funzionalità, non è possibile gestire tutti i casi d'uso in React Native. Tuttavia, è possibile estendere la web view con codice nativo senza dover forkare React Native o duplicare l'intero codice esistente della web view.

Prima di procedere, è consigliabile avere un'idea di base  dei concetti legati ai [native UI components](https://reactnative.dev/docs/native-components-android) (componenti dell'interfaccia utente nativi). Inoltre, è opportuno familiarizzarsi con il [native code for web views](https://github.com/react-native-webview/react-native-webview/blob/master/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManager.java) (codice nativo per le web view), poiché sarà necessario farvi riferimento durante l'implementazione delle nuove funzionalità, anche se non è richiesta una conoscenza approfondita.

## Codice nativo
Per iniziare, dovrai creare una sottoclasse di `RNCWebViewManager`, `RNCWebView` e `RNCWebViewClient`. Poi, nel gestore della view, sovrascrivi i seguenti metodi:

- `createReactWebViewInstance`
- `getName`
- `addEventEmitters`

```java
@ReactModule(name = CustomWebViewManager.REACT_CLASS)
public class CustomWebViewManager extends RNCWebViewManager {
  /* Il nome usato qua deve essere identico a quello usato in JS. */
  protected static final String REACT_CLASS = "RCTCustomWebView";

  protected static class CustomWebViewClient extends RNCWebViewClient { }

  protected static class CustomWebView extends RNCWebView {
    public CustomWebView(ThemedReactContext reactContext) {
      super(reactContext);
    }
  }

  @Override
  protected RNCWebView createViewInstance(ThemedReactContext reactContext) {
    return super.createViewInstance(reactContext, new CustomWebView(reactContext));
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected void addEventEmitters(ThemedReactContext reactContext, RNCWebView view) {
    view.setWebViewClient(new CustomWebViewClient());
  }
}
```

Poi dovrai seguire i soliti passaggi per [register the module](https://reactnative.dev/docs/native-modules-android#register-the-module-android-specific) (registrare il modulo Android).

### Aggiungere nuove proprietà
Per aggiungere una nuova proprietà, è necessario includerla in `CustomWebView` e successivamente esporla tramite `CustomWebViewManager`.

```java
public class CustomWebViewManager extends RNCWebViewManager {
  ...

  protected static class CustomWebView extends RNCWebView {
    public CustomWebView(ThemedReactContext reactContext) {
      super(reactContext);
    }

    protected @Nullable String mFinalUrl;

    public void setFinalUrl(String url) {
        mFinalUrl = url;
    }

    public String getFinalUrl() {
        return mFinalUrl;
    }
  }

  ...

  @ReactProp(name = "finalUrl")
  public void setFinalUrl(WebView view, String url) {
    ((CustomWebView) view).setFinalUrl(url);
  }
}
```

### Aggiungere nuovi eventi
Per gli eventi, dovrai prima creare una sottoclasse degli eventi.

```java
// NavigationCompletedEvent.java
public class NavigationCompletedEvent extends Event<NavigationCompletedEvent> {
  private WritableMap mParams;

  public NavigationCompletedEvent(int viewTag, WritableMap params) {
    super(viewTag);
    this.mParams = params;
  }

  @Override
  public String getEventName() {
    return "navigationCompleted";
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    init(getViewTag());
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), mParams);
  }
}
```

Puoi far partire l'evento nel tuo client della web view. Puoi anche collegare handler già esistenti se i tuoi eventi si basano su di essi.

Fai riferimento al file [RNCWebViewManager.java](https://github.com/react-native-webview/react-native-webview/blob/master/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManager.java) nel codice sorgente di `react-native-webview` per vedere quali handler sono disponibili e come sono implementati. Puoi estendere qualsiasi metodo qui per fornire funzionalità aggiuntive.

```java
public class NavigationCompletedEvent extends Event<NavigationCompletedEvent> {
  private WritableMap mParams;

  public NavigationCompletedEvent(int viewTag, WritableMap params) {
    super(viewTag);
    this.mParams = params;
  }

  @Override
  public String getEventName() {
    return "navigationCompleted";
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    init(getViewTag());
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), mParams);
  }
}

// CustomWebViewManager.java
protected static class CustomWebViewClient extends RNCWebViewClient {
  @Override
  public boolean shouldOverrideUrlLoading(WebView view, String url) {
    boolean shouldOverride = super.shouldOverrideUrlLoading(view, url);
    String finalUrl = ((CustomWebView) view).getFinalUrl();

    if (!shouldOverride && url != null && finalUrl != null && new String(url).equals(finalUrl)) {
      final WritableMap params = Arguments.createMap();
      dispatchEvent(view, new NavigationCompletedEvent(view.getId(), params));
    }

    return shouldOverride;
  }
}
```

Infine, esponi gli eventi in `CustomWebViewManager` attraverso `getExportedCustomDirectEventTypeConstants`. Nota che attualmente l'implementazione predefinita restituisce `null`, ma questo potrebbe cambiare in futuro.

```java
public class CustomWebViewManager extends RNCWebViewManager {
  ...

  @Override
  public @Nullable
  Map getExportedCustomDirectEventTypeConstants() {
    Map<String, Object> export = super.getExportedCustomDirectEventTypeConstants();
    if (export == null) {
      export = MapBuilder.newHashMap();
    }
    export.put("navigationCompleted", MapBuilder.of("registrationName", "onNavigationCompleted"));
    return export;
  }
}
```

## Interfaccia JavaScript

Per usufruire della tua web view personalizzata, è consigliabile creare una classe dedicata che restituisca un componente `WebView` con la prop `nativeConfig.component` impostata sul tuo componente nativo (come dimostrato di seguito).

Per richiamare il tuo componente nativo, puoi usare il metodo `requireNativeComponent`, come di consueto per i componenti personalizzati.

```javascript
import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';
import { WebView } from 'react-native-webview';

export default class CustomWebView extends Component {
  render() {
    return (
      <WebView {...this.props} nativeConfig={{ component: RCTCustomWebView }} />
    );
  }
}

const RCTCustomWebView = requireNativeComponent('RCTCustomWebView');
```

Se desideri aggiungere props personalizzate al tuo componente nativo, puoi utilizzare `nativeConfig.props` sulla web view.

Per gli eventi, l'handler deve essere sempre una funzione. Ciò significa che non è sicuro chiamare  l'handler direttamente da `this.props`, poiché l'utente potrebbe non averne fornito uno. L'approccio di base consiste nel creare un handler delle'evento nella tua classe, per poi invocarlo solamente se l'handler fornito da `this.props` esiste.

Se non sei sicuro su come qualcosa debba essere implementato nel lato JS, dai un'occhiata al file [WebView.android.tsx](https://github.com/react-native-webview/react-native-webview/blob/master/src/WebView.android.tsx) nel codice sorgente di React Native WebView.

```javascript
export default class CustomWebView extends Component {
  _onNavigationCompleted = (event) => {
    const { onNavigationCompleted } = this.props;
    onNavigationCompleted && onNavigationCompleted(event);
  };

  render() {
    return (
      <WebView
        {...this.props}
        nativeConfig={{
          component: RCTCustomWebView,
          props: {
            finalUrl: this.props.finalUrl,
            onNavigationCompleted: this._onNavigationCompleted,
          },
        }}
      />
    );
  }
}
```

### Traduzioni
Questo file è disponibile nelle seguenti lingue:
- [Inglese](Custom-Android.md)
- [Portoghese brasiliano](Custom-Android.portuguese.md)