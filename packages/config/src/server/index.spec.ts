import { describe, expect, it } from 'vitest';

import { serverSchema } from './example.js';
import getConfig from './index.js';

const config = getConfig(serverSchema);
const { env, constants } = config;

describe('env/server', () => {
  it('gets server envs & constants from config', () => {
    // Constants
    expect(constants.useDatadog).toBe(true);

    // Env Accessors
    expect(env.isProd).toBe(false);
    expect(env.isTest).toBe(true);
    expect(env.isDev).toBe(false);

    // Env Variables
    expect(env.ADMIN_EMAIL).toBe('admin@example.com');
  });
});
