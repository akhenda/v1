/**
 * Note that we do not gitignore these files. Unlike on web servers, just because
 * these are not checked into your repo doesn't mean that they are secure.
 * In fact, you're shipping a JavaScript bundle with every
 * config variable in plain text. Anyone who downloads your app can easily
 * extract them.
 *
 * If you doubt this, just bundle your app, and then go look at the bundle and
 * search it for one of your config variable values. You'll find it there.
 *
 * Read more here: https://reactnative.dev/docs/security#storing-sensitive-info
 */
import type { ExpoEnvOptions, ZodEnvSchema } from '../types.js';

import constants from './constants.js';
import getEnv from './env.js';

/**
 * Retrieves the configuration object for the mobile environment.
 *
 * This function utilizes the provided options to validate and access
 * the environment variables, returning an object containing constants
 * and the validated environment variables.
 *
 * @typeParam TClient - The schema for client-side environment variables.
 * @typeParam TShared - The schema for shared environment variables.
 * @param options - The environment options that include client and shared environments.
 * @returns An object with constants and the validated environment variables.
 */
function getConfig<TClient extends ZodEnvSchema, TShared extends ZodEnvSchema>(
  options: ExpoEnvOptions<TClient, TShared>,
) {
  return { constants, env: getEnv(options) };
}

export default getConfig;
