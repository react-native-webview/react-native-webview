const path = require('path');
const { createRequire } = require('module');

module.exports = function makeExampleMetroConfig(projectRoot, platformResolver) {
  const requireFromApp = createRequire(path.join(projectRoot, 'package.json'));
  const { makeMetroConfig } = requireFromApp('@rnx-kit/metro-config');
  const monorepoRoot = path.resolve(projectRoot, '../..');
  const webview = path.join(monorepoRoot, 'packages/react-native-webview');
  const shared = path.join(monorepoRoot, 'packages/example-shared');
  const packages = { 'react-native-webview': webview, 'example-shared': shared };
  // Apps in the root workspace resolve dependencies from the hoisted root node_modules.
  const { workspaces } = require('../package.json');
  const inRootWorkspace = workspaces.includes(
    path.relative(monorepoRoot, projectRoot).split(path.sep).join('/'),
  );

  const config = makeMetroConfig({
    projectRoot,
    watchFolders: [webview, shared, ...(inRootWorkspace ? [monorepoRoot] : [])],
    resolver: {
      resolverMainFields: ['main-internal', 'browser', 'main'],
      // Shared source must resolve React and RN from the consuming platform app.
      disableHierarchicalLookup: true,
      nodeModulesPaths: [
        path.join(projectRoot, 'node_modules'),
        ...(inRootWorkspace ? [path.join(monorepoRoot, 'node_modules')] : []),
      ],
      extraNodeModules: packages,
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: { experimentalImportSupport: false, inlineRequires: false },
      }),
    },
  });

  const resolveRequest = config.resolver.resolveRequest;
  config.resolver.resolveRequest = (context, moduleName, platform) => {
    let target = moduleName;
    for (const [name, directory] of Object.entries(packages)) {
      if (moduleName === name || moduleName.startsWith(`${name}/`)) {
        target = path.join(directory, moduleName.slice(name.length));
        break;
      }
    }
    const resolve = (ctx, name, targetPlatform) =>
      resolveRequest({ ...ctx, resolveRequest: undefined }, name, targetPlatform);
    return platformResolver
      ? platformResolver({ ...context, resolveRequest: resolve }, target, platform)
      : resolve(context, target, platform);
  };

  return config;
};
