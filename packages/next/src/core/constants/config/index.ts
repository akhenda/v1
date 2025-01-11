import baseConfig from './base';

const { constants: baseConstants, env: baseEnv } = baseConfig;

const Env = baseEnv;

const CONFIG = {
  /**
   * Base global constants
   */
  ...baseConstants,

  /**
   * App-specific constants
   */
  apiURL: Env.EXPO_PUBLIC_API_BASE_URL,

  /**
   * Environment variables
   */
  ...baseEnv,

  /**
   * Services/SDKs
   */
  postHog: {
    apiKey: '',
    // "https://us.i.posthog.com" | "https://eu.i.posthog.com"
    apiHost: 'https://eu.i.posthog.com',
    // "always" | "identified_only"
    personProfiles: 'always', // 'always' to use feature flags with posthog
  },
} as const;

export { baseEnv as ENV };
export default CONFIG;
