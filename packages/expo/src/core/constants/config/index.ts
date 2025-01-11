import * as Application from 'expo-application';
import Constants from 'expo-constants';
import baseConfig from './base';

const { constants: baseConstants, env: baseEnv } = baseConfig;

// @ts-expect-error // We know we're passing the correct environment variables
// to `extra` in the specific mobile app `app.config.ts` config file
const Env: typeof baseEnv = Constants.expoConfig?.extra ?? {};

const CONFIG = {
  /**
   * Base global constants
   */
  ...baseConstants,

  /**
   * App-specific constants
   */
  apiURL: Env.EXPO_PUBLIC_API_BASE_URL,
  appName: Application.applicationName,
  appVersion: Application.nativeApplicationVersion,
  buildNumber: Application.nativeBuildVersion,
  bundleId: Application.applicationId,
  debugInAppUpdates: false,
  itunesItemId: '', // TODO(prod): Replace with real iTunes item ID

  /**
   * Environment variables
   */
  ...Env,

  /**
   * Services/SDKs
   */
  openPanel: { clientId: '', clientSecret: '' },
  oneSignal: { appId: '' },
  flagsmith: { key: '' },
  postHog: {
    apiKey: '',
    // "https://us.i.posthog.com" | "https://eu.i.posthog.com"
    apiHost: 'https://eu.i.posthog.com',
    // "always" | "identified_only"
    personProfiles: 'always', // 'always' to use feature flags with posthog
  },
  revenueCat: { appleApiKey: '', androidApiKey: '' },
} as const;

export { baseEnv as ENV };
export default CONFIG;
