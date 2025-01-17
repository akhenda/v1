import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';

import { Env, withEnvSuffix } from './env';

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_VARIANT !== 'production',
  badges: [
    { text: Env.APP_VARIANT, type: 'banner', color: 'white' },
    { text: Env.EXPO_PUBLIC_APP_VERSION.toString(), type: 'ribbon', color: 'white' },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.EXPO_PUBLIC_APP_NAME,
  slug: Env.EXPO_PUBLIC_APP_SLUG,
  description: `${Env.EXPO_PUBLIC_APP_NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.EXPO_PUBLIC_APP_SCHEME,
  version: Env.EXPO_PUBLIC_APP_VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: withEnvSuffix(Env.APP_VARIANT, Env.EXPO_PUBLIC_APP_BUNDLE_ID),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: withEnvSuffix(Env.APP_VARIANT, Env.EXPO_PUBLIC_APP_PACKAGE),
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  experiments: { typedRoutes: true },
  extra: { ...Env, eas: { projectId: Env.EAS_PROJECT_ID } },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    ['expo-font', { fonts: ['./assets/fonts/Inter.ttf'] }],
    'expo-localization',
    ['app-icon-badge', appIconBadgeConfig],
    ['react-native-edge-to-edge'],
  ],
});
