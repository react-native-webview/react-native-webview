# Guia de depuração do React Native WebView

Aqui estão algumas dicas úteis de depuração do React Native WebView.

## Scripts de error

Pode ser difícil depurar erros de sintaxe e outros erros de script no WebView, pois os erros não aparecem em um console por padrão.

Uma opção (se você estiver carregando HTML de uma fonte externa) é injetar um manipulador de erros antes que o conteúdo seja carregado.

```js
<WebView
  injectedJavaScriptBeforeContentLoaded={`
    window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
      return true;
    };
    true;
  `}
  source={{
    uri:
      'https://bl.ocks.org/jamonholmgren/raw/48423fd99537283beace1daa2688e80f/',
  }}
/>
```

Isso fornecerá uma caixa de alerta com (espero) informações úteis de depuração.

Se você estiver injetando JavaScript, isso pode falhar com `script de erro` e nenhuma outra informação útil. Uma maneira simples de depurar isso é envolver seu JavaScript injetado em um try/catch, assim:

```js
const js = `
  try {
    // your code here
  } catch(e) {
    alert(e)
  }
  true;
`;
```

Isso exibirá um alerta com a mensagem de erro, que pode ou não ser útil.

Se esses dois métodos simples falharem em descobrir o bug, tente usar a próxima técnica!

## Depurando o conteúdo do WebView

### iOS & Safari

É possível depurar o conteúdo do WebView no simulador iOS ou em um dispositivo usando o Safari Developer Toolkit.

#### Passos:

1. Abra as Preferências do Safari -> guia "Avançado" -> marque a caixa de seleção "Mostrar menu de Desenvolvedor na barra de menus"
2. Inicie o aplicativo com o React Native WebView no simulador iOS ou dispositivo iOS
3. Safari -> Desenvolver -> [nome do dispositivo] -> [nome do app] -> [url - titulo]
4. Agora você pode depurar o conteúdo do WebView exatamente como faria na web

##### Notas:

Ao depurar no dispositivo, você deve habilitar o Inspetor Web nas configurações do dispositivo:

Configurações -> Safari -> Avançado -> Inspetor Web

Além disso, se você não vir seu dispositivo no menu Desenvolver e tiver iniciado o Safari antes de iniciar o simulador, tente reiniciar o Safari.

### Android & Chrome

É possível depurar o conteúdo do WebView no emulador do Android ou em um dispositivo usando o Chrome DevTools.

1. Você precisará fazer a seguinte alteração em `MainApplication.java` para habilitar a depuração de conteúdo da web:

```java
  import android.webkit.WebView;

  @Override
  public void onCreate() {
    super.onCreate();
	  ...
    WebView.setWebContentsDebuggingEnabled(true);
  }
```

2. Inicie o aplicativo com React Native WebView no emulador Android ou dispositivo Android
3. Abra `chrome://inspect/#devices` no Chrome (Referência: [Depuração remota de dispositivos Android](https://developer.chrome.com/docs/devtools/remote-debugging/))
4. Selecione seu dispositivo à esquerda e selecione "Inspecionar" no conteúdo do WebView que você deseja inspecionar
5. Agora você pode depurar o conteúdo do WebView exatamente como faria na web

![image](https://user-images.githubusercontent.com/1479215/47129785-9476e480-d24b-11e8-8cb1-fba77ee1c072.png)

##### Observação:

Ao depurar no dispositivo, você deve habilitar a depuração USB nas configurações do dispositivo:

Settings -> Configurações -> Sobre telefone -> Opções de desenvolvedor -> ativar o USB depuração

## Traduções

Esse arquivo está disponível em:

- [Inglês](Debugging.md)
