/**
 * If you want inspiration for your own colors, check out:
 *
 * https://tailwindcss.com/docs/customizing-colors
 * https://ui.jln.dev/
 * https://ui.shadcn.com/themes
 */

import type { Theme } from '@react-navigation/native';
import { Platform } from 'react-native';

/**
 * The font stack to use on web.
 */
const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

/**
 * Navigation Fonts
 */
export const NAV_FONTS = Platform.select({
  web: {
    regular: { fontFamily: WEB_FONT_STACK, fontWeight: '400' },
    medium: { fontFamily: WEB_FONT_STACK, fontWeight: '500' },
    bold: { fontFamily: WEB_FONT_STACK, fontWeight: '600' },
    heavy: { fontFamily: WEB_FONT_STACK, fontWeight: '700' },
  },
  ios: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '600' },
    heavy: { fontFamily: 'System', fontWeight: '700' },
  },
  default: {
    regular: { fontFamily: 'sans-serif', fontWeight: 'normal' },
    medium: { fontFamily: 'sans-serif-medium', fontWeight: 'normal' },
    bold: { fontFamily: 'sans-serif', fontWeight: '600' },
    heavy: { fontFamily: 'sans-serif', fontWeight: '700' },
  },
}) satisfies Theme['fonts'];

/**
 * Navigation Theme
 *
 * If you changed the colors in the global.css file, update the constants.ts
 * file with the new colors. Each color has a commented css variable name next
 * to it.
 */
export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(214.3 31.8% 91.4%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 100% 50%)', // destructive
    primary: 'hsl(222.2 47.4% 11.2%)', // primary
    text: 'hsl(222.2 47.4% 11.2%)', // foreground
  },
  dark: {
    background: 'hsl(224 71% 4%)', // background
    border: 'hsl(216 34% 17%)', // border
    card: 'hsl(224 71% 4%)', // card
    notification: 'hsl(0 63% 31%)', // destructive
    primary: 'hsl(210 40% 98%)', // primary
    text: 'hsl(213 31% 91%)', // foreground
  },
  fonts: NAV_FONTS,
} as const;
