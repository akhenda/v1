import { beforeAll, describe, expect, it, vitest } from 'vitest';
import { options } from './example.js';

describe('env/mobile', () => {
  it('gets mobile envs & constants from config', async () => {
    const getConfig = await import('./index.js');
    const config = getConfig.default(options);
    const { env, constants } = config;

    // Constants
    expect(constants.persistNavigation).toBe('never');
    expect(constants.catchErrors).toBe('always');

    // Env Accessors
    expect(env.isProduction).toBe(false);
    expect(env.isPreview).toBe(false);
    expect(env.isDev).toBe(true);
    expect(env.isDevBundle).toBe(true);
    expect(env.isProdBundle).toBe(false);

    // Env Variables
    expect(env.EXPO_PUBLIC_ADMIN_EMAIL).toBe('admin@example.com');
    expect(env.EXPO_PUBLIC_USE_REACTOTRON).toBe(true);
    expect(env.EXPO_PUBLIC_USE_REDUX_DEV_TOOLS).toBe(true);
    expect(env.EXPO_PUBLIC_USE_REDUX_LOGGER).toBe(true);
    expect(env.EXPO_PUBLIC_USE_ZUSTAND_DEV_TOOLS).toBe(true);
  });

  describe('when __DEV__ is false', () => {
    beforeAll(() => {
      vitest.resetModules();

      global.__DEV__ = false;

      process.env.EXPO_PUBLIC_USE_REACTOTRON = '0';
      process.env.EXPO_PUBLIC_USE_REDUX_DEV_TOOLS = '0';
      process.env.EXPO_PUBLIC_USE_REDUX_LOGGER = '0';
      process.env.EXPO_PUBLIC_USE_ZUSTAND_DEV_TOOLS = 'false';
    });

    it('gets mobile envs & constants from config', async () => {
      const getConfig = await import('./index.js');
      const config = getConfig.default(options);
      const { env, constants } = config;

      // Constants
      expect(constants.persistNavigation).toBe('never');
      expect(constants.catchErrors).toBe('always');

      // Env Accessors
      expect(env.isProduction).toBe(false);
      expect(env.isPreview).toBe(false);
      expect(env.isDev).toBe(true);
      expect(env.isDevBundle).toBe(false);
      expect(env.isProdBundle).toBe(true);

      // Env Variables
      expect(env.EXPO_PUBLIC_ADMIN_EMAIL).toBe('admin@example.com');
      expect(env.EXPO_PUBLIC_USE_REACTOTRON).toBe(false);
      expect(env.EXPO_PUBLIC_USE_REDUX_DEV_TOOLS).toBe(false);
      expect(env.EXPO_PUBLIC_USE_REDUX_LOGGER).toBe(false);
      expect(env.EXPO_PUBLIC_USE_ZUSTAND_DEV_TOOLS).toBe(false);
    });
  });
});
