**OBSERVAÇÃO: este documento foi importado da [documentação original do WebView](https://github.com/facebook/react-native-website/blob/7d3e9e120e38a7ba928f6b173eb98f88b6f2f85f/docs/custom-webview-ios.md). Embora possa ser útil, ainda não foi adaptado ao React Native WebView.**

Embora a visualização da Web integrada tenha muitos recursos, não é possível lidar com todos os casos de uso no React Native. Você pode, no entanto, estender a visualização da web com código nativo sem bifurcar o React Native ou duplicar todo o código de visualização da web existente.

Antes de fazer isso, você deve estar familiarizado com os conceitos em [componentes nativos da interface do usuário](native-components-ios). Você também deve se familiarizar com o [código nativo para visualizações da web](https://github.com/react-native-webview/react-native-webview/blob/master/apple/RNCWebViewManager.m), pois você terá para usar isso como referência ao implementar novos recursos, embora não seja necessário um entendimento profundo.

## Código Nativo

Como para componentes nativos regulares, você precisa de um gerenciador de visualização e uma visualização da web.

Para a visualização, você precisará criar uma subclasse de `RCTWebView`.

```objc
// RCTCustomWebView.h
#import <React/RCTWebView.h>

@interface RCTCustomWebView : RCTWebView

@end

// RCTCustomWebView.m
#import "RCTCustomWebView.h"

@interface RCTCustomWebView ()

@end

@implementation RCTCustomWebView { }

@end
```

Para o gerenciador de visualização, você precisa criar uma subclasse `RCTWebViewManager`. Você ainda deve incluir:

* `(UIView *)view` retorna sua visualização personalizada
* A tag  `RCT_EXPORT_MODULE()`

```objc
// RCTCustomWebViewManager.h
#import <React/RCTWebViewManager.h>

@interface RCTCustomWebViewManager : RCTWebViewManager

@end

// RCTCustomWebViewManager.m
#import "RCTCustomWebViewManager.h"
#import "RCTCustomWebView.h"

@interface RCTCustomWebViewManager () <RCTWebViewDelegate>

@end

@implementation RCTCustomWebViewManager { }

RCT_EXPORT_MODULE()

- (UIView *)view
{
  RCTCustomWebView *webView = [RCTCustomWebView new];
  webView.delegate = self;
  return webView;
}

@end
```

### Adicionando novos eventos e propriedades

Adicionar novas propriedades e eventos é o mesmo que os componentes de interface do usuário regulares. Para propriedades, você define um `@property` no cabeçalho. Para eventos, você define um `RCTDirectEventBlock` na `@interface` da visualização.

```objc
// RCTCustomWebView.h
@property (nonatomic, copy) NSString *finalUrl;

// RCTCustomWebView.m
@interface RCTCustomWebView ()

@property (nonatomic, copy) RCTDirectEventBlock onNavigationCompleted;

@end
```

Em seguida, exponha-o no `@implementation` do gerenciador de visualização.

```objc
// RCTCustomWebViewManager.m
RCT_EXPORT_VIEW_PROPERTY(onNavigationCompleted, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(finalUrl, NSString)
```

### Estendendo eventos existentes

Você deve consultar [RCTWebView.m](https://github.com/facebook/react-native/blob/master/React/Views/RCTWebView.m) na base de código React Native para ver quais manipuladores estão disponíveis e como eles são implementados. Você pode estender quaisquer métodos aqui para fornecer funcionalidade extra.

Por padrão, a maioria dos métodos não são expostos do RCTWebView. Se você precisar expô-los, precisará criar uma [Classe em Object C](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/CustomizingExistingClasses/CustomizingExistingClasses.html) e, em seguida, expor todos os métodos que você precisa usar.

```objc
// RCTWebView+Custom.h
#import <React/RCTWebView.h>

@interface RCTWebView (Custom)
- (BOOL)webView:(__unused UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (NSMutableDictionary<NSString *, id> *)baseEvent;
@end
```

Depois que eles forem expostos, você poderá referenciá-los em sua classe de visualização da Web personalizada.

```objc
// RCTCustomWebView.m

// Lembre-se de importar o arquivo de categoria.
#import "RCTWebView+Custom.h"

- (BOOL)webView:(__unused UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType
{
  BOOL allowed = [super webView:webView shouldStartLoadWithRequest:request navigationType:navigationType];

  if (allowed) {
    NSString* url = request.URL.absoluteString;
    if (url && [url isEqualToString:_finalUrl]) {
      if (_onNavigationCompleted) {
        NSMutableDictionary<NSString *, id> *event = [self baseEvent];
        _onNavigationCompleted(event);
      }
    }
  }

  return allowed;
}
```

### Configurando o certificado e a credencial de autenticação do cliente

Se você abrir páginas da Web que precisam de um Certificado de Cliente para Autenticação, poderá criar uma credencial e passá-la para a visualização da Web:

```
[RNCWebView setClientAuthenticationCredential:credential];
```

Isso pode ser combinado com uma chamada do Javascript para passar um rótulo de texto para o certificado armazenado no chaveiro e usar chamadas nativas para buscar o certificado e criar um objeto de credencial. Essa chamada pode ser feita em qualquer lugar que faça sentido para seu aplicativo (por exemplo, como parte da pilha de autenticação do usuário). O único requisito é fazer essa chamada antes de exibir qualquer webview.

### Permitir CAs personalizadas (autoridades de certificação) e habilitar a fixação de SSL

Se você precisa se conectar a um servidor que possui um certificado autoassinado, ou deseja realizar SSL Pinning nas solicitações de webview, você precisa passar um dicionário com o host como chave e o certificado como o valor de cada item:


```objc
-(void)installCerts {

  // Get the bundle where the certificates in DER format are present.
  NSBundle *bundle = [NSBundle mainBundle];
  
  NSMutableDictionary* certMap = [NSMutableDictionary new];

  NSData *rootCertData = [NSData dataWithContentsOfFile:[bundle pathForResource:@"example_ca" ofType:@"der"]];

  SecCertificateRef certificate = SecCertificateCreateWithData(NULL, (CFDataRef) rootCertData);
   
  OSStatus err = SecItemAdd((CFDictionaryRef) [NSDictionary dictionaryWithObjectsAndKeys:(id) kSecClassCertificate, kSecClass, certificate, kSecValueRef, nil], NULL);
  
  [certMap setObject:(__bridge id _Nonnull)(certificate) forKey:@"example.com"];

  [RNCWebView setCustomCertificatesForHost:certMap];
}

```

Vários hosts podem ser adicionados ao dicionário e apenas um certificado para um host é permitido. A verificação será bem-sucedida se algum dos certificados na cadeia da solicitação corresponder ao definido para o host da solicitação.

## Interface JavaScript

Para usar sua visualização da Web personalizada, você pode criar uma classe para ela. Sua classe deve retornar um componente `WebView` com o prop `nativeConfig.component` definido para seu componente nativo (veja abaixo).

Para obter seu componente nativo, você deve usar `requireNativeComponent`: o mesmo que para componentes personalizados regulares.

```javascript
import React, {Component} from 'react';
import {WebView, requireNativeComponent, NativeModules} from 'react-native';
const {CustomWebViewManager} = NativeModules;

export default class CustomWebView extends Component {
  render() {
    return (
      <WebView
        {...this.props}
        nativeConfig={{
          component: RCTCustomWebView,
          viewManager: CustomWebViewManager,
        }}
      />
    );
  }
}

const RCTCustomWebView = requireNativeComponent('RCTCustomWebView');
```

Se você quiser adicionar props customizadas ao seu componente nativo, você pode usar `nativeConfig.props` na visualização da web. Para iOS, você também deve definir o prop `nativeConfig.viewManager` com seu WebView ViewManager personalizado como no exemplo acima.

Para eventos, o manipulador de eventos deve sempre ser definido para uma função. Isso significa que não é seguro usar o manipulador de eventos diretamente de `this.props`, pois o usuário pode não ter fornecido um. A abordagem padrão é criar um manipulador de eventos em sua classe e, em seguida, invocar o manipulador de eventos fornecido em `this.props` se ele existir.

Se você não tiver certeza de como algo deve ser implementado do lado do JS, consulte [WebView.ios.tsx](https://github.com/react-native-webview/react-native-webview/blob/master/src/WebView.ios.tsx) na fonte React Native WebView.

```javascript
export default class CustomWebView extends Component {
  _onNavigationCompleted = (event) => {
    const {onNavigationCompleted} = this.props;
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
          viewManager: CustomWebViewManager,
        }}
      />
    );
  }
}
```
## Traduções

Esse arquivo está disponível em:

- [Inglês](Custom-iOS.md)
- [Italiano](Custom-iOS.italian.md)