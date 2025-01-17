import { useEffect } from 'react';

/**
 * Runs a callback once when the component is mounted.
 *
 * This hook is just a shorthand for `useEffect(callback, [])`.
 *
 * @param callback The callback to run once when the component is mounted.
 */
export const useOnMount = (callback: () => void) => {
  useEffect(callback, []);
};
