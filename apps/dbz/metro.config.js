// Learn more https://docs.expo.io/guides/customizing-metro

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { FileStore } = require('metro-cache');
const join = require('node:path').join;
const resolve = require('node:path').resolve;

const projectRoot = __dirname;
const monorepoRoot = resolve(projectRoot, '../..');
const config = getDefaultConfig(projectRoot);

/**
 * Move the Metro cache to the `node_modules/.cache/metro` folder.
 * This repository configured Turborepo to use this cache location as well.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache(config) {
  config.cacheStores = [new FileStore({ root: join(__dirname, 'node_modules/.cache/metro') })];

  return config;
}

/**
 * Add the monorepo paths to the Metro config.
 * This allows Metro to resolve modules from the monorepo.
 *
 * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withMonorepoPaths(config) {
  // #1 - Watch all files in the monorepo
  config.watchFolders = [monorepoRoot];

  // #2 - Resolve modules within the project's `node_modules` first, then all monorepo modules
  config.resolver.nodeModulesPaths = [
    resolve(projectRoot, 'node_modules'),
    resolve(monorepoRoot, 'node_modules'),
  ];

  // for expo-sqlite
  config.resolver.sourceExts.push('sql');

  return config;
}

module.exports = withTurborepoManagedCache(
  withMonorepoPaths(withNativeWind(config, { input: './src/global.css' })),
);
