import { describe, expect, it } from 'vitest';

import { options } from './example.js';
import getConfig from './index.js';

const config = getConfig(options);
const { env, constants } = config;

describe('env/next', () => {
  it('gets next.js envs & constants from config', () => {
    // Constants
    expect(constants.useSentry).toBe(false);

    // Env Accessors
    expect(env.isProd).toBe(false);
    expect(env.isTest).toBe(true);
    expect(env.isDev).toBe(false);

    // Env Variables
    expect(env.PORT.toString()).toBe('3000');
    expect(env.VERCEL_URL).not.toBeUndefined();
    expect(env.VERCEL_URL).toContain('fake_url.vercel.com');
    expect(env.NEXT_PUBLIC_CONVEX_URL).toBe('fake_convex_url');
    expect(env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID).toBe('fake_client_id');
    expect(env.NEXT_PUBLIC_SENTRY_DSN).toBe('fake_sentry_dsn');
  });
});
