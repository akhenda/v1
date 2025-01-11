import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that merges `tailwind-merge` and `clsx`
 * for better compatibility with NativeWind.
 *
 * @param inputs - A list of class names, or functions that return class names.
 * @returns A merged class name.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
