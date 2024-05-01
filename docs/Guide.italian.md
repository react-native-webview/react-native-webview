# Guida a React Native WebView

Questo documento ti guida attraverso i casi d'uso più comuni per React Native WebView. Non copre [l'intera API](Reference.italian.md). Dopo aver letto il documento e analizzato gli esempi di codice forniti, acquisirai una solida comprensione del funzionamento del WebView e dei modelli di utilizzo più comuni.

_Attenzione: questa guida è attualmente in fase di sviluppo._

## Indice della guida
- [HTML inline di base](Guide.italian.md#html-inline-di-base)
- [URL di base con Source](Guide.italian.md#url-di-base-con-source)
- [Caricamento dei file HTML locali](Guide.italian.md#caricamento-dei-file-html-locali)
- [Controllo dei cambiamenti di state della navigazione](Guide.italian.md#controllo-dei-cambiamenti-di-state-della-navigazione)
- [Aggiunta del supporto per il caricamento dei file](Guide.italian.md#aggiunta-del-supporto-per-il-caricamento-dei-file)
- [Caricamento di più file](Guide.italian.md#caricamento-di-più-file)
- [Aggiunta del supporto per il download dei file](Guide.italian.md#aggiunta-del-supporto-per-il-download-dei-file)
- [Comunicazione tra JS e Native](Guide.italian.md#comunicazione-tra-js-e-native)
- [Lavorare con header personalizzate, sessioni e cookie](Guide.italian.md#lavorare-con-header-personalizzate-sessioni-e-cookie)
- [Supporto per la navigazione gestuale e a pulsanti](Guide.italian.md#supporto-per-la-navigazione-gestuale-e-a-pulsanti)

### HTML inline di base
Il modo più semplice per usare la WebView è passare l'HTML che si desidera renderizzare. Tieni conto che impostare una source `html` richiede che la prop [originWhiteList](Reference.italian.md#originWhiteList) sia settata su `['*']`.

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyInlineWeb extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Questo è source con HTML statico!</h1>' }}
      />
    );
  }
}
```

Passare una nuova source HTML statica causerà il rendering del WebView.


### URL di base con Source
Questo è l'uso più comune per una WebView.

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
  }
}
```

### Caricamento dei file HTML locali
N.B.: Attualmente, questo non funziona come discusso in [#428](https://github.com/react-native-webview/react-native-webview/issues/428) e [#518](https://github.com/react-native-webview/react-native-webview/issues/518). Possibili soluzioni alternative includono l'incorporazione di tutti gli asset con webpack o bundler simili, oppure con l'esecuzione di un [web server locale](https://github.com/futurepress/react-native-static-server).

<details><summary>Mostra metodo non funzionante</summary>

A volte potresti avere incluso un file HTML insieme all'app e desideri caricare l'HTML nella WebView. Per far ciò su iOS e Windows, è sufficiente importare il file HTML come qualsiasi altro asset, come mostrato di seguito.

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

const myHtmlFile = require('./my-asset-folder/local-site.html');

class MyWeb extends Component {
  render() {
    return <WebView source={myHtmlFile} />;
  }
}
```

Tuttavia, su Android, è necessario mettere il file HTML all'interno della cartella degli asset del progetto Android. Ad esempio, se `local-site.html` è il tuo file HTML e desideri caricarlo nella WebView, devi spostare il file nella cartella degli asset del progetto Android, che è `nome-del-progetto/android/app/src/main/assets/`. Successivamente, puoi caricare il file HTML come mostrato nel seguente blocco di codice.

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return (
      <WebView source={{ uri: 'file:///android_asset/local-site.html' }} />
    );
  }
}
```
</details>

### Controllo dei cambiamenti di state della navigazione
A volte si desidera intercettare quando l'utente preme un link nella WebView e fare qualcosa di diverso anziché navigare direttamente a quella pagina nella WebView. Ecco un esempio di codice su come potresti farlo usando la funzione `onNavigationStateChange`.

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  webview = null;

  render() {
    return (
      <WebView
        ref={(ref) => (this.webview = ref)}
        source={{ uri: 'https://reactnative.dev/' }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }

  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState  potrebbe avere una struttura simile a questa:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (!url) return;

    // Giostra determinati tipi di documenti.
    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      // Arpi una modal con il lettore di PDF.
    }

    // Gestisci l'invio di un form andato a buon fine, usando le stringhe di query.
    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // Poi potresti chiudere questa view.
    }

    // Un modo per gestire gli errori tramite le stringhe di query.
    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }

    // Reindirizzare verso un'altra destinazione.
    if (url.includes('google.com')) {
      const newURL = 'https://reactnative.dev/';
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
}
```

### Aggiunta del supporto per il caricamento dei file
##### iOS
Per iOS, l'unica cosa che devi fare è specificare i permessi nel file `ios/[progetto]/Info.plist`:

Scattare una foto:
```
<key>NSCameraUsageDescription</key>
<string>Fai foto per determinate attività</string>
```

Selezionare dalla galleria:
```
<key>NSPhotoLibraryUsageDescription</key>
<string>Seleziona immagini per determinate attività</string>
```

Registra video:
```
<key>NSMicrophoneUsageDescription</key>
<string>È necessario l'accesso al microfono per registrare i video</string>
```

##### Android
Aggiungi i permessi nel file AndroidManifest.xml:

```xml
<manifest ...>
  ......

  <!-- Questo è richiesto solo per Android 4.1-5.1 (API 16-22)  -->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```

###### L'opzione della fotocamera per l'upload è disponibile su Android.
Se l'input del file indica che si desiderano immagini o video tramite l'attributo [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept), la WebView cercherà di dare all'utente opzioni per usare la fotocamera per scattare una foto o registrare un video.

Normalmente, le app che non hanno il permesso di accesso alla fotocamera possono richiedere all'utente di utilizzare un'app esterna in modo che l'app richiedente non abbia bisogno del permesso. Su Android, c'è un'eccezione speciale per l'accesso alla fotocamera al fine di evitare confusione agli utenti. Se un'app ha dichiarato il permesso di utilizzare la fotocamera, ma l'utente non ha ancora concesso tale permesso, l'app potrebbe non avviare un'azione che richiede l'uso della fotocamera, come la cattura di immagini (`MediaStore.ACTION_IMAGE_CAPTURE`) o la registrazione di video (`MediaStore.ACTION_VIDEO_CAPTURE`). In questo caso, è responsabilità dello sviluppatore richiedere esplicitamente il permesso di accesso alla fotocamera prima di effettuare un caricamento diretto di file utilizzando la fotocamera.

#####  Verifica la compatibilità del caricamento dei file utilizzando il metodo `static isFileUploadSupported()`. 

Il caricamento dei file tramite l'elemento `<input type="file" />` non è supportato su Android 4.4 KitKat (vedi [dettagli](https://github.com/delight-im/Android-AdvancedWebView/issues/4#issuecomment-70372146)):

```jsx
import { WebView } from "react-native-webview";

WebView.isFileUploadSupported().then(res => {
  if (res === true) {
    // Il caricamento del file è supportato
  } else {
    // Il caricamento del file non è supportato
  }
});
```

##### MacOS
Aggiungi l'accesso in lettura per il `User Selected File` nella scheda `Signing & Capabilities` sotto `App Sandbox`:

<img width="856" alt="Screenshot della sezione Signing & Capabilities in XCode" src="https://user-images.githubusercontent.com/36531255/200541359-dde130d0-169e-4b58-8b2f-205442d76fdd.png">

Nota: Tentare di aprire un elemento di input file senza questo permesso farà crashare la webview.

### Caricamento di più file
Puoi controllare la selezione di singoli o molteplici file specificando l'attributo [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple) sul tuo elemento `input`:

```jsx
// Selezione di più file
<input type="file" multiple />

// Selezione di un singolo file
<input type="file" />
```

### Aggiunta del supporto per il download dei file
##### iOS
Su iOS, dovrai fornire il tuo codice per il download dei file. Puoi passare una callback `onFileDownload` al componente WebView come prop. Se RNCWebView determina che è necessario effettuare un download del file, l'URL da cui è possibile scaricare il file verrà passato a `onFileDownload`. Puoi quindi usare questa callback per scaricare il file nel modo desiderato.

NOTA: È necessario iOS 13 o versione successiva per aver la miglior esperienza di download. Con iOS 13, Apple ha aggiunto un'API per accedere agli header di risposta HTTP, che viene utilizzata per determinare se una risposta HTTP dev'essere scaricata. Su iOS 12 o versioni precedenti, solo i tipi MIME che non possono essere visualizzati nel WebView triggeranno chiamate a `onFileDownload`.

Esempio:
```javascript
onFileDownload = ({ nativeEvent }) => {
  const { downloadUrl } = nativeEvent;
  // --> Il codice per il download va qui <--
};
```

Per poter salvare le immagini nella galleria, è necessario specificare questo permesso nel file `ios/[progetto]/Info.plist`:
```
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Ci serve il permesso per salvare le immagini per determinate attività.</string>
```

##### Android
Sul sistema Android, l'integrazione con il DownloadManager è integrata di default.
Aggiungi questa autorizzazione nel file AndroidManifest.xml (necessaria solo se la tua app supporta versioni di Android precedenti alla 10):

```xml
<manifest ...>
  ......

  <!-- Questa autorizzazione è necessaria per salvare i file su versioni di Android inferiori alla 10. -->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```

### Comunicazione tra JS e Native
Spesso ti troverai nella situazione di voler fare del passaggio dati inviando messaggi alle pagine web caricate tramite le tue webview e ricevendo messaggi da esse.

Per realizzare ciò, React Native WebView offre tre diverse opzioni:
1. React Native -> Web: La prop `injectedJavaScript`
2. React Native -> Web: Il metodo `injectJavaScript`
3. Web -> React Native: Il metodo `postMessage` e la prop `onMessage`

#### La prop `injectedJavaScript`
Questo è uno script che viene eseguito immediatamente dopo il caricamento iniziale della pagina web. Viene eseguito una sola volta, anche se la pagina viene ricaricata o abbandonata.

```jsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  render() {
    // Crea il blocco di JS da passare nella WebView. Pensa al contenuto di questo template string
    // come se fosse un file JS caricato nella pagina web finale.
    const runFirst = `
      document.body.style.backgroundColor = 'red';
      setTimeout(function() { window.alert('hi') }, 2000);
      true; // Nota: Questo è necessario, altrimenti potrebbero verificarsi errori silenziosi.
    `;
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: 'https://github.com/react-native-webview/react-native-webview',
          }}
          onMessage={(event) => {}}
          injectedJavaScript={runFirst}
        />
      </View>
    );
  }
}
```

Questo esegue il codice JavaScript nella stringa `runFirst` una volta che la pagina è stata caricata. In questo caso, è possibile vedere che lo stile del body è stato modificato in rosso e l'avviso è comparso dopo 2 secondi. È anche necessario avere un evento `onMessage` per iniettare il codice JavaScript nel WebView, in questo caso abbiamo passato un oggetto vuoto.

Impostando `injectedJavaScriptForMainFrameOnly: false`, l'iniezione del JavaScript avverrà su tutti i frame (non solo il frame principale) se supportato dalla piattaforma specifica. Ad esempio, se una pagina contiene un iframe, il JavaScript verrà iniettato anche nell'iframe se questa opzione è impostata su `false`. (Nota: ciò non è supportato su Android.) È disponibile anche `injectedJavaScriptBeforeContentLoadedForMainFrameOnly` per l'iniezione prima del caricamento del contenuto. Per ulteriori informazioni, leggi nella [Referenza delle API](./Reference.italian.md#injectedjavascriptformainframeonly).


<img alt="Screenshot del repo su Github" width="200" src="https://user-images.githubusercontent.com/1479215/53609254-e5dc9c00-3b7a-11e9-9118-bc4e520ce6ca.png" />

_Roba da smanettoni_
> Su iOS, ~~`injectedJavaScript` esegue un metodo su WebView chiamato `evaluateJavaScript:completionHandler:`~~ - questa affermazione non è più valida a partire dalla versione `8.2.0`. Invece, utilizziamo un `WKUserScript` con un tempo di iniezione `WKUserScriptInjectionTimeAtDocumentEnd`. Di conseguenza, `injectedJavaScript` non restituisce più un valore di valutazione né genera un avviso nella console. Nel caso improbabile in cui la tua app dipenda da questo comportamento, consulta i passaggi di migrazione [qui](https://github.com/react-native-webview/react-native-webview/pull/1119#issuecomment-574919464) per mantenere un comportamento equivalente.
> Su Android, `injectedJavaScript` esegue un metodo sulla WebView di Android chiamato `evaluateJavascriptWithFallback`.
> Su Windows, `injectedJavaScript` esegue un metodo sulla WebView WinRT/C++ chiamato `InvokeScriptAsync`.

#### La prop `injectedJavaScriptBeforeContentLoaded`
Questo è uno script che viene eseguito **prima** del caricamento della pagina web per la prima volta. Viene eseguito solo una volta, anche se la pagina viene ricaricata o navigata altrove. Questo è utile se desideri iniettare qualcosa nella finestra, nel localStorage o nel documento prima dell'esecuzione del codice web.

```jsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  render() {
    const runFirst = `
      window.isNativeApp = true;
      true; // Nota: Questo è necessario, altrimenti potrebbero verificarsi errori silenziosi.
    `;
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: 'https://github.com/react-native-webview/react-native-webview',
          }}
          injectedJavaScriptBeforeContentLoaded={runFirst}
        />
      </View>
    );
  }
}
```

Questo esegue il JavaScript nella stringa `runFirst` prima del caricamento della pagina. In questo caso, il valore di `window.isNativeApp` verrà impostato su `true` prima dell'esecuzione del codice web.

> **Attenzione**
> Su Android, questo funziona, ma non è del tutto affidabile al 100% (vedi [#1609](https://github.com/react-native-webview/react-native-webview/issues/1609) e [#1099](https://github.com/react-native-webview/react-native-webview/pull/1099)).

Impostando `injectedJavaScriptBeforeContentLoadedForMainFrameOnly: false`, l'iniezione di JavaScript avverrà su tutti i frame (non solo il frame principale) se supportato dalla piattaforma specifica. Tuttavia, sebbene il supporto per `injectedJavaScriptBeforeContentLoadedForMainFrameOnly: false` sia stato implementato per iOS e macOS, non è chiaro che sia effettivamente possibile iniettare JS negli iframe in questo punto del ciclo di vita della pagina, quindi non è consigliato far affidamento sul comportamento atteso di questa prop quando è impostata su `false`.

> Su iOS, ~~`injectedJavaScriptBeforeContentLoaded` esegue un metodo su WebView chiamato `evaluateJavaScript:completionHandler:`~~ - questo non è più vero a partire dalla versione `8.2.0`. Invece, utilizziamo un `WKUserScript` con il tempo di iniezione `WKUserScriptInjectionTimeAtDocumentStart`. Di conseguenza, `injectedJavaScriptBeforeContentLoaded` non restituisce più un valore di valutazione né registra un avviso nella console. Nel caso improbabile che la tua app dipenda da questo comportamento, consulta i passaggi di migrazione [qui](https://github.com/react-native-webview/react-native-webview/pull/1119#issuecomment-574919464) per mantenere un comportamento equivalente.
> Su Android, `injectedJavaScript` esegue un metodo sul WebView di Android chiamato `evaluateJavascriptWithFallback`.
> Nota sulla compatibilità di Android: per le applicazioni che mirano a `Build.VERSION_CODES.N` o versioni successive, lo state JavaScript da una WebView vuota non viene più mantenuto tra le navigazioni come `loadUrl(java.lang.String)`. Ad esempio, le variabili globali e le funzioni definite prima di chiamare `loadUrl(java.lang.String)` non esisteranno nella pagina caricata. Le applicazioni devono utilizzare l'API nativa di Android `addJavascriptInterface(Object, String)` per mantenere gli oggetti JavaScript tra le navigazioni.

#### Il metodo `injectJavaScript`
Sebbene comodo, il lato negativo della prop `injectedJavaScript` precedentemente menzionata è che viene eseguita solo una volta. Ecco perché mettiamo a disposizione anche un metodo sull'oggetto di riferimento della WebView chiamato `injectJavaScript` (nota il nome leggermente diverso!).

```jsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  render() {
    const run = `
      document.body.style.backgroundColor = 'blue';
      true;
    `;

    setTimeout(() => {
      this.webref.injectJavaScript(run);
    }, 3000);

    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={(r) => (this.webref = r)}
          source={{
            uri: 'https://github.com/react-native-webview/react-native-webview',
          }}
        />
      </View>
    );
  }
}
```

Dopo 3 secondi, questo codice cambia il colore di sfondo in blu:

<img alt="Screenshot dell'app che mostra il codice JavaScript iniettato" width="200" src="https://user-images.githubusercontent.com/1479215/53670433-93a98280-3c2f-11e9-85a5-0e4650993817.png" />

_Roba da smanettoni_
> Su iOS, `injectJavaScript` chiama il metodo `evaluateJS:andThen:` della WebView
> Su Android, `injectJavaScript` chiama il metodo `evaluateJavascriptWithFallback` della WebView di Android

#### Il metodo `window.ReactNativeWebView.postMessage` e la prop `onMessage`
Poter inviare JavaScript alla pagina web è fantastico, ma cosa succede quando la pagina web vuole comunicare con il tuo codice React Native? È qui che entrano in gioco `window.ReactNativeWebView.postMessage` e la prop `onMessage`.

È **necessario** impostare `onMessage`, altrimenti il metodo `window.ReactNativeWebView.postMessage` non verrà iniettato nella pagina web.

`window.ReactNativeWebView.postMessage` accetta solo un argomento che deve essere una stringa.

```jsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  render() {
    const html = `
      <html>
      <head></head>
      <body>
        <script>
          setTimeout(function () {
            window.ReactNativeWebView.postMessage("Hello!")
          }, 2000)
        </script>
      </body>
      </html>
    `;

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ html }}
          onMessage={(event) => {
            alert(event.nativeEvent.data);
          }}
        />
      </View>
    );
  }
}
```

Questo codice genererà un avviso come dimostrato:
<img alt="Avviso che mostra la comunicazione dalla pagina web a React Native" width="200" src="https://user-images.githubusercontent.com/1479215/53671269-7e822300-3c32-11e9-9937-7ddc34ba8af3.png" />


### Lavorare con header personalizzate, sessioni e cookie
#### Impostazione degli header personalizzati
In React Native WebView, è possibile impostare un header personalizzato nel seguente modo:

```jsx
<WebView
  source={{
    uri: 'http://example.com',
    headers: {
      'my-custom-header-key': 'my-custom-header-value',
    },
  }}
/>
```

Ciò imposterà l'header durante il primo caricamento, ma non durante le successive navigazioni di pagina.

Per risolvere questo problema, è possibile tenere traccia dell'URL corrente, intercettare i nuovi caricamenti delle pagine e navigare verso di essi manualmente ([il merito di questa tecnica va dato a Chirag Shah di Big Binary](https://www.bigbinary.com/blog/passing-request-headers-on-each-webview-request-in-react-native)):

```jsx
const CustomHeaderWebView = (props) => {
  const { uri, onLoadStart, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };

  return (
    <WebView
      {...restProps}
      source={newSource}
      onShouldStartLoadWithRequest={(request) => {
        // Se stiamo caricando l'URI corrente, consentiamo il caricamento
        if (request.url === currentURI) return true;
        // Stiamo caricando un nuovo URL: cambiamo prima lo stato.
        setURI(request.url);
        return false;
      }}
    />
  );
};

<CustomHeaderWebView
  source={{
    uri: 'http://example.com',
    headers: {
      'nome-del-mio-header': 'valore-del-mio-header',
    },
  }}
/>;
```

#### Gestione dei cookie
Puoi impostare i cookie dal lato React Native utilizzando il pacchetto [@react-native-cookies/cookies](https://github.com/react-native-cookies/cookies).

Quando lo fai, dovrai abilitare anche la prop [sharedCookiesEnabled](Reference.italian.md#sharedCookiesEnabled).

```jsx
const App = () => {
  return (
    <WebView
      source={{ uri: 'http://example.com' }}
      sharedCookiesEnabled={true}
    />
  );
};
```

Se desideri inviare cookie personalizzati direttamente nella WebView, puoi farlo utilizzando un'intestazione personalizzata, come segue:

```jsx
const App = () => {
  return (
    <WebView
      source={{
        uri: 'http://example.com',
        headers: {
          Cookie: 'cookie1=contenuto-del-cookie1; cookie2=contenuto-del-cookie2',
        },
      }}
      sharedCookiesEnabled={true}
    />
  );
};
```

Tieni presente che questi cookie verranno inviati solo nella prima richiesta a meno che tu non utilizzi la tecnica descritta sopra per impostare gli [header personalizzati](#impostazione-degli-header-personalizzati) ad ogni caricamento della pagina.

### Supporto per la navigazione gestuale e a pulsanti
Possiamo fornire supporto per la navigazione convenzionale delle pagine mobili: gesti di scorrimento avanti/indietro su iOS e il pulsante indietro/gesto hardware su Android.

Per iOS, è sufficiente utilizzare la proprietà [`allowsBackForwardNavigationGestures`](Reference.italian.md#allowsbackforwardnavigationgestures).

Per Android, è necessario utilizzare [`BackHandler.addEventListener`](https://reactnative.dev/docs/backhandler) e collegarlo per chiamare `goBack` sul `WebView`.

Con i componenti funzionali di React, è possibile utilizzare `useRef` e `useEffect` (dovrai importarli da React se non lo hai già fatto) per consentire agli utenti di navigare alla pagina precedente quando il pulsante "indietro" viene premuto, come segue:

```jsx
import React, { useEffect, useRef, } from 'react';
import { BackHandler, Platform, } from 'react-native';
```

```jsx
const webViewRef = useRef(null);
const onAndroidBackPress = () => {
  if (webViewRef.current) {
    webViewRef.current.goBack();
    return true; // previeni il comportamento predefinito (uscita dall'app)
  }
  return false;
};

useEffect(() => {
  if (Platform.OS === 'android') {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }
}, []);
```

E aggiungi questa proprietà `ref` al tuo componente `WebView`:

```jsx
<WebView ref={webViewRef} />
```

Vi sono alcune incongruenze nel modo in cui il tasto hardware del silenzioso viene gestito tra gli elementi audio e video incorporati e tra le piattaforme iOS e Android.

Su iOS, l'audio verrà disattivato quando il silenzioso è nella posizione attiva, a meno che il parametro `ignoreSilentHardwareSwitch` non sia impostato su true.

Sempre su iOS, invece, il video ignorerà sempre il tasto del silenzioso.


### Traduzioni
Questo file è disponibile nelle seguenti lingue:
- [Inglese](Guide.md)
- [Portoghese brasiliano](Guide.portuguese.md)
