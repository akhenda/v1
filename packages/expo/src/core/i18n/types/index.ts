import type { config } from '../../constants';

export type SupportedLocales = typeof config.supportedLocales;
export type SupportedLocale = SupportedLocales[number];
