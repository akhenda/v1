/**
 * Configuration for the web environment.
 *
 * Refs:
 *  - T3 Env (https://github.com/t3-oss/t3-env)
 *  - Next-ZodEnv (https://github.com/morinokami/next-zodenv/tree/main#nextjs)
 *  - Envalid (https://github.com/af/envalid)
 */
import { createEnv } from '@t3-oss/env-core';

import type { NextServerEnvSchema } from '../types.js';
import { getEnvWithAccessors } from '../utils.js';

function getEnv<TServer extends NextServerEnvSchema>(server: TServer) {
  return getEnvWithAccessors(
    createEnv<undefined, TServer>({
      server,

      /**
       * What object holds the environment variables at runtime. This is usually
       * `process.env` or `import.meta.env`.
       */
      runtimeEnv: process.env,

      /**
       * By default, this library will feed the environment variables directly to
       * the Zod validator.
       *
       * This means that if you have an empty string for a value that is supposed
       * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
       * it as a type mismatch violation. Additionally, if you have an empty string
       * for a value that is supposed to be a string with a default value (e.g.
       * `DOMAIN=` in an ".env" file), the default value will never be applied.
       *
       * In order to solve these issues, we recommend that all new projects
       * explicitly specify this option as true.
       */
      emptyStringAsUndefined: true,
    }),
  );
}

export default getEnv;
