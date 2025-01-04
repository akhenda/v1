// https://env.t3.gg/docs/nextjs#validate-schema-on-build-(recommended)
import { createEnv } from '@t3-oss/env-nextjs';

import type {
  NextClientEnvSchema,
  NextEnvOptions,
  NextExperimentalRuntimeEnv,
  NextServerEnvSchema,
  NextSharedEnvSchema,
} from '../types.js';
import { getEnvWithAccessors } from '../utils.js';

function getEnv<
  TServer extends NextServerEnvSchema,
  TClient extends NextClientEnvSchema,
  TShared extends NextSharedEnvSchema,
  TExperimentalRuntimeEnv extends NextExperimentalRuntimeEnv,
>(options: NextEnvOptions<TServer, TClient, TShared, TExperimentalRuntimeEnv>) {
  const { server, client, shared, runtimeEnv } = options;

  return getEnvWithAccessors(
    createEnv<TServer, TClient, TShared>({
      server,
      shared,
      client,

      experimental__runtimeEnv: runtimeEnv,
      skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,

      // Tell the library when we're in a server context.
      isServer: typeof window === 'undefined',

      // Treat empty strings as undefined.
      emptyStringAsUndefined: true,
    }),
  );
}

export default getEnv;
