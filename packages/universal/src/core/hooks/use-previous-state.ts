import { useEffect, useRef } from 'react';

/**
 * Custom React hook that stores the previous state of a given value.
 *
 * @typeParam T - The type of the value being tracked.
 * @param value - The current value whose previous state is to be tracked.
 * @returns The previous state of the given value.
 */
export const usePreviousState = <T>(value: T) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
