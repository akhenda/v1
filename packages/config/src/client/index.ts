import type { ClientEnvSchema } from '../types.js';

import * as constants from './constants.js';
import getEnv from './env.js';

/**
 * Retrieves the configuration object for the client environment.
 *
 * This function utilizes the provided options to validate and access the
 * environment variables, returning an object containing constants and the
 * validated environment variables.
 *
 * @typeParam TClient - The schema for client-side environment variables.
 * @param options - The environment options that include client environment variables.
 * @returns An object with constants and the validated environment variables.
 */
function getConfig<T extends ClientEnvSchema>(schema: T) {
  return { constants, env: getEnv(schema) };
}

export default getConfig;
