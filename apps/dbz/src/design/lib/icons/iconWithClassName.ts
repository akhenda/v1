import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

/**
 * Enhances a Lucide icon component with class name support for styling.
 *
 * @param icon - The Lucide icon component to be enhanced.
 */
export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: { target: 'style', nativeStyleToProp: { color: true, opacity: true } },
  });
}
