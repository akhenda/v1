import { useState } from 'react';

import { isPromise } from '@/core/utils';

/**
 * @description
 * A hook that wraps a function and adds a boolean to know if the function is resolving a promise.
 * The wrapped function can be called with an argument and will return a promise.
 * If the function is called when it is already resolving a promise, it will do nothing.
 * @param {Object} options - The options object.
 * @param {boolean} [options.isDisabled=false] - If true, the function will not be called.
 * @param {((arg: T) => void) | ((arg: T) => Promise<void>)} [options.onPress=undefined] - The function to be called when the hook is called.
 * @returns {[(arg: T) => Promise<unknown>, boolean]} An array containing the wrapped function and a boolean that is true if the function is resolving a promise.
 */
export const usePress = <T>({
  isDisabled,
  onPress,
}: {
  isDisabled?: boolean;
  onPress?: null | ((arg: T) => void) | ((arg: T) => Promise<void>);
}): [((arg: T) => Promise<unknown>) | null, boolean] => {
  const [isResolving, setIsResolving] = useState<boolean>(false);

  const handlePress = onPress
    ? async (arg: T) => {
        if (onPress == null) return;
        if (typeof onPress === 'function' && !isResolving && !isDisabled) {
          const returnValue = onPress(arg) as unknown;

          if (isPromise(returnValue)) {
            try {
              setIsResolving(true);
              await returnValue;
            } finally {
              setIsResolving(false);
            }
          }
        }
      }
    : null;

  return [handlePress, isResolving];
};
