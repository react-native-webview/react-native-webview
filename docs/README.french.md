# React Native WebView

![star this repo](https://img.shields.io/github/stars/react-native-webview/react-native-webview?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![NPM Version](https://img.shields.io/npm/v/react-native-webview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-webview)
![Npm Downloads](https://img.shields.io/npm/dm/react-native-webview.svg)

**React Native WebView** est un composent WebView maintenu par la communauté. Il existe en remplacement au composant WebView de React Native (qui a [été retiré du core](https://github.com/react-native-community/discussions-and-proposals/pull/3)).

### Contributeurs

**Merci beaucoup aux entreprises** pour nous permettre de travailler sur de l'open source.  
Également beaucoup de temps personnel est investi pour maintenir ce projet, n'hésitez pas à nous sponsoriser, **ça aide vraiment.**

- [Thibault Malbranche](https://github.com/Titozzz) ([Twitter @titozzz](https://twitter.com/titozzz)) de [Brigad](https://www.brigad.co/fr-fr/about-us)  
[*Me Sponsor* ❤️ !](https://github.com/sponsors/Titozzz)


Windows et macOS sont maintenues par Microsoft, notamment:
- [Alexander Sklar](https://github.com/asklar) ([Twitter @alexsklar](https://twitter.com/alexsklar)) de [React Native for Windows](https://microsoft.github.io/react-native-windows/)
- [Chiara Mooney](https://github.com/chiaramooney) de [React Native for Windows @ Microsoft](https://microsoft.github.io/react-native-windows/)

Grand merci à [Jamon Holmgren](https://github.com/jamonholmgren) de [Infinite Red](https://infinite.red) pour l'aide apportée lorsqu'il avait plus de temps disponible.

### Disclaimer

Maintenir la WebView est très compliqué, à cause de ses nombreux usages (rendering svgs, pdfs, login flows, et autres). On supporte également de nombreuses plateformes et les deux architectures de React Native.

Depuis que la WebView a été retirée du core, près de 500 PR ont été mergées.  
En considérant que nous possédons un temps limité, les issues github serviront principalement comme lieu d'échange pour la communauté, tandis que **nous prioriserons les reviews et les merges de pull requests** 

### Platform compatibles

Ce projet est compatible avec **iOS**,  **Android**, **Windows** et **macOS**.  
Ce projet supporte à la fois **l'ancienne** (paper) **et la nouvelle architecture** (fabric).  
Ce projet est compatible avec [expo](https://docs.expo.dev/versions/latest/sdk/webview/).

## Débuter 

Lisez attentivement notre guide (exclusivement en anglais) [Getting Started Guide](docs/Getting-Started.md). Si la moindre étape ne semble pas claire, merci de créer une **issue** détaillée.

## Versionnage

Ce projet suit la [gestion sémantique de version](https://semver.org/).  Nous n'hésitons pas à publier des modifications "breaking-change", mais elles seront intégrées dans une version majeure.

## Utilisation

Importez le composant `WebView` de `react-native-webview` et utilisez le de la manière suivante :

```tsx
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
const MyWebComponent = () => {
  return <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />;
}
```

Pour plus de détails, lisez la [Référence API](./docs/Reference.md) et le [Guide](./docs/Guide.md). Si vous êtes intéressé à contribuer, lisez le [Guide de contribution](./docs/Contributing.md).

## Problèmes communs

- Si l'erreur `Invariant Violation: Native component for "RNCWebView does not exist"` intervient, cela signifie probablement que vous avez oublié d'executer `react-native link` ou qu'une erreur est intervenue durant le processus de liaison.
- Si vous rencontrer une erreur de build durant l'execution de la tâche `:app:mergeDexRelease`, vous devez activer le support du multidex dans `android/app/build.gradle` comme discuté [ici](https://github.com/react-native-webview/react-native-webview/issues/1344#issuecomment-650544648)

## Contribuer

Voir [Contributing.md](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Contributing.md)

## Translations

This readme is available in:

- [English](../README.md)
- [Brazilian portuguese](README.portuguese.md)
