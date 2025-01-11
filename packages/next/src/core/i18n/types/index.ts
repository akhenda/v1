import type { config } from '@/core/constants';

export type SupportedLocales = typeof config.supportedLocales;
export type SupportedLocale = SupportedLocales[number];
