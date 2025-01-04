import { describe, expect, it } from 'vitest';

import { clientSchema } from './example.js';
import getConfig from './index.js';

const config = getConfig(clientSchema);
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
