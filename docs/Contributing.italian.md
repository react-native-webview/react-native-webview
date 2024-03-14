# Contribuire a React Native WebView

Innanzitutto, _grazie_ per aver considerato di contribuire alla comunità di React Native. I pacchetti supportati dalla comunità sono possibili solo grazie a persone straordinarie come te.

In secondo luogo, desideriamo che l'esperienza di contribuzione sia il migliore possibile. Nonostante siamo un piccolo team composto interamente da volontari, siamo felici di ricevere feedback sulla tua esperienza e se possiamo migliorare la documentazione o l'esperienza, ti preghiamo di farcelo sapere.

## Come testare le modifiche

Dopo aver forkato il reposito, clonalo sulla tuo computer e apporta le modifiche. Successivamente, potrai testarle in un'applicazione.

Ci sono due metodi per testare:
1) testare all'interno di una copia di react-native-webview;
2) testare in un nuovo progetto creato con `react-native init`.

### Testare in react-native-webview

#### Per tutte le piattaforme:

```sh
yarn install
```

#### Per Android:

```sh
yarn android
```

L'applicazione di esempio per Android verrà compilata, Metro bundler si avvierà e l'applicazione verrà installata e avviata nell'emulatore Android.

#### Per iOS:

```sh
pod install --project-directory=example/ios
yarn ios
```

L'app di esempio per iOS verrà compilata, Metro bundler verrà avviato e l'app verrà installata e avviata nel simulatore.

#### Per macOS:

```sh
pod install --project-directory=example/macos
yarn macos
```

L'app di esempio per macOS verrà compilata, Metro bundler verrà avviato e l'app verrà installata e avviata.

#### Per Windows:

```sh
yarn windows
```

L'app di esempio per Windows verrà compilata, Metro bundler verrà avviato e l'app verrà installata e avviata.

### Testare in un nuovo progetto con `react-native init`

In un nuovo progetto `react-native init`, fai quanto segue:

```
$ yarn add <percorso locale a react-native-webview>
```

Potresti riscontrare un problema in cui la mappatura dei moduli `jest-haste-map` segnala che react-native è stato aggiunto due volte.

```
Loading dependency graph...(node:32651) UnhandledPromiseRejectionWarning: Error: jest-haste-map: Haste module naming collision:
  Duplicate module name: react-native
  Paths: /Users/myuser/TestApp/node_modules/react-native/package.json collides with /Users/myuser/TestApp/node_modules/react-native-webview/node_modules/react-native/package.json
```

In tal caso rimuovi il secondo path in questo modo:

```
$ rm -rf ./node_modules/react-native-webview/node_modules/react-native
```

E fai ripartire il packager assicurandoti di passare la flag per resettare la cache:

```
$ react-native start --reset-cache
```

Potresti anche visualizzare un avviso sulla console riguardante "Invalid hook call", seguito da un errore di interpretazione che indica "null is not an object (evaluating 'dispatcher.useRef')." Per risolvere questo problema, segui la stessa procedura di prima, ma questa volta elimina la cartella `react-native-webview/node_modules/react`.

(se cancelli `react` prima di `react-native`, potresti incappare in un altro errore: "View config getter callback for component 'RNCWebView' must be a function," per risolvere il problema elimina anche `react-native`)

Quando apporti una modifica, molto probabilmente dovrai rimuovere e aggiungere nuovamente `react-native-webview`:

```
$ yarn remove react-native-webview
$ yarn add ../react-native-webview
```

## Note
- Usiamo TypeScript.
- Dopo aver scaricato quest repo e installato tutte le dipendenze, puoi eseguire i test usando il comando: `yarn ci`.

### Traduzioni
Questo file è disponibile nelle seguenti lingue:
- [Inglese](Contributing.md)
- [Portoghese brasiliano](Contributing.portuguese.md)