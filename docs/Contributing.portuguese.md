# Contribuindo com o React Native WebView

Primeiramente, _obrigado_ por considerar contribuir para a Comunidade do React Native. Os pacotes mantidos pela comunidade só são possíveis por causa de pessoas incríveis como você.

Em segundo lugar, gostaríamos que a experiência de contribuição fosse a melhor possível. Embora sejamos uma pequena equipe de voluntários, ficamos felizes em receber comentários sobre suas experiências e se pudermos melhorar os documentos ou a experiência, informe-nos.

## Como testar as alterações

Após fazer um fork do repositório, cloná-lo em sua máquina e fazer suas alterações, você deverar testá-las em uma aplicação.

Existem dois métodos de teste:
1) Rodando os testes do react-native-webview
2) Testando em um projeto `react-native init`

### Rodando os testes dentro do react-native-webview

#### Para todas as plataformas:

```sh
yarn install
```

#### Para Android:

```sh
yarn android
```

O aplicativo de exemplo do Android será compilado, o Metro Bundler será iniciado e o aplicativo de exemplo será instalado e iniciado no emulador do Android.

#### Para iOS:

```sh
pod install --project-directory=example/ios
yarn ios
```

O aplicativo de exemplo para iOS será compilado, o empacotador Metro será iniciado e o aplicativo de exemplo será instalado e iniciado no Simulador.

#### Para macOS:

```sh
pod install --project-directory=example/macos
yarn macos
```

O aplicativo de exemplo para macOS será compilado, o empacotador Metro será iniciado e o aplicativo de exemplo será instalado e iniciado.

#### Para Windows:

```sh
yarn windows
```

O aplicativo de exemplo para Windows será compilado, o empacotador Metro será iniciado e o aplicativo de exemplo será instalado e iniciado.

### Testando em um novo projeto `react-native init`

Em um novo projeto `react-native init`, faça o seguinte:

```
$ yarn add ../react-native-webview
$ react-native link react-native-webview
```

Você pode encontrar um problema em que o mapa do módulo `jest-haste-map` diz que react-native foi adicionado duas vezes:

```
Loading dependency graph...(node:32651) UnhandledPromiseRejectionWarning: Error: jest-haste-map: Haste module naming collision:
  Duplicate module name: react-native
  Paths: /Users/myuser/TestApp/node_modules/react-native/package.json collides with /Users/myuser/TestApp/node_modules/react-native-webview/node_modules/react-native/package.json
```

Basta remover seguindo o caminho abaixo:

```
$ rm -rf ./node_modules/react-native-webview/node_modules/react-native
```

E, em seguida, execute novamente o comando:

```
$ react-native start --reset-cache
```

Ao fazer uma alteração, você provavelmente precisará desvincular, remover, adicionar novamente e vincular novamente o `react-native-webview`:

```
$ react-native unlink react-native-webview && yarn remove react-native-webview
$ yarn add ../react-native-webview && react-native link react-native-webview
```

## Notas

- Usamos TypeScript.
- Depois de puxar este repositório e instalar todas as dependências, você pode executar testes usando o comando: `yarn ci`

## Traduções

Esse arquivo está disponível em:

- [Inglês](Contributing.md)
- [Italiano](Contributing.italian.md)
