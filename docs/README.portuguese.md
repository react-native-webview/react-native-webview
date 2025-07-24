# React Native WebView - Um moderno, WebView multiplataforma para React Native

[![star this repo](http://githubbadges.com/star.svg?user=react-native-webview&repo=react-native-webview&style=flat)](https://github.com/react-native-webview/react-native-webview)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Known Vulnerabilities](https://snyk.io/test/github/react-native-webview/react-native-webview/badge.svg?style=flat-square)](https://snyk.io/test/github/react-native-webview/react-native-webview)
<a href="https://www.npmjs.com/package/react-native-webview"><img src="https://img.shields.io/npm/v/react-native-webview.svg"></a>

**React Native WebView** é um moderno WebView multiplataforma para React Native. Ele foi projetado para substituir o WebView embutido(que será [removido do core](https://github.com/react-native-community/discussions-and-proposals/pull/3)).

## Principais Mantenedores - Empresas Patrocinadoras

_Esse projeto é mantido gratuitamente por essas pessoas usando ambos, seu tempo livre e tempo de trabalho na empresa._

- [Thibault Malbranche](https://github.com/Titozzz) ([Twitter @titozzz](https://twitter.com/titozzz)) from [Brigad](https://brigad.co/about)
- [Jamon Holmgren](https://github.com/jamonholmgren) ([Twitter @jamonholmgren](https://twitter.com/jamonholmgren)) from [Infinite Red](https://infinite.red/react-native)
- [Alexander Sklar](https://github.com/asklar) ([Twitter @alexsklar](https://twitter.com/alexsklar)) from [React Native Windows @ Microsoft](https://microsoft.github.io/react-native-windows/)
- [Chiara Mooney](https://github.com/chiaramooney) from [React Native Windows @ Microsoft](https://microsoft.github.io/react-native-windows/)

## Plataformas suportadas

- [x] iOS
- [x] Android
- [x] macOS
- [x] Windows

_Nota: O suporte da Expo para o React Native WebView começou com [Expo SDK v33.0.0](https://blog.expo.io/expo-sdk-v33-0-0-is-now-available-52d1c99dfe4c)._

## Começando

Leia nosso [Getting Started Guide](docs/Getting-Started.md). Se algum passo não ficou claro, por favor, crie um issue detalhado.

## Versionamento

Esse projeto segue [versionamento semântico](https://semver.org/). Não hesitamos em lançar as alterações mais recentes, mas elas estarão em uma versão principal.

**Histórico:**

Versão atual: ![version](https://img.shields.io/npm/v/react-native-webview.svg)

- [11.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v11.0.0) - Android setSupportMultipleWindows.
- [10.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v10.0.0) - O plugin Android Gradle só é necessário ao abrir o projeto _stand-alone_.
- [9.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v9.0.0) - Atualizações de _props_ para injectedJavaScript não são mais imutáveis.
- [8.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v8.0.0) - onNavigationStateChange agora é disparado quando alterado o hash da URL.
- [7.0.1](https://github.com/react-native-webview/react-native-webview/releases/tag/v7.0.1) - UIWebView removido.
- [6.0.**2**](https://github.com/react-native-webview/react-native-webview/releases/tag/v6.0.2) - Update para AndroidX. Tenha certeza de habilitar no `android/gradle.properties` do seu projeto. Veja o [Getting Started Guide](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md).
- [5.0.**1**](https://github.com/react-native-webview/react-native-webview/releases/tag/v5.0.0) - Refatorou a antiga implementação postMessage para comunicação da visualização da webview para nativa.
- [4.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v4.0.0) - Cache adicionada(habilitada por padrão).
- [3.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v3.0.0) - WKWebview: Adicionado um pool de processos compartilhados para que os cookies e o localStorage sejam compartilhados nas webviews no iOS (habilitadas por padrão)
- [2.0.0](https://github.com/react-native-webview/react-native-webview/releases/tag/v2.0.0) - Primeiro lançamento, esta é uma réplica do componente principal do webview.

**Próximos Passos:**

- Remoção do this.webView.postMessage() (
  nunca foi documentado e é menos flexível que o injectJavascript) -> [Como migrar](https://github.com/react-native-webview/react-native-webview/issues/809)
- Reescrita em Kotlin
- Talvez reescrita em Swift

## Uso

Importe o componente `WebView` `react-native-webview` e use assim:

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

Para mais informações, leia a [API Reference](./docs/Reference.md) e o [Guia](./docs/Guide.md). Se você está interessado em contribuir, confira o [Guia de contribuição](./docs/Contributing.md).

## Problemas comuns

- Se você está recebendo `Invariant Violation: Native component for "RNCWebView does not exist"` provavelmente significa que você esqueceu de rodar `react-native link` ou houve algum erro no processo de linking.
- Se você encontrar um erro de compilação durante a tarefa: `app:mergeDexRelease`, será necessário habilitar o suporte multidex em `android/app/build.gradle` conforme discutido [neste problema](https://github.com/react-native-webview/react-native-webview/issues/1344#issuecomment-650544648)

## Contribuindo

Veja [Contributing.md](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Contributing.md)

## Licença

MIT

## Traduções

Esse readme está disponível em:

- [Francês](README.french.md)
- [Inglês](../README.md)
- [Italiano](README.italian.md)
