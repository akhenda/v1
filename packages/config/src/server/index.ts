import type { NextServerEnvSchema } from '../types.js';

import * as constants from './constants.js';
import getEnv from './env.js';

/**
 * Retrieves the configuration object for the server environment.
 *
 * This function utilizes a Zod schema to validate and access the
 * environment variables, returning an object containing constants
 * and the validated environment variables.
 *
 * @param schema - The Zod schema to validate the environment variables.
 * @returns An object with constants and the validated environment variables.
 */
function getConfig<T extends NextServerEnvSchema>(schema: T) {
  return { constants, env: getEnv(schema) };
}

export default getConfig;
