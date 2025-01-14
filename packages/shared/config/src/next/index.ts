import type { ExperimentalRuntimeEnv, NextEnvOptions, ZodEnvSchema } from '../types.js';

import * as constants from './constants.js';
import getEnv from './env.js';

/**
 * Retrieves the configuration object for the Next.js environment.
 *
 * This function utilizes the provided options to validate and access
 * the environment variables, returning an object containing constants
 * and the validated environment variables.
 *
 * @typeParam TServer - The schema for server-side environment variables.
 * @typeParam TClient - The schema for client-side environment variables.
 * @typeParam TShared - The schema for shared environment variables.
 * @typeParam TExperimentalRuntimeEnv - The schema for experimental runtime environment variables.
 * @param options - The environment options that include server, client, shared, and experimental runtime environments.
 * @returns An object with constants and the validated environment variables.
 */

function getConfig<
  TServer extends ZodEnvSchema,
  TClient extends ZodEnvSchema,
  TShared extends ZodEnvSchema,
  TExperimentalRuntimeEnv extends ExperimentalRuntimeEnv,
>(options: NextEnvOptions<TServer, TClient, TShared, TExperimentalRuntimeEnv>) {
  return { constants, env: getEnv(options) };
}

export default getConfig;
