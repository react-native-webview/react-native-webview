# Guida al Debugging di React Native WebView
Ecco alcuni utili consigli per il debugging di React Native WebView.

## Errori di Script
Può essere difficile risolvere errori di sintassi e altri errori di script in WebView, poiché gli errori di solito non vengono visualizzati in una console di default.

Un'opzione (se stai caricando HTML da una fonte esterna) è quella di iniettare un handler degli errori prima del caricamento del contenuto.

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

Questo mostrerà una finestra di avviso con (si spera) informazioni utili per il debug.

Se stai iniettando del JavaScript, potrebbe verificarsi un errore `Script error` senza altre informazioni utili. Un modo semplice per debuggare questo problema è quello di avvolgere il JavaScript iniettato in un blocco try/catch, come mostrato di seguito:

```js
const js = `
  try {
    // Qui il tuo codice
  } catch(e) {
    alert(e)
  }
  true;
`;
```

Questo mostrerà un avviso (alert) con l'errore come messaggio, che potrebbe essere utile o meno.

Se non riesci a individuare il bug con questi due semplici metodi, prova a utilizzare la prossima tecnica!

## Debugging dei contenuti nella WebView

### iOS & Safari

È possibile eseguire il debug dei contenuti di WebView nel simulatore iOS o su un dispositivo utilizzando gli strumenti per gli sviluppatori di Safari.

#### Procedura:

1. Apri le preferenze di Safari -> sezione "Avanzate" -> abilita la voce "Mostra menu Sviluppo nella barra dei menu".
2. Avvia l'app con React Native WebView nel simulatore iOS o sul dispositivo iOS.
3. Safari -> Sviluppo -> [nome del dispositivo] -> [nome dell'app] -> [URL - titolo].
4. Ora puoi risolvere i problemi dei contenuti di WebView come faresti normalmente su web.

##### Note:

Quando esegui il debug su dispositivo, devi abilitare l'ispettore web nelle impostazioni del dispositivo:

Impostazioni -> Safari -> Avanzate -> Web Inspector

Inoltre, se non vedi il tuo dispositivo nel menu Sviluppo e hai avviato Safari prima di avviare il simulatore, prova a riavviare Safari.

### Android & Chrome

È possibile eseguire il debug dei contenuti WebView nell'emulatore Android o su un dispositivo utilizzando Chrome DevTools.

1. Dovrai apportare la seguente modifica a MainApplication.java per abilitare il debug dei contenuti Web:
```java
  import android.webkit.WebView;

  @Override
  public void onCreate() {
    super.onCreate();
	  ...
    WebView.setWebContentsDebuggingEnabled(true);
  }
```
2. Avvia l'applicazione con React Native WebView nell'emulatore Android o sul dispositivo Android.
3. Apri `chrome://inspect/#devices` su Chrome (Riferimento: [Debug remoto dei dispositivi Android](https://developer.chrome.com/docs/devtools/remote-debugging/)).
4. Seleziona il tuo dispositivo sulla sinistra e seleziona "Inspect" sui contenuti WebView che desideri ispezionare.
5. Ora puoi eseguire il debug dei contenuti WebView proprio come faresti normalmente sul web.

![image](https://user-images.githubusercontent.com/1479215/47129785-9476e480-d24b-11e8-8cb1-fba77ee1c072.png)

##### Note:

Quando si esegue il debug su un dispositivo, è necessario abilitare il debug USB nelle impostazioni del dispositivo:

Impostazioni -> Sistema -> Informazioni sul telefono -> Opzioni sviluppatore -> abilita il debug USB


### Traduzioni
Questo file è disponibile nelle seguenti lingue:
- [Inglese](Debugging.md)
- [Portoghese brasiliano](Debugging.portuguese.md)