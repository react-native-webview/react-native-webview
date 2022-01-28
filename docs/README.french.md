
# React Native WebView - Une WebView moderne et multiplateforme pour React Native

[![star this repo](http://githubbadges.com/star.svg?user=react-native-webview&repo=react-native-webview&style=flat)](https://github.com/react-native-webview/react-native-webview)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![All Contributors](https://img.shields.io/badge/all_contributors-16-orange.svg?style=flat-square)](#contributors)
[![Known Vulnerabilities](https://snyk.io/test/github/react-native-webview/react-native-webview/badge.svg?style=flat-square)](https://snyk.io/test/github/react-native-webview/react-native-webview)
[![NPM Version](https://img.shields.io/npm/v/react-native-webview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-webview)
[![Lean Core Extracted](https://img.shields.io/badge/Lean%20Core-Extracted-brightgreen.svg?style=flat-square)][lean-core-issue]

**React Native WebView** est une WebView moderne, soutenue et multiplateforme pour React Native. Elle est destinée à remplacer la WebView built-in (qui va être [retiré du noyau](https://github.com/react-native-community/discussions-and-proposals/pull/3)).

## Mainteneurs principaux - Compagnies sponsors

_Ce projet est maintenu gratuitement par ces personnes durant leur temps libre et leur temps de travail._ 

- [Thibault Malbranche](https://github.com/Titozzz) ([Twitter @titozzz](https://twitter.com/titozzz)) de [Brigad](https://brigad.co/about)
- [Jamon Holmgren](https://github.com/jamonholmgren) ([Twitter @jamonholmgren](https://twitter.com/jamonholmgren)) de [Infinite Red](https://infinite.red/react-native)
- [Alexander Sklar](https://github.com/asklar) ([Twitter @alexsklar](https://twitter.com/alexsklar)) de [React Native Windows @ Microsoft](https://microsoft.github.io/react-native-windows/)
- [Chiara Mooney](https://github.com/chiaramooney) de [React Native Windows @ Microsoft](https://microsoft.github.io/react-native-windows/)

## Plateformes supportées

- [x] iOS
- [x] Android
- [x] macOS
- [x] Windows


_Note: Le support de React Native WebView par Expo a débuté avec [Expo SDK v33.0.0](https://blog.expo.io/expo-sdk-v33-0-0-is-now-available-52d1c99dfe4c)._

## Débuter 

Lisez attentivement notre guide (exclusivement en anglais) [Getting Started Guide](docs/Getting-Started.md). Si la moindre étape ne semble pas claire, merci de créer une **issue** détaillée.

## Versionnage

Ce projet suit la [gestion sémantique de version](https://semver.org/).  Nous n'hésitons pas à publier des modifications "breaking-change", mais elles seront intégrées dans une version majeure.



**Historique des versions majeures:**

Current Version: ![version](https://img.shields.io/npm/v/react-native-webview.svg)

- [11.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v11.0.0) - Android setSupportMultipleWindows.
- [10.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v10.0.0) - Le plugin Android Gradle n'est obligatoire qu'en ouvrant le projet en mode **stand-alone**
- [9.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v9.0.0) - Les mises à jour des props via  injectedJavaScript ne sont plus immuables
- [8.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v8.0.0) - Désormais onNavigationStateChange se déclenche au changement du hash de l'url
- [7.0.1](https://github.com/react-native-webview/react-native-webview/releases/tag/v7.0.1) - Suppression de UIWebView
- [6.0.**2**](https://github.com/react-native-webview/react-native-webview/releases/tag/v6.0.2) - Mise à jour d'AndroidX. Soyez attentif à l'activer dans vos projet via `android/gradle.properties`. Voir [Getting Started Guide](docs/Getting-Started.md).
- [5.0.**1**](https://github.com/react-native-webview/react-native-webview/releases/tag/v5.0.0) - Remaniement de l'ancienne implémentation de postMessage pour communiquer de la webview à react native.
- [4.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v4.0.0) - Ajout d'un cache (activé par défaut).
- [3.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v3.0.0) - WKWebview : Ajout d'un pool de processus partagé pour que les cookies et localStorage soient partagés entre les webviews dans iOS (activé par défaut).
- [2.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v2.0.0) - Première version, il s'agit d'une réplique du composant webview de base.

**A venir:**

- Suppression de this.webView.postMessage() (jamais documenté et moins dynamique que injectJavascript) -> [comment migrer](https://github.com/react-native-webview/react-native-webview/issues/809)
- Réécriture du code Kotlin
- Peut-être réécrutire du code Swift

## Utilisation

Importez le composant `WebView` de `react-native-webview` et utilisez le de la manière suivante :

```jsx
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
class MyWebComponent extends Component {
  render() {
    return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
  }
}
```
Pour plus de détails, lisez la [Référence API](./docs/Reference.md) et le [Guide](./docs/Guide.md). Si vous êtes intéressé à contribuer, lisez le [Guide de contribution](./docs/Contributing.md).

## Problèmes communs

- Si l'erreur `Invariant Violation: Native component for "RNCWebView does not exist"` intervient, cela signifie probablement que vous avez oublié d'executer `react-native link` ou qu'une erreur est intervenue durant le processus de liaison.
- Si vous rencontrer une erreur de build durant l'execution de la tâche `:app:mergeDexRelease`, vous devez activer le support du multidex dans `android/app/build.gradle` comme discuté [ici](https://github.com/react-native-webview/react-native-webview/issues/1344#issuecomment-650544648)

## Contribuer

Voir [Contributing.md](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Contributing.md)

## Contributeurs

Un grand remerciement aux contributeurs ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key-)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/titozzz"><img src="https://avatars1.githubusercontent.com/u/6181446?v=4" width="100px;" alt="Thibault Malbranche"/><br /><sub><b>Thibault Malbranche</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=titozzz" title="Code">💻</a> <a href="#ideas-titozzz" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-titozzz" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=titozzz" title="Documentation">📖</a> <a href="#maintenance-titozzz" title="Maintenance">🚧</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=titozzz" title="Tests">⚠️</a> <a href="#infra-titozzz" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#question-titozzz" title="Answering Questions">💬</a></td><td align="center"><a href="https://jamonholmgren.com"><img src="https://avatars3.githubusercontent.com/u/1479215?v=4" width="100px;" alt="Jamon Holmgren"/><br /><sub><b>Jamon Holmgren</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=jamonholmgren" title="Code">💻</a> <a href="#ideas-jamonholmgren" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-jamonholmgren" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=jamonholmgren" title="Documentation">📖</a> <a href="#maintenance-jamonholmgren" title="Maintenance">🚧</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=jamonholmgren" title="Tests">⚠️</a> <a href="#example-jamonholmgren" title="Examples">💡</a> <a href="#question-jamonholmgren" title="Answering Questions">💬</a></td><td align="center"><a href="https://github.com/andreipfeiffer"><img src="https://avatars1.githubusercontent.com/u/2570562?v=4" width="100px;" alt="Andrei Pfeiffer"/><br /><sub><b>Andrei Pfeiffer</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=andreipfeiffer" title="Code">💻</a> <a href="#review-andreipfeiffer" title="Reviewed Pull Requests">👀</a> <a href="#ideas-andreipfeiffer" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://twitter.com/mikediarmid"><img src="https://avatars0.githubusercontent.com/u/5347038?v=4" width="100px;" alt="Michael Diarmid"/><br /><sub><b>Michael Diarmid</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=Salakar" title="Code">💻</a> <a href="#review-Salakar" title="Reviewed Pull Requests">👀</a> <a href="#ideas-Salakar" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-Salakar" title="Tools">🔧</a></td><td align="center"><a href="http://smathson.github.io"><img src="https://avatars3.githubusercontent.com/u/932981?v=4" width="100px;" alt="Scott Mathson"/><br /><sub><b>Scott Mathson</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=smathson" title="Code">💻</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=smathson" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/YangXiaomei"><img src="https://avatars0.githubusercontent.com/u/8221990?v=4" width="100px;" alt="Margaret"/><br /><sub><b>Margaret</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=YangXiaomei" title="Code">💻</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=YangXiaomei" title="Documentation">📖</a></td><td align="center"><a href="https://stylisted.com"><img src="https://avatars2.githubusercontent.com/u/1173161?v=4" width="100px;" alt="Jordan Sexton"/><br /><sub><b>Jordan Sexton</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=jordansexton" title="Code">💻</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=jordansexton" title="Documentation">📖</a></td></tr><tr><td align="center"><a href="https://github.com/MalcolmScruggs"><img src="https://avatars1.githubusercontent.com/u/22333355?v=4" width="100px;" alt="Malcolm Scruggs"/><br /><sub><b>Malcolm Scruggs</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=MalcolmScruggs" title="Code">💻</a> <a href="#tool-MalcolmScruggs" title="Tools">🔧</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=MalcolmScruggs" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/Momazo7u7"><img src="https://avatars0.githubusercontent.com/u/42069617?v=4" width="100px;" alt="Momazo7u7"/><br /><sub><b>Momazo7u7</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=Momazo7u7" title="Documentation">📖</a></td><td align="center"><a href="https://marco-nett.de"><img src="https://avatars1.githubusercontent.com/u/3315507?v=4" width="100px;" alt="Marco"/><br /><sub><b>Marco</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=marconett" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/jeluard"><img src="https://avatars1.githubusercontent.com/u/359723?v=4" width="100px;" alt="Julien Eluard"/><br /><sub><b>Julien Eluard</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=jeluard" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/CubeSugar"><img src="https://avatars3.githubusercontent.com/u/3667305?v=4" width="100px;" alt="Jian Wei"/><br /><sub><b>Jian Wei</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=CubeSugar" title="Code">💻</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=CubeSugar" title="Documentation">📖</a></td><td align="center"><a href="https://www.linkedin.com/in/svbutko/"><img src="https://avatars2.githubusercontent.com/u/14828004?v=4" width="100px;" alt="Sergei Butko"/><br /><sub><b>Sergei Butko</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=svbutko" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/TMomemt"><img src="https://avatars3.githubusercontent.com/u/42024947?v=4" width="100px;" alt="TMomemt"/><br /><sub><b>TMomemt</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=TMomemt" title="Code">💻</a></td></tr><tr><td align="center"><a href="http://www.try.com"><img src="https://avatars0.githubusercontent.com/u/674503?v=4" width="100px;" alt="Eric Lewis"/><br /><sub><b>Eric Lewis</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=ericlewis" title="Code">💻</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=ericlewis" title="Documentation">📖</a></td><td align="center"><a href="https://bzfx.net"><img src="https://avatars2.githubusercontent.com/u/1542454?v=4" width="100px;" alt="Daniel Vicory"/><br /><sub><b>Daniel Vicory</b></sub></a><br /><a href="https://github.com/react-native-community/react-native-webview/commits?author=dvicory" title="Code">💻</a> <a href="https://github.com/react-native-community/react-native-webview/commits?author=dvicory" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->


Ce projet suit les spécifications [all-contributors](https://github.com/all-contributors/all-contributors). Les contributions de toute nature sont les bienvenues !

## License

MIT

## Translations

This readme is available in:

- [English](../README.md)
- [Brazilian portuguese](README.portuguese.md)

[lean-core-issue]: https://github.com/facebook/react-native/issues/23313
