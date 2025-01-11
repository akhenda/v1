import 'react-i18next';

import type en from '../resources/en.json';

// https://www.geodev.me/blog/type-check-translation-keys/
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'app';
    resources: { app: typeof en };
  }
}
