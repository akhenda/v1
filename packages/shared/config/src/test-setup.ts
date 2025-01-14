import { afterAll } from 'vitest';

const oldEnv = process.env;

global.__DEV__ = true;

process.env = {
  // Make a copy
  ...oldEnv,
  ENV: 'test',
  NODE_ENV: 'test',

  PORT: '3000',
  API_KEY: 'fake_api_key',
  SECRET_KEY: 'fake_secret_key',
  CLERK_HOSTNAME: 'clerk.dev',
  CLERK_WEBHOOK_SECRET: 'fake_webhook_secret',
  VERCEL_URL: 'fake_url.vercel.com',

  PUBLIC_ENV: 'test',
  PUBLIC_CLERK_PUBLISHABLE_KEY: 'fake_publishable_key',
  PUBLIC_CONVEX_URL: 'fake_convex_url',

  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'fake_publishable_key',
  NEXT_PUBLIC_CONVEX_URL: 'fake_convex_url',
  NEXT_PUBLIC_OPENPANEL_CLIENT_ID: 'fake_client_id',
  NEXT_PUBLIC_SENTRY_DSN: 'fake_sentry_dsn',

  EAS_PROJECT_ID: 'fake_eas_project_id',
  EXPO_ACCOUNT_OWNER: 'fake_account_owner',
  EXPO_PUBLIC_APP_NAME: 'fake_app_name',
  EXPO_PUBLIC_APP_SCHEME: 'testApp',
  EXPO_PUBLIC_APP_BUNDLE_ID: 'com.testApp',
  EXPO_PUBLIC_APP_PACKAGE: 'com.testApp',
  EXPO_PUBLIC_API_URL: 'http://localhost:3000',
  EXPO_PUBLIC_USE_REACTOTRON: '1',
  EXPO_PUBLIC_USE_REDUX_DEV_TOOLS: 'true',
  EXPO_PUBLIC_USE_REDUX_LOGGER: '1',
  EXPO_PUBLIC_USE_ZUSTAND_DEV_TOOLS: 'true',
};

afterAll(() => {
  // Restore old environment
  process.env = oldEnv;

  // biome-ignore lint/performance/noDelete: no problem for this one
  delete global.__DEV__;
});
