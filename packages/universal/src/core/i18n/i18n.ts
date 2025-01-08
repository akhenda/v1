import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { config } from '@/core/constants';

import { resources } from './resources';
import { languageDetector } from './utils/language-detector';

export const i18n = i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    debug: false,
    ns: ['app'],
    defaultNS: 'app',
    fallbackLng: config.defaultLocale,
    supportedLngs: config.supportedLocales,
    nonExplicitSupportedLngs: true,
    resources,
    load: 'languageOnly',

    // nsSeparator: false,
    // keySeparator: 'false',
    // interpolation: {
    //   escapeValue: false,
    //   // migration fix: maintain old behavior
    //   skipOnVariables: false,
    //   format(value, format) {
    //     if (format === 'uppercase' && typeof value === 'string') return value.toUpperCase();
    //     if (format === 'lowercase' && typeof value === 'string') return value.toLowerCase();

    //     return value;
    //   },
    // },
    // react: {
    //   // useSuspense: false,
    // },
    // migration fix: maintain old behavior
    compatibilityJSON: 'v4',
  });
