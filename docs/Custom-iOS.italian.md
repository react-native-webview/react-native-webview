**NOTA: Questo documento è stato importato dalla [documentazione originale di WebView](https://github.com/facebook/react-native-website/blob/7d3e9e120e38a7ba928f6b173eb98f88b6f2f85f/docs/custom-webview-ios.md). Sebbene possa risultare utile, non è stato ancora adattato a React Native WebView.**

Nonostante la web view integrata disponga di molte funzionalità, non è possibile gestire tutti i casi d'uso in React Native. Tuttavia, è possibile estendere la web view con codice nativo senza dover forkare React Native o duplicare l'intero codice esistente della web view.

Prima di procedere, è consigliabile avere un'idea di base  dei concetti legati ai [native UI components](native-components-ios) (componenti dell'interfaccia utente nativi). Inoltre, è opportuno familiarizzarsi con il [native code for web views](https://github.com/react-native-webview/react-native-webview/blob/master/apple/RNCWebViewManager.m) (codice nativo per le web view), poiché sarà necessario farvi riferimento durante l'implementazione delle nuove funzionalità, anche se non è richiesta una conoscenza approfondita.

## Codice nativo
Come per i componenti nativi regolari, è necessario un gestore della view e una web view.

Per la view, è necessario creare una sottoclasse di `RCTWebView`.

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

Per il gestore della view, è necessario creare una sottoclasse di RCTWebViewManager. Devi includere:
* `(UIView *)view` che restituisce la tua view personalizzata;
* la funzione macro `RCT_EXPORT_MODULE()`.

```objc
// RCTCustomWebViewManager.h
#import <React/RCTWebViewManager.h>

@interface RCTCustomWebViewManager : RCTWebViewManager

@end
```

```objc
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

### Aggiungere nuovi eventi e proprietà
L'aggiunta di nuove proprietà ed eventi è simile ai componenti UI tradizionali. Per le proprietà, definisci una `@property` nell'header. Per gli eventi, definisci un `RCTDirectEventBlock` nell'`@interface` della view.

```objc
// RCTCustomWebView.h
@property (nonatomic, copy) NSString *finalUrl;
```

```objc
// RCTCustomWebView.m
@interface RCTCustomWebView ()

@property (nonatomic, copy) RCTDirectEventBlock onNavigationCompleted;

@end
```

Successivamente, esponilo nell'`@implementation` del gestore della view.

```objc
// RCTCustomWebViewManager.m
RCT_EXPORT_VIEW_PROPERTY(onNavigationCompleted, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(finalUrl, NSString)
```


### Estensione degli eventi esistenti
Riferisciti a [RCTWebView.m](https://github.com/facebook/react-native/blob/master/React/Views/RCTWebView.m) nel codice sorgente di React Native per vedere quali handler sono disponibili e come sono implementati. Puoi estendere qualsiasi metodo qui per fornire funzionalità aggiuntive.

In generale, la maggior parte dei metodi all'interno di RCTWebView non sono resi accessibili. Tuttavia, nel caso in cui tu abbia la necessità di utilizzarli, è possibile creare una [categoria in Objective-C](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/CustomizingExistingClasses/CustomizingExistingClasses.html) e successivamente esporre tutti i metodi specifici che desideri usare.

```objc
// RCTWebView+Custom.h
#import <React/RCTWebView.h>

@interface RCTWebView (Custom)
- (BOOL)webView:(__unused UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (NSMutableDictionary<NSString *, id> *)baseEvent;
@end
```

Una volta esposti i metodi, puoi farvi riferimento nella tua classe di web view personalizzata.

```objc
// RCTCustomWebView.m

// Ricorda di importare il file di categoria.
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

### Impostazione delle credenziali di autenticazione del certificato client
Se si aprono pagine web che richiedono un certificato client per l'autenticazione, è possibile creare una credenziale e passarla alla webview:

```
[RNCWebView setClientAuthenticationCredential:credential];
```

Ciò può essere abbinato a una chiamata da JavaScript per passare una stringa etichetta per il certificato memorizzato nel portachiavi iCloud (Keychain) e utilizzare chiamate native per recuperare il certificato e creare un oggetto di credenziale. Questa chiamata può essere effettuata ovunque abbia senso per la tua applicazione (e.g. come parte dello stack di autenticazione dell'utente). L'unico requisito è effettuare questa chiamata prima di visualizzare qualsiasi webview.

### Consenti CA personalizzate (Certificati di Autorità) e abilita l'SSL Pinning
Se è necessario connettersi a un server che ha un certificato firmato o se si desidera eseguire l'SSL Pinning sulle richieste della webview, è necessario passare un dizionario con l'host come chiave e il certificato come valore di ciascun elemento:

```objc
-(void)installCerts {

  // Usa il bundle in cui sono presenti i certificati nel formato DER.
  NSBundle *bundle = [NSBundle mainBundle];
  
  NSMutableDictionary* certMap = [NSMutableDictionary new];

  NSData *rootCertData = [NSData dataWithContentsOfFile:[bundle pathForResource:@"example_ca" ofType:@"der"]];

  SecCertificateRef certificate = SecCertificateCreateWithData(NULL, (CFDataRef) rootCertData);
   
  OSStatus err = SecItemAdd((CFDictionaryRef) [NSDictionary dictionaryWithObjectsAndKeys:(id) kSecClassCertificate, kSecClass, certificate, kSecValueRef, nil], NULL);
  
  [certMap setObject:(__bridge id _Nonnull)(certificate) forKey:@"example.com"];

  [RNCWebView setCustomCertificatesForHost:certMap];
}

```

È possibile aggiungere più host al dizionario, ma è consentito un solo certificato per ogni host. La verifica avrà successo se uno qualsiasi dei certificati nella catena della richiesta corrisponde a quello definito per l'host della richiesta.

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

Se non sei sicuro su come qualcosa debba essere implementato nel lato JS, dai un'occhiata al file [WebView.android.tsx](https://github.com/react-native-webview/react-native-webview/blob/master/src/WebView.ios.tsx) nel codice sorgente di React Native WebView.

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
- [Inglese](Custom-iOS.md)
- [Portoghese brasiliano](Custom-iOS.portuguese.md)