/**
 * @see https://github.com/zennit-dev/alerium/blob/main/apps/native/metro.config.js
 */

const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const {
  withTurborepoManagedCache,
  withWorkspace,
  composePlugins,
  withSentry,
  withNativewind,
} = require('@v1/metro');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const withV1 = composePlugins(
  (config) => withNativewind(config, projectRoot, './src/design/ui-kit/global.css'),
  (config) => withSentry(config),
  (config) => wrapWithReanimatedMetroConfig(config),
  (config) => withWorkspace(config, monorepoRoot, projectRoot),
  (config) => withTurborepoManagedCache(config, projectRoot),
);

const config = getDefaultConfig(projectRoot);

module.exports = withV1(config);
