import { useCallback, useEffect, useMemo, useState } from 'react';
import { Appearance, useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Hook that returns the current color scheme and methods to set and toggle the color scheme.
 *
 * To support static rendering, this value needs to be re-calculated on the client side for web
 *
 * @returns An object with the following properties:
 * - `colorScheme`: The current color scheme, either 'light' or 'dark'.
 * - `isDarkColorScheme`: A boolean indicating whether the current color scheme is 'dark'.
 * - `setColorScheme`: A function to set the color scheme.
 * - `toggleColorScheme`: A function to toggle the color scheme.
 *
 * If the color scheme is not set, it defaults to 'light'.
 */
export function useColorScheme() {
  const colorScheme = useRNColorScheme();
  const [hasHydrated, setHasHydrated] = useState(false);
  const isDarkColorScheme = useMemo(() => colorScheme === 'dark', [colorScheme]);
  const setColorScheme = Appearance.setColorScheme;
  const toggleColorScheme = useCallback(
    () => Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark'),
    [colorScheme],
  );

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (hasHydrated) return { colorScheme, isDarkColorScheme, setColorScheme, toggleColorScheme };

  return { colorScheme: 'light', isDarkColorScheme, setColorScheme, toggleColorScheme };
}
