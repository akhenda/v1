// Learn more: https://docs.expo.dev/guides/monorepos/
const { FileStore } = require('metro-cache');
const metroResolver = require('metro-resolver');
const fs = require('node:fs');
const existsSync = require('node:fs').existsSync;
const readdirSync = require('node:fs').readdirSync;
const statSync = require('node:fs').statSync;
const dirname = require('node:path').dirname;
const join = require('node:path').join;
const resolve = require('node:path').resolve;
const CachedInputFileSystem = require('enhanced-resolve').CachedInputFileSystem;
const ResolverFactory = require('enhanced-resolve').ResolverFactory;
const createMatchPath = require('tsconfig-paths').createMatchPath;
const loadConfig = require('tsconfig-paths').loadConfig;
const mergeConfig = require('metro-config').mergeConfig;


// Find the project and workspace directories
const projectRoot = __dirname;

// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = resolve(projectRoot, '../..');
const workspaceRoot = monorepoRoot;

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
  const projectRoot = __dirname;
  const workspaceRoot = resolve(projectRoot, '../..');

  // #1 - Watch all files in the monorepo
  config.watchFolders = [workspaceRoot];

  // #2 - Resolve modules within the project's `node_modules` first, then all monorepo modules
  config.resolver.nodeModulesPaths = [
    resolve(projectRoot, 'node_modules'),
    resolve(workspaceRoot, 'node_modules'),
  ];

  // for expo-sqlite
  config.resolver.sourceExts.push('sql');

  return config;
}

/*
 * Use tsconfig to resolve additional workspace libs.
 *
 * This resolve function requires projectRoot to be set to
 * workspace root in order modules and assets to be registered and watched.
 */
function getResolveRequest(extensions, exportsConditionNames, mainFields = []) {
  return (_context, realModuleName, platform) => {
    const debug = process.env.NX_REACT_NATIVE_DEBUG === 'true';
    const { resolveRequest, ...context } = _context;

    const resolvedPath =
      resolveRequestFromContext(resolveRequest, _context, realModuleName, platform, debug) ??
      defaultMetroResolver(context, realModuleName, platform, debug) ??
      tsconfigPathsResolver(context, extensions, realModuleName, platform, debug) ??
      pnpmResolver(extensions, context, realModuleName, debug, exportsConditionNames, mainFields);

    if (resolvedPath) return resolvedPath;
    if (debug) console.log(`[Nx] Unable to resolve with any resolver: ${realModuleName}`);

    throw new Error(`Cannot resolve ${realModuleName}`);
  };
}

function resolveRequestFromContext(resolveRequest, context, realModuleName, platform, debug) {
  try {
    return resolveRequest(context, realModuleName, platform);
  } catch {
    if (debug) console.log(`[Nx] Unable to resolve with default resolveRequest: ${realModuleName}`);
  }
}

/**
 * This function try to resolve path using metro's default resolver
 * @returns path if resolved, else undefined
 */
function defaultMetroResolver(context, realModuleName, platform, debug) {
  try {
    return metroResolver.resolve(context, realModuleName, platform);
  } catch {
    if (debug) console.log(`[Nx] Unable to resolve with default Metro resolver: ${realModuleName}`);
  }
}

/**
 * This resolver try to resolve module for pnpm.
 * @returns path if resolved, else undefined
 * This pnpm resolver is inspired from https://github.com/vjpr/pnpm-react-native-example/blob/main/packages/pnpm-expo-helper/util/make-resolver.js
 */
function pnpmResolver(extensions, context, realModuleName, debug) {
  try {
    const pnpmResolve = getPnpmResolver(extensions);
    const lookupStartPath = dirname(context.originModulePath);
    const filePath = pnpmResolve.resolveSync({}, lookupStartPath, realModuleName);

    if (filePath) return { type: 'sourceFile', filePath };
  } catch {
    if (debug) console.log(`[Nx] Unable to resolve with default PNPM resolver: ${realModuleName}`);
  }
}

/**
 * This function try to resolve files that are specified in tsconfig's paths
 * @returns path if resolved, else undefined
 */
function tsconfigPathsResolver(context, extensions, realModuleName, platform, debug) {
  try {
    const tsConfigPathMatcher = getMatcher(debug);
    const match = tsConfigPathMatcher(
      realModuleName,
      undefined,
      undefined,
      extensions.map((ext) => `.${ext}`),
    );

    return metroResolver.resolve(context, match, platform);
  } catch {
    if (debug) {
      console.log(`[Nx] Failed to resolve ${realModuleName}`);
      console.log(
        `[Nx] The following tsconfig paths was used:\n:${JSON.stringify(paths, null, 2)}`,
      );
    }
  }
}

let matcher;
let absoluteBaseUrl;
let paths;
function getMatcher(debug) {
  if (!matcher) {
    const result = loadConfig();

    if (result.resultType === 'success') {
      absoluteBaseUrl = result.absoluteBaseUrl;
      paths = result.paths;

      if (debug) {
        console.log(`[Nx] Located tsconfig at ${absoluteBaseUrl}`);
        console.log(`[Nx] Found the following paths:\n:${JSON.stringify(paths, null, 2)}`);
      }

      matcher = createMatchPath(absoluteBaseUrl, paths);
    } else {
      console.log(`[Nx] Failed to locate tsconfig}`);

      throw new Error(`Could not load tsconfig for project`);
    }
  }
  return matcher;
}

/**
 * This function returns resolver for pnpm.
 * It is inspired form https://github.com/vjpr/pnpm-expo-example/blob/main/packages/pnpm-expo-helper/util/make-resolver.js.
 */
let resolver;
function getPnpmResolver(extensions, exportsConditionNames, mainFields) {
  if (!resolver) {
    const fileSystem = new CachedInputFileSystem(fs, 4000);

    resolver = ResolverFactory.createResolver({
      fileSystem,
      extensions: extensions.map((extension) => '.' + extension),
      useSyncFileSystemCalls: true,
      modules: [join(workspaceRoot, 'node_modules'), 'node_modules'],
      conditionNames: [
        'native',
        'browser',
        'require',
        'default',
        'react-native',
        'node',
        ...exportsConditionNames,
      ],
      mainFields: ['react-native', 'browser', 'main', ...mainFields],
      aliasFields: ['browser'],
    });
  }

  return resolver;
}

async function withNxMetro(userConfig, opts = {}) {
  const extensions = ['', 'ts', 'tsx', 'js', 'jsx', 'json'];
  if (opts.debug) process.env.NX_REACT_NATIVE_DEBUG = 'true';
  if (opts.extensions) extensions.push(...opts.extensions);

  let watchFolders = readdirSync(workspaceRoot)
    .filter((fileName) => !['dist', 'e2e'].includes(fileName) && !fileName.startsWith('.'))
    .map((fileName) => join(workspaceRoot, fileName))
    .filter((filePath) => statSync(filePath).isDirectory());

  if (opts.watchFolders?.length) {
    watchFolders = watchFolders.concat(opts.watchFolders);
  }

  watchFolders = [...new Set(watchFolders)].filter((folder) => existsSync(folder));

  const nxConfig = {
    resolver: {
      resolveRequest: getResolveRequest(
        extensions,
        opts.exportsConditionNames,
        opts.mainFields
      ),
      nodeModulesPaths: [join(workspaceRoot, 'node_modules')],
    },
    watchFolders,
  };

  return mergeConfig(userConfig, nxConfig);
}

module.exports = withNxMetro
