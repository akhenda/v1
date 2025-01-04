import { z } from 'zod';

import { expoAppVariants } from '../types.js';
import { withEnvSuffix } from '../utils.js';

export const clientSchema = {
  EXPO_PUBLIC_APP_NAME: z.string().describe('The mobile app name'),
  EXPO_PUBLIC_APP_SCHEME: z.string().describe('App scheme'),
  EXPO_PUBLIC_APP_BUNDLE_ID: z.string().transform(withEnvSuffix).describe('iOS bundle ID'),
  EXPO_PUBLIC_APP_PACKAGE: z.string().transform(withEnvSuffix).describe('Android package name'),

  // ADD YOUR CLIENT ENV VARS HERE
  EXPO_PUBLIC_API_URL: z.string(),
  EXPO_PUBLIC_ADMIN_EMAIL: z.string().email().default('admin@example.com'),

  // COERCED_BOOLEAN: transform to boolean using preferred coercion logic
  EXPO_PUBLIC_USE_REACTOTRON: z.string().transform((s) => s !== 'false' && s !== '0'),
  EXPO_PUBLIC_USE_REDUX_DEV_TOOLS: z.string().transform((s) => s !== 'false' && s !== '0'),
  EXPO_PUBLIC_USE_REDUX_LOGGER: z.string().transform((s) => s !== 'false' && s !== '0'),
  // ONLY_BOOLEAN: https://env.t3.gg/docs/recipes#booleans
  EXPO_PUBLIC_USE_ZUSTAND_DEV_TOOLS: z
    .string()
    // only allow "true" or "false"
    .refine((s) => s === 'true' || s === 'false')
    // transform to boolean
    .transform((s) => s === 'true'),
};

export const sharedSchema = {
  APP_VARIANT: z.enum(expoAppVariants).default('development'),
  EXPO_ACCOUNT_OWNER: z.string().describe('Expo account owner'),
  EAS_PROJECT_ID: z.string().describe('Expo EAS project ID'),

  // ADD YOUR BUILD TIME ENV VARS HERE
  SECRET_KEY: z.string(),
};

export const options = { client: clientSchema, shared: sharedSchema };
