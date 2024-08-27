# Guia React Native WebView

Este documento orienta você pelos casos de uso mais comuns do React Native WebView. Ele não cobre [a API completa](Reference.portuguese.md), mas depois de lê-lo e ver os trechos de código de exemplo, você deve ter uma boa noção de como o WebView funciona e os padrões comuns para usar o WebView.

_Este guia atualmente é um trabalho em andamento._

## Index

- [HTML Básico](Guide.portuguese.md#html-básico)
- [Url](Guide.portuguese.md#url)
- [Carregando de arquivos HTML locais](Guide.portuguese.md#carregando-de-arquivos-html-locais)
- [Controlando as alterações do estado de navegação](Guide.portuguese.md#controlando-as-alterações-do-estado-de-navegação)
- [Adicionar suporte para upload de arquivos](Guide.portuguese.md#adicionar-suporte-para-upload-de-arquivos)
- [Upload de vários arquivos](Guide.portuguese.md#upload-de-vários-arquivos)
- [Adicionar suporte para download de arquivos](Guide.portuguese.md#adicionar-suporte-para-download-de-arquivos)
- [Comunicação entre JS e Native](Guide.portuguese.md#comunicação-entre-js-e-native)
- [Trabalhando com cabeçalhos, sessões e cookies personalizados](Guide.portuguese.md#trabalhando-com-cabeçalhos-sessões-e-cookies-personalizados)

### HTML Básico

A maneira mais simples de usar a WebView é simplesmente canalizar o HTML que você deseja exibir. Observe que definir uma fonte `html` requer que a propriedade [originWhiteList](Reference.portuguese.md#originWhiteList) seja definida como `['*']`.

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyInlineWeb extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Esta é uma fonte HTML estática!</h1>' }}
      />
    );
  }
}
```

Passar uma nova fonte html estática fará com que o WebView seja renderizado novamente.

### Url

Este é o caso de uso mais comum para WebView.

```js
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
  }
}
```

### Carregando arquivos HTML locais

Observação: no momento, isso não está funcionando conforme discutido em [#428](https://github.com/react-native-webview/react-native-webview/issues/428) e [#518](https://github.com/react-native-webview/react-native-webview/issues/518). As possíveis soluções incluem agrupar todos os ativos com webpack ou similar, ou executar um [servidor da web local](https://github.com/futurepress/react-native-static-server).

<details><summary>Mostrar método que não funciona</summary>

Às vezes, você teria agrupado um arquivo HTML junto com o aplicativo e gostaria de carregar o ativo HTML em seu WebView. Para fazer isso no iOS e no Windows, basta importar o arquivo html como qualquer outro ativo, conforme mostrado abaixo.

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

No entanto, no Android, você precisa colocar o arquivo HTML dentro do diretório de ativos do seu projeto Android. Por exemplo, se `local-site.html` for seu arquivo HTML e você quiser carregá-lo na visualização da web, você deve mover o arquivo para o diretório de ativos do Android do seu projeto, que é `your-project/android/app/src /main/assets/`. Então você pode carregar o arquivo html conforme mostrado no seguinte bloco de código

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

### Controlando as alterações do estado de navegação

Às vezes, você deseja interceptar um usuário tocando em um link em sua visualização da web e fazer algo diferente de navegar na visualização da web. Aqui está um código de exemplo de como você pode fazer isso usando a função `onNavigationStateChange`.

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
    // newNavState se parece com isso:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (!url) return;

    // lidar com doctypes
    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      // abra um modal com o visualizador de PDF
    }

    // uma maneira de lidar com um envio de formulário bem-sucedido é por meio de strings de consulta
    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // talvez fechar?
    }

    // uma maneira de lidar com erros é via string de consulta
    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }

    // redirecionar para outro lugar
    if (url.includes('google.com')) {
      const newURL = 'https://reactnative.dev/';
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
}
```

### Adicionar suporte para upload de arquivos

##### iOS

Para iOS, tudo que você precisa fazer é especificar as permissões em seu arquivo `ios/[project]/Info.plist`:

Captura de foto:

```
<key>NSCameraUsageDescription</key>
<string>Take pictures for certain activities</string>
```

Seleção de galeria:

```
<key>NSPhotoLibraryUsageDescription</key>
<string>Select pictures for certain activities</string>
```

Gravação de vídeo:

```
<key>NSMicrophoneUsageDescription</key>
<string>Need microphone access for recording videos</string>
```

##### Android

Adicione permissão no AndroidManifest.xml:

```xml
<manifest ...>
  ......

 <!-- isso é necessário apenas para Android 4.1-5.1 (api 16-22) -->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```

###### Disponibilidade da opção de câmera no upload para Android

Se a entrada do arquivo indicar que imagens ou vídeo são desejados com [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept), então a WebView tentará fornecer opções ao usuário para usar sua câmera para tirar uma foto ou vídeo.

Normalmente, os aplicativos que não têm permissão para usar a câmera podem solicitar que o usuário use um aplicativo externo para que o aplicativo solicitante não precise de permissão. No entanto, o Android fez uma exceção especial para isso em torno da câmera para reduzir a confusão dos usuários. Se um aplicativo _can_ solicitar a permissão da câmera porque foi declarado e o usuário não concedeu a permissão, ele não poderá disparar um intent que usaria a câmera (`MediaStore.ACTION_IMAGE_CAPTURE` ou `MediaStore.ACTION_VIDEO_CAPTURE`). Nesse cenário, cabe ao desenvolvedor solicitar a permissão da câmera antes que um upload de arquivo diretamente usando a câmera seja necessário.

##### Verifique se há suporte para upload de arquivos, com `static isFileUploadSupported()`

O upload de arquivo usando `<input type="file" />` não é compatível com o Android 4.4 KitKat (consulte os [detalhes](https://github.com/delight-im/Android-AdvancedWebView/issues/4#issuecomment-70372146 )):

```javascript
import { WebView } from "react-native-webview";

WebView.isFileUploadSupported().then(res => {
  if (res === true) {
    // o upload de arquivos é suportado
  } else {
    // o upload de arquivos não é suportado
  }
});
```

### Upload de vários arquivos

Você pode controlar a seleção de arquivo **único** ou **múltiplo** especificando o [`múltiplo`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple) em seu elemento `input`:

```javascript
// seleção de vários arquivos
<input type="file" multiple />

// seleção de arquivo único
<input type="file" />
```

### Adicionar suporte para download de arquivos

##### iOS

O iOS, você terá que fornecer seu próprio código para baixar os arquivos. Você pode fornecer um retorno de chamada `onFileDownload` para o componente WebView como um prop. Se o RNCWebView determinar que um download de arquivo precisa ocorrer, a URL onde você pode baixar o arquivo será dado a `onFileDownload`. A partir desse retorno de chamada, você pode baixar esse arquivo da maneira que desejar.

NOTA: O iOS 13+ é necessário para a melhor experiência de download possível. No iOS 13, a Apple adicionou uma API para acessar cabeçalhos de resposta HTTP, que
é usado para determinar se uma resposta HTTP deve ser um download. No iOS 12 ou anterior, apenas os tipos MIME que não podem ser renderizados pela webview serão
acionar chamadas para `onFileDownload`.

Exemplo:

```javascript
onFileDownload = ({ nativeEvent }) => {
  const { downloadUrl } = nativeEvent;
  // --> Seu código de download vai aqui <--
};
```

Para poder salvar imagens na galeria você precisa especificar esta permissão em seu arquivo `ios/[project]/Info.plist`:

```
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Save pictures for certain activities.</string>
```

##### Android

No Android, a integração com o DownloadManager é integrada.
Adicione esta permissão em AndroidManifest.xml (necessário apenas se seu aplicativo for compatível com versões do Android anteriores a 10):

```xml
<manifest ...>
  ......

  <!-- isso é necessário para salvar arquivos em versões do Android inferiores a 10 -->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  ......
</manifest>
```

### Comunicação entre JS e Native

Muitas vezes você vai querer enviar mensagens para as páginas da web carregadas por suas visualizações da web e também receber mensagens de volta dessas páginas da web.

Para fazer isso, o React Native WebView expõe três opções diferentes:

1. Reagir Nativo -> Web: A prop `injectedJavaScript` 
2. Reagir Nativo -> Web: O método `injectJavaScript`
3. Web -> React Native: O método `postMessage` e a prop `onMessage`

#### A prop `injectedJavaScript`

Este é um script que é executado imediatamente após o carregamento da página da Web pela primeira vez. Ele é executado apenas uma vez, mesmo que a página seja recarregada ou navegada.

```jsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  render() {
    const runFirst = `
      document.body.style.backgroundColor = 'red';
      setTimeout(function() { window.alert('hi') }, 2000);
      true; // nota: isso é necessário, ou às vezes você terá falhas
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

Isso executa o JavaScript na string `runFirst` assim que a página é carregada. Nesse caso, você pode ver que o estilo do corpo foi alterado para vermelho e o alerta apareceu após 2 segundos. Um evento `onMessage` também é necessário para injetar o código JavaScript no WebView.

Ao definir `injectedJavaScriptForMainFrameOnly: false`, a injeção de JavaScript ocorrerá em todos os quadros (não apenas no quadro principal) se houver suporte para a plataforma especificada. Por exemplo, se uma página contiver um iframe, o javascript também será injetado nesse iframe com este definido como `false`. (Observe que isso não é suportado no Android.) Há também o `injectedJavaScriptBeforeContentLoadedForMainFrameOnly` para injeção antes do carregamento do conteúdo. Leia mais sobre isso na [Referência](./Reference.portuguese.md#injectedjavascriptformainframeonly).

<img alt="screenshot of Github repo" width="200" src="https://user-images.githubusercontent.com/1479215/53609254-e5dc9c00-3b7a-11e9-9118-bc4e520ce6ca.png" />

_Como funciona no OS_

> No iOS, ~~`injectedJavaScript` executa um método no WebView chamado `evaluateJavaScript:completionHandler:`~~ – isso não é mais verdade a partir da versão `8.2.0`. Em vez disso, usamos um `WKUserScript` com tempo de injeção `WKUserScriptInjectionTimeAtDocumentEnd`. Como consequência, o `injectedJavaScript` não retorna mais um valor de avaliação nem registra um aviso no console. No caso improvável de seu aplicativo depender desse comportamento, consulte as etapas de migração [aqui](https://github.com/react-native-webview/react-native-webview/pull/1119#issuecomment-574919464) para manter comportamento equivalente.
> No Android, `injectedJavaScript` executa um método no Android WebView chamado `evaluateJavascriptWithFallback`
> No Windows, o `injectedJavaScript` executa um método no WinRT/C++ WebView chamado `InvokeScriptAsync`

#### A prop `injectedJavaScriptBeforeContentLoaded`

Este é um script executado **antes** do carregamento da página da Web pela primeira vez. Ele é executado apenas uma vez, mesmo que a página seja recarregada ou navegada. Isso é útil se você deseja injetar qualquer coisa na janela, armazenamento local ou documento antes da execução do código da web.

```jsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  render() {
    const runFirst = `
      window.isNativeApp = true;
      true; // nota: isso é necessário, ou às vezes você terá falhas
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

Isso executa o JavaScript na string `runFirst` antes que a página seja carregada. Nesse caso, o valor de `window.isNativeApp` será definido como true antes que o código da web seja executado.

Ao definir `injectedJavaScriptBeforeContentLoadedForMainFrameOnly: false`, a injeção de JavaScript ocorrerá em todos os quadros (não apenas no quadro superior) se houver suporte para a plataforma especificada. No entanto, embora o suporte para `injectedJavaScriptBeforeContentLoadedForMainFrameOnly: false` tenha sido implementado para iOS e macOS, [não está claro](https://github.com/react-native-webview/react-native-webview/pull/1119#issuecomment-600275750) que é realmente possível injetar JS em iframes neste ponto do ciclo de vida da página e, portanto, confiar no comportamento esperado dessa prop quando definido como `false` não é recomendado.

> No iOS, ~~`injectedJavaScriptBeforeContentLoaded` executa um método no WebView chamado `evaluateJavaScript:completionHandler:`~~ – isso não é mais verdade a partir da versão `8.2.0`. Em vez disso, usamos um `WKUserScript` com tempo de injeção `WKUserScriptInjectionTimeAtDocumentStart`. Como consequência, `injectedJavaScriptBeforeContentLoaded` não retorna mais um valor de avaliação nem registra um aviso no console. No caso improvável de seu aplicativo depender desse comportamento, consulte as etapas de migração [aqui](https://github.com/react-native-webview/react-native-webview/pull/1119#issuecomment-574919464) para manter comportamento equivalente.
> No Android, `injectedJavaScript` executa um método no Android WebView chamado `evaluateJavascriptWithFallback`
> Observação sobre compatibilidade com Android: para aplicativos direcionados a `Build.VERSION_CODES.N` ou posterior, o estado JavaScript de um WebView vazio não é mais mantido em navegações como `loadUrl(java.lang.String)`. Por exemplo, variáveis ​​globais e funções definidas antes de chamar `loadUrl(java.lang.String)` não existirão na página carregada. Os aplicativos devem usar a API nativa do Android `addJavascriptInterface(Object, String)` para persistir objetos JavaScript nas navegações.

#### O método `injectJavaScript`

Embora conveniente, a desvantagem da prop `injectedJavaScript` mencionado anteriormente é que ele é executado apenas uma vez. É por isso que também expomos um método no webview ref chamado `injectJavaScript` (observe o nome ligeiramente diferente!).

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

Após 3 segundos, este código torna o fundo azul:

<img alt="Screenshot of app showing injected javascript" width="200" src="https://user-images.githubusercontent.com/1479215/53670433-93a98280-3c2f-11e9-85a5-0e4650993817.png" />

_Como funciona no OS_

> No iOS, `injectJavaScript` chama `evaluateJS:andThen:` da WebView
> No Android, `injectJavaScript` chama o método `evaluateJavascriptWithFallback` do Android WebView

#### O método `window.ReactNativeWebView.postMessage` e a prop `onMessage`

Ser capaz de enviar JavaScript para a página da Web é ótimo, mas e quando a página da Web deseja se comunicar de volta ao seu código React Native? É aqui que entram o `window.ReactNativeWebView.postMessage` e a prop `onMessage`.

Você _deve_ definir `onMessage` ou o método `window.ReactNativeWebView.postMessage` não será injetado na página web.

`window.ReactNativeWebView.postMessage` só aceita um argumento que deve ser uma string.

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

Este código resultará neste alerta:

<img alt="Alert showing communication from web page to React Native" width="200" src="https://user-images.githubusercontent.com/1479215/53671269-7e822300-3c32-11e9-9937-7ddc34ba8af3.png" />

### Trabalhando com cabeçalhos, sessões e cookies personalizados

#### Configurando cabeçalhos personalizados

No React Native WebView, você pode definir um cabeçalho personalizado como este:

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

Isso definirá o cabeçalho no primeiro carregamento, mas não nas navegações de página subsequentes.

Para contornar isso, você pode rastrear o URL atual, interceptar novos carregamentos de página e navegar até eles você mesmo ([crédito original desta técnica para Chirag Shah do Big Binary](https://blog.bigbinary.com/2016/07/26/passing-request-headers-on-each-webview-request-in-react-native.html)):

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
        // Se estivermos carregando o URI atual, permita que ele carregue
        if (request.url === currentURI) return true;
        // Estamos carregando um novo URL -- altere o estado primeiro
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
      'my-custom-header-key': 'my-custom-header-value',
    },
  }}
/>;
```

#### Gerenciando cookies

Você pode definir cookies no lado React Native usando o pacote [@react-native-cookies/cookies](https://github.com/react-native-cookies/cookies).

Ao fazer isso, você provavelmente desejará habilitar a propriedade [sharedCookiesEnabled](Reference.portuguese.md#sharedCookiesEnabled) também.

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

Se você deseja enviar cookies personalizados na própria WebView, pode fazê-lo em um cabeçalho personalizado, como este:

```jsx
const App = () => {
  return (
    <WebView
      source={{
        uri: 'http://example.com',
        headers: {
          Cookie: 'cookie1=asdf; cookie2=dfasdfdas',
        },
      }}
      sharedCookiesEnabled={true}
    />
  );
};
```

Observe que esses cookies só serão enviados na primeira solicitação, a menos que você use a técnica acima para [definir cabeçalhos personalizados em cada carregamento de página](#Setting-Custom-Headers).

### Interruptor de silêncio de hardware

Existem algumas inconsistências na forma como o interruptor de silêncio de hardware é tratado entre os elementos `audio` e `video` incorporados e entre as plataformas iOS e Android.

O áudio no `iOS` será silenciado quando a chave de silêncio do hardware estiver na posição ligada, a menos que o parâmetro `ignoreSilentHardwareSwitch` seja definido como verdadeiro.

O vídeo no `iOS` sempre ignorará a chave de silêncio do hardware.

## Traduções

Esse arquivo está disponível em:

- [Inglês](Guide.md)
- [Italiano](Guide.italian.md)
