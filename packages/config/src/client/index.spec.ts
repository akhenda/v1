import { describe, expect, it } from 'vitest';

import config from './index.js';

const { env, constants } = config;

describe('env/client', () => {
  it('gets general client envs & constants from config', () => {
    // Constants
    expect(constants.useJQuery).toBe(false);

    // Env Accessors
    expect(env.isProd).toBe(false);
    expect(env.isTest).toBe(true);
    expect(env.isDev).toBe(false);

    // Env Variables
    expect(env.PUBLIC_ADMIN_EMAIL).toBe('admin@example.com');
  });
});
