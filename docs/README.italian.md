# React Native WebView

![Dai una stella a questo repo](https://img.shields.io/github/stars/react-native-webview/react-native-webview?style=flat-square&label=stelle)
[![PRs gradite](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Versione NPM](https://img.shields.io/npm/v/react-native-webview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-webview)
![NPM Downloads mensili](https://img.shields.io/npm/dm/react-native-webview.svg)

**React Native WebView** è un componente WebView mantenuto dalla community per React Native. È un sostituto del WebView integrato, il  quale è stato rimosso dal core.

### Manutentori
**Un ringraziamento speciale a queste aziende** per averci concesso del tempo per lavorare su software open source. Si prega di notare che anche i mantainer dedicano molto del loro tempo libero a lavorare su questo progetto, quindi sentiti libero di sponsorizzarli: **fa davvero la differenza**.

- [Thibault Malbranche](https://github.com/Titozzz) ([Twitter @titozzz](https://twitter.com/titozzz)) di [Brigad](https://www.brigad.co/en-gb/about-us)  
[*Sponsorizzami* ❤️ !](https://github.com/sponsors/Titozzz)

Windows e macOS sono gestiti da Microsoft, in particolare:
- [Alexander Sklar](https://github.com/asklar) ([Twitter @alexsklar](https://twitter.com/alexsklar)) di [React Native per Windows](https://microsoft.github.io/react-native-windows/)
- [Chiara Mooney](https://github.com/chiaramooney) di [React Native per Windows presso Microsoft](https://microsoft.github.io/react-native-windows/)

Un ringraziamento speciale va dato a [Jamon Holmgren](https://github.com/jamonholmgren) della [Infinite Red](https://infinite.red) per il prezioso aiuto fornito al repository quando aveva più tempo a disposizione.

### Esonero da responsabilità
Mantenere la WebView è molto complesso, poiché viene frequentemente impiegata in numerosi scenari d'uso diversi, come ad esempio la renderizzazione di SVG, PDF, flussi di accesso e altri ancora. Supportiamo inoltre numerose piattaforme e entrambe le architetture di React Native.

Dal momento che WebView è stato estratto dal core di React Native, sono state integrate quasi 500 pull request. Considerando che abbiamo un tempo limitato, gli issue serviranno principalmente come luogo di discussione per la comunità, mentre **daremo priorità alla revisione e all'integrazione delle pull request**.

### Compatibilità con le piattaforme
Questo progetto è compatibile con le seguenti piattaforme: **iOS**, **Android**, **Windows** e **macOS**. Supporta sia **la vecchia architettura** (paper) **che la nuova architettura** (fabric). Inoltre, è compatibile con [Expo](https://docs.expo.dev/versions/latest/sdk/webview/).

### Version
Questo progetto segue la convenzione del [versionamento semantico](https://semver.org/lang/it/). Non esitiamo a rilasciare modifiche che potrebbero causare incompatibilità (breaking changes), ma lo faremo all'interno di una versione principale.

### Utilizzo
Importa il componente `WebView` da `react-native-webview` per poi usarlo nel seguente modo:

```tsx
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
const MyWebComponent = () => {
  return <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />;
}
```

Per ulteriori informazioni, leggi il [riferimento alle API](Reference.italian.md) e la [guida](Guide.italian.md). Se sei interessato a dare il tuo contributo, consulta la [guida per i collaboratori](Contributing.italian.md).

### Problemi comuni
- Se riscontri `Invariant Violation: Native component for "RNCWebView does not exist"`, probabilmente significa che hai dimenticato di eseguire `react-native link` o c'è stato qualche errore durante il processo di collegamento.
- In caso di un errore di compilazione durante l'operazione `:app:mergeDexRelease`, devi abilitare il supporto multidex in `android/app/build.gradle`, come discusso in [questa issue](https://github.com/react-native-webview/react-native-webview/issues/1344#issuecomment-650544648).

### Contribuire
Le contribuzioni sono benvenute, per maggiori informazioni consulta la pagina [Contributing.md](Contributing.italian.md).

### Licenza
MIT

### Traduzioni
Questo readme è disponibile nelle seguenti lingue:
- [Francese](README.french.md) 
- [Inglese](../README.md)
- [Portoghese brasiliano](README.portuguese.md)