# React Native Webview

![star this repo](https://img.shields.io/github/stars/react-native-webview/react-native-webview?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![NPM Version](https://img.shields.io/npm/v/react-native-webview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-webview)
![Npm Downloads](https://img.shields.io/npm/dm/react-native-webview.svg)
<a href="https://www.npmjs.com/package/react-native-webview"><img src="https://img.shields.io/npm/v/react-native-webview.svg"></a>

**React Native WebView** Es un componente WebView mantenido por la comunidad para React Native. Está destinado a ser un reemplazo del integrado WebView (que fue [removido del core](https://github.com/react-native-community/discussions-and-proposals/pull/3))

### Mantenedores

**Muchas Gracias a todas esas personas** que han colaborado con su tiempo para brindar apoyo a este proyecto open source.
Ten en cuenta que los mantenedores también dedican mucho de su tiempo libre a trabajar en esto, así que siéntete libre de patrocinarlos, **realmente hace una diferencia.**

- [Thibault Malbranche](https://github.com/Titozzz) ([Twitter @titozzz](https://twitter.com/titozzz)) from [Brigad](https://www.brigad.co/en-gb/about-us)  
[*Sponsor me* ❤️ !](https://github.com/sponsors/Titozzz)

Windows y macOS son gestionados por Microsoft, en particular:
- [Alexander Sklar](https://github.com/asklar) ([Twitter @alexsklar](https://twitter.com/alexsklar)) from [React Native for Windows](https://microsoft.github.io/react-native-windows/)
- [Chiara Mooney](https://github.com/chiaramooney) from [React Native for Windows @ Microsoft](https://microsoft.github.io/react-native-windows/)

Shout-out to [Jamon Holmgren](https://github.com/jamonholmgren) from [Infinite Red](https://infinite.red) for helping a lot with the repo when he had more available time.

### Aviso

Mantener WebView es muy complejo porque se usa con frecuencia para muchos casos de uso diferentes (renderizar SVGs, PDFs, flujos de inicio de sesión y mucho más). También soportamos muchas plataformas y ambas arquitecturas de react-native.

Desde que WebView fue extraido de React Native core, mas de 500 pull requests se han fusionado.
Considerando que el tiempo es limitado, los problemas (issues) serviran como lugar de discussion para la comunidad, mentras que priorizaremos la revison y fusion de pull requests.

### Compatibilidad de plataformas

- [x] iOS
- [x] maxOS
- [x] Android
- [x] Windows

Este proyecto soporta tanto la **arquitectura antigua** (paper) como la **arquitecture nueva** (fabric).
Este proyecto es compatible con [expo](https://docs.expo.dev/versions/latest/sdk/webview/).

### Empezando

Debes leer nuestra guia [Getting Started Guide](docs/Getting-Started.md). Si algun paso no esta claro, por favor abre un pull request.

### Versionando

Este proyecto sigue [versionamiento semantico](https://semver.org/).
No dudamos en lanzar cambios incompatibles, pero estos estarán en una versión mayor.

### Implementacion

Importe el componente `WebView` de `react-native-webview`

```tsx
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
const MyWebComponent = () => {
  return <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />;
}
```

Para mas informacion, lea [API Reference](docs/Reference.md) y [Guia](docs/Guide.md).
Si esta interesado en contribuir al proyecto lea la [Guia de contribucion](docs/Contributing.md).

### Problemas Comúnes

- Si recibes `Invariant Violation: Native component for "RNCWebView does not exist"` probablemente significa que has olvidado ejecutar `react-native link` o que hubo algun error en el proceso de linking.
- Si encaras un error de compilación durante la tarea `:app:mergeDexRelease`, necesitas habilitar el soporte para multidex en `android/app/build.gradle` como discutido en [este problema](https://github.com/react-native-webview/react-native-webview/issues/1344#issuecomment-650544648).

### Contribuciones

Las contribucions son bienvenidas, lea [Contributing.md]((https://github.com/react-native-webview/react-native-webview/blob/master/docs/Contributing.md))


### Licencia

MIT

### Traducciones

- [Ingles](../README.md)
- [Brazilian portuguese](docs/README.portuguese.md)
- [Frances](README.french.md)
- [Italiano](README.italian.md)
