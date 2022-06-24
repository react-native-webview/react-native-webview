Embora a visualização da Web integrada tenha muitos recursos, não é possível lidar com todos os casos de uso no React Native. Você pode, no entanto, estender a visualização da web com código nativo sem bifurcar o React Native ou duplicar todo o código de visualização da web existente.

Antes de fazer isso, você deve estar familiarizado com os conceitos de [componentes de interface do usuário nativos](https://reactnative.dev/docs/native-components-android). Você também deve se familiarizar com o [código nativo para visualizações da web](https://github.com/react-native-webview/react-native-webview/blob/master/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManager.java), pois você terá que usar isso como referência ao implementar novos recursos, embora não seja necessária uma compreensão profunda.

## Código Nativo

Para começar, você precisará criar uma subclasse de `RNCWebViewManager`, `RNCWebView` e `RNCWebViewClient`. Em seu gerenciador de visualizações, você precisará substituir:

- `createReactWebViewInstance`
- `getName`
- `addEventEmitters`

```java
@ReactModule(name = CustomWebViewManager.REACT_CLASS)
public class CustomWebViewManager extends RNCWebViewManager {
  /* Este nome deve corresponder ao que estamos nos referindo em JS */
  protected static final String REACT_CLASS = "RCTCustomWebView";

  protected static class CustomWebViewClient extends RNCWebViewClient { }

  protected static class CustomWebView extends RNCWebView {
    public CustomWebView(ThemedReactContext reactContext) {
      super(reactContext);
    }
  }

  @Override
  protected RNCWebView createRNCWebViewInstance(ThemedReactContext reactContext) {
    return new CustomWebView(reactContext);
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected void addEventEmitters(ThemedReactContext reactContext, WebView view) {
    view.setWebViewClient(new CustomWebViewClient());
  }
}
```

Você precisará seguir as etapas usuais para [registrar o módulo](https://reactnative.dev/docs/native-modules-android#register-the-module-android-specific).

### Adicionando novas propriedades

Para adicionar uma nova propriedade, você precisará adicioná-la a `CustomWebView` e depois expô-la em `CustomWebViewManager`.

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

### Adicionando novos eventos

Para eventos, primeiro você precisará criar uma subclasse de evento.

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

Você pode acionar o evento em seu cliente de visualização da web. Você pode conectar manipuladores existentes se seus eventos forem baseados neles.

Você deve consultar [RNCWebViewManager.java](https://github.com/react-native-webview/react-native-webview/blob/master/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManager.java) na base de código react-native-webview para ver quais manipuladores estão disponíveis e como eles são implementados. Você pode estender quaisquer métodos aqui para fornecer funcionalidade extra.

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

Finalmente, você precisará expor os eventos em `CustomWebViewManager` através de `getExportedCustomDirectEventTypeConstants`. Observe que atualmente, a implementação padrão retorna `null`, mas isso pode mudar no futuro.

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

## Interface JavaScript

Para usar sua visualização da Web personalizada, você pode criar uma classe para ela. Sua classe deve retornar um componente `WebView` com o prop `nativeConfig.component` definido para seu componente nativo (veja abaixo).

Para obter seu componente nativo, você deve usar `requireNativeComponent`: o mesmo que para componentes personalizados regulares.

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

Se você quiser adicionar props customizadas ao seu componente nativo, você pode usar `nativeConfig.props` na visualização da web.

Para eventos, o manipulador de eventos deve sempre ser definido para uma função. Isso significa que não é seguro usar o manipulador de eventos diretamente de `this.props`, pois o usuário pode não ter fornecido um. A abordagem padrão é criar um manipulador de eventos em sua classe e, em seguida, invocar o manipulador de eventos fornecido em `this.props` se ele existir.

Se você não tiver certeza de como algo deve ser implementado do lado do JS, consulte [WebView.android.tsx](https://github.com/react-native-webview/react-native-webview/blob/master/src/WebView.android.tsx) na fonte React Native WebView.

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

## Traduções

Esse arquivo está disponível em:

- [Inglês](Custom-Android.md)