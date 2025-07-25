import { getDefaultConfig } from '@expo/metro-config';
import path from 'path';

const projectRoot = __dirname;
const monorepoRoot = path.resolve(__dirname, '../..');
const config = getDefaultConfig(projectRoot);

const librariesToDedupe = ['react-native', 'react'];
const regexes = librariesToDedupe.map((lib) => new RegExp(`^${lib}(?:/.*)?$`));

if (!config.resolver || !config.transformer) {
  throw new Error('Resolver or transformer not found');
}

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (regexes.some((regex) => regex.test(moduleName))) {
    return context.resolveRequest(
      { ...context, disableHierarchicalLookup: true },
      moduleName,
      platform,
    );
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
