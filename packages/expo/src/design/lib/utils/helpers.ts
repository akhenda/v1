import type { ReactNode } from 'react';
import type { PressableStateCallbackType } from 'react-native';

/**
 * Checks if children are text (i.e. strings).
 *
 * @param children - Can be either a ReactNode or a function that takes a
 * PressableStateCallbackType and returns a ReactNode.
 * @returns Whether the children are text.
 */
export function isTextChildren(
  children: ReactNode | ((state: PressableStateCallbackType) => ReactNode),
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}
