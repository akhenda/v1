import { useColorScheme as useNativewindColorScheme } from 'nativewind';

/**
 * Hook that returns the current color scheme and methods to set and toggle the color scheme.
 *
 * @returns An object with the following properties:
 * - `colorScheme`: The current color scheme, either 'light' or 'dark'.
 * - `isDarkColorScheme`: A boolean indicating whether the current color scheme is 'dark'.
 * - `setColorScheme`: A function to set the color scheme.
 * - `toggleColorScheme`: A function to toggle the color scheme.
 *
 * If the color scheme is not set, it defaults to 'dark'.
 */
export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();

  return {
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
