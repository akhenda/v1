const R = require('remeda');
const z = require('zod');

const { expoAppVariants, getConfig } = require('@v1/config/mobile');

const packageJSON = require('./package.json');

const BUNDLE_ID = 'com.v1'; // ios bundle id
const PACKAGE = 'com.v1'; // android package name
const NAME = 'Version One'; // app name
const SLUG = R.toKebabCase('Version One'); // the app slug
const EXPO_ACCOUNT_OWNER = 'v1'; // expo account owner
const EAS_PROJECT_ID = '1211212'; // eas project id
const SCHEME = 'v1'; // app scheme

/**
 * @see https://docs.expo.dev/guides/using-config/#environment-variables
 *
 * Expo app client env vars
 */
const expoAppClientEnvSchema = {
  // APP INFO
  EXPO_PUBLIC_APP_NAME: z.string().describe('The mobile app name').optional().default(NAME),
  EXPO_PUBLIC_APP_SLUG: z.string().describe('The mobile app name slug').optional().default(SLUG),
  EXPO_PUBLIC_APP_SCHEME: z.string().describe('App scheme').optional().default(SCHEME),
  EXPO_PUBLIC_APP_BUNDLE_ID: z.string().describe('iOS bundle ID').optional().default(BUNDLE_ID),
  EXPO_PUBLIC_APP_PACKAGE: z.string().describe('Android package name').optional().default(PACKAGE),
  EXPO_PUBLIC_APP_VERSION: z
    .string()
    .describe('The mobile app version')
    .optional()
    .default(packageJSON.version),

  // SDKs
  EXPO_PUBLIC_SENTRY_DSN: z.string(),
  EXPO_PUBLIC_POST_HOG_API_KEY: z.string(),

  // ADD YOUR CLIENT ENV VARS HERE
  EXPO_PUBLIC_API_BASE_URL: z.string(),
  EXPO_PUBLIC_VAR_NUMBER: z.coerce.number(),
  EXPO_PUBLIC_VAR_BOOL: z
    .string()
    // only allow "true" or "false"
    .refine((s) => s === 'true' || s === 'false')
    // transform to boolean
    .transform((s) => s === 'true'),
};

/**
 * @see https://docs.expo.dev/guides/using-config/#environment-variables
 *
 * Shared env vars
 */
const sharedEnvSchema = {
  APP_VARIANT: z.enum(expoAppVariants).default('development'),
  EXPO_ACCOUNT_OWNER: z
    .string()
    .describe('Expo account owner')
    .optional()
    .default(EXPO_ACCOUNT_OWNER),
  EAS_PROJECT_ID: z.string().describe('Expo EAS project ID').optional().default(EAS_PROJECT_ID),

  // ADD YOUR BUILD TIME ENV VARS HERE
  SECRET_KEY: z.string().optional().default('secret'),
};

/**
 * Given a variant and a name, returns the name with an environment suffix.
 * For example, `withEnvSuffix('production', 'com.example')` returns `'com.example'`,
 * `withEnvSuffix('preview', 'com.example')` returns `'com.example.rc'`, and
 * `withEnvSuffix('development', 'com.example')` returns `'com.example.dev'`.
 *
 * @param {typeof expoAppVariants[number]} variant The app variant.
 * @param {string} text The name to append the suffix to.
 * @returns {string} The name with the suffix.
 */
function withEnvSuffix(variant, text) {
  const suffix = { production: '', preview: 'rc', development: 'dev' }[variant];

  return variant === 'production' ? text : `${text}.${suffix}`;
}

const config = getConfig({ client: expoAppClientEnvSchema, shared: sharedEnvSchema });

/**
 * @typedef {Object} Config
 * @property {typeof config.env} Env
 * @property {typeof config.constants} Constants
 * @property {typeof expoAppClientEnvSchema} expoAppClientEnvSchema
 * @property {typeof sharedEnvSchema} sharedEnvSchema
 * @property {typeof withEnvSuffix} withEnvSuffix
 */

module.exports.Env = config.env;
module.exports.Constants = config.constants;
module.exports.expoAppClientEnvSchema = expoAppClientEnvSchema;
module.exports.sharedEnvSchema = sharedEnvSchema;
module.exports.withEnvSuffix = withEnvSuffix;
