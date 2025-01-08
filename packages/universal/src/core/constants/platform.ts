import { Platform } from 'react-native';

/** Returns `true` if the current platform is iOS, `false` otherwise */
export const IS_IOS = Platform.OS === 'ios';

/** Returns `true` if the current platform is Android, `false` otherwise */
export const IS_ANDROID = Platform.OS === 'android';

/** Returns `true` if the current platform is Web, `false` otherwise */
export const IS_WEB = Platform.OS === 'web';
