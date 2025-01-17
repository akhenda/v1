/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { COLORS } from '../constants';

import { useColorScheme } from './use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof COLORS.light & keyof typeof COLORS.dark,
) {
  const theme = useColorScheme().colorScheme ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) return colorFromProps;

  return COLORS[theme][colorName];
}
