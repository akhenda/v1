import type { SupportedLocale, SupportedLocales } from '../types.js';

/**
 * Whether to use Sentry
 */
export const useSentry = false;

/**
 * The default locale for the app
 */
export const defaultLocale: SupportedLocale = 'en';

/**
 * The supported locales for the app
 */
export const supportedLocales: SupportedLocales = ['en', 'sw'];
