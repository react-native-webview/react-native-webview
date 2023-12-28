# Guida introduttiva a React Native WebView
Ecco come iniziare rapidamente con React Native WebView.

## 1. Aggiungi react-native-webview alle tue dipendenze

```
$ yarn add react-native-webview
```

(oppure)

Per uso con npm

```
$ npm install --save react-native-webview
```

## 2. Linking dei moduli native
A partire da react-native 0.60, il collegamento (linking) delle librerie viene gestito automaticamente (autolinking). Tuttavia, è necessario eseguire `pod install` per garantire che le dipendenze siano correttamente integrate nel progetto.

I moduli React Native che contengono codice nativo Objective-C, Swift, Java o Kotlin devono essere "linkati" affinché possano essere inclusi correttamente nell'applicazione durante la fase di compilazione.

```
$ react-native link react-native-webview
```

_NOTA: Quando disinstalli React Native WebView, esegui `react-native unlink react-native-webview` per rimuoverne il collegamento._

### iOS & macOS:
Se usi CocoaPods, nella directory `ios/` o `macos/` esegui:

```
$ pod install
```

Anche se è possibile eseguire il collegamento manuale seguendo il vecchio metodo tramite il tutorial di [react-native](https://reactnative.dev/docs/linking-libraries-ios), troviamo più semplice utilizzare CocoaPods. Se desideri usare CocoaPods e non lo hai ancora configurato, ti invitiamo a fare riferimento a [quest'articolo](https://engineering.brigad.co/demystifying-react-native-modules-linking-ae6c017a6b4a).

### Android:
Android - react-native-webview **versione <6**:
Questo modulo non richiede alcun passaggio aggiuntivo dopo aver eseguito il comando di collegamento 🎉

Android - react-native-webview **versione >=6.X.X**:
Assicurati che AndroidX sia abilitato nel tuo progetto modificando il file `android/gradle.properties` e aggiungendo queste due righe:

```
android.useAndroidX=true
android.enableJetifier=true
```

Per l'installazione manuale su Android, ti suggeriamo di consultare [questo articolo](https://engineering.brigad.co/demystifying-react-native-modules-linking-964399ec731b) dove troverai passaggi dettagliati su come collegare qualsiasi progetto react-native.

### Windows:
L'autolinking è supportato per React Native Windows **v0.63 e versioni successive**. Se la tua app utilizza una versione di React Native Windows che non supporta l'autolinking, effettua manualmente le seguenti aggiunte ai file indicati:

#### **windows/myapp.sln**

Aggiungi il progetto `ReactNativeWebView` alla tua soluzione.

1. Apri la soluzione in Visual Studio 2019.
2. Fai clic con il pulsante destro del mouse sull'icona della soluzione nell'Esplora soluzioni > Aggiungi > Progetto esistente.
   Seleziona `node_modules\react-native-webview\windows\ReactNativeWebView\ReactNativeWebView.vcxproj`.

#### **windows/myapp/myapp.vcxproj**

Aggiungi un riferimento a `ReactNativeWebView` al tuo progetto principale dell'applicazione. Da Visual Studio 2019:

1. Clicca col destro sul progetto principale dell'applicazione > Aggiungi > Riferimento...
   Seleziona `ReactNativeWebView` dai Progetti della soluzione.

2. Modifica i file seguenti per aggiungere i provider del pacchetto al tuo progetto principale dell'applicazione.

#### **pch.h**
Aggiungi `#include "winrt/ReactNativeWebView.h"`.

#### **app.cpp**
Aggiungi `PackageProviders().Append(winrt::ReactNativeWebView::ReactPackageProvider());` prima di `InitializeComponent();`.

Nota che se desideri abilitare lo scroll tramite touch per il componente WebView, devi disabilitare la prospettiva per la tua app tramite [ReactRootView.IsPerspectiveEnabled](https://microsoft.github.io/react-native-windows/docs/ReactRootView#isperspectiveenabled).

## 3. Supporto per WebView2
Il controllo WebView2 è un controllo [WinUI](https://learn.microsoft.com/it-it/windows/apps/winui/) che renderizza contenuti web utilizzando il motore di rendering di Microsoft Edge (Chromium). Abbiamo aggiunto il supporto per il controllo WebView2 al modulo della comunità react-native-webview nella versione 11.18.0.
Se la tua app utilizza RNW v0.68 o versioni successive, segui questi passaggi:

1. Lascia che l'autolinking si occupi di aggiungere il progetto `ReactNativeWebView` alla tua app.

2. Personalizza la versione di WinUI 2.x della tua app alla versione 2.8.0-prerelease.210927001 o successiva. Consulta [questo](https://microsoft.github.io/react-native-windows/docs/customizing-sdk-versions) per istruzioni. Il supporto WinUI 2.x per WebView2 non è ancora disponibile nelle versioni "stabile", quindi per ora dovrai utilizzare una versione prerelease.

3. Potrebbe essere necessario specificare il pacchetto `Microsoft.Web.WebView2` nel file `packages.config` della tua app. Facendo ciò, riceverai un errore di compilazione che elenca la versione del pacchetto che devi specificare. Aggiungi semplicemente il pacchetto al tuo `packages.config` e dovresti essere pronto per continuare.

Ora puoi accedere al controllo WebView2 di WinUI da JavaScript della tua app tramite la prop `useWebView2`.

## 4. Importa la webview nel tuo componente
```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://infinite.red' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
```

Esempio minimo usando HTML inline:

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyInlineWeb extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Ciao mondo</h1>' }}
      />
    );
  }
}
```

Per saperne di più, dai un'occhiata al [Riferimento API](Reference.italian.md) o alla [Guida Approfondita](Guide.italian.md).

### Traduzioni
Questo file è disponibile nelle seguenti lingue:
- [Inglese](Getting-Started.md)
- [Portoghese brasiliano](Getting-Started.portuguese.md)