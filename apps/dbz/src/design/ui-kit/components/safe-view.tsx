import type { NativeSafeAreaViewProps } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '@/design/lib/utils/cn';

type SafeViewProps = NativeSafeAreaViewProps & { className?: string };

/**
 * A view that is safe to render at the root of the app.
 *
 * The `edges` prop allows you to specify which edges of the screen should be
 * considered safe. For example, if you want to render a tab bar at the bottom
 * of the screen, you can use `edges={['bottom']}`. If you want to render a
 * navigation bar at the top of the screen, you can use `edges={['top']}`.
 *
 * Warning:
 * ---
 * The `react-native-safe-area-context` library also exports a `SafeAreaView`
 * component. While it works on Android, it also has the same issues related to
 * jumpy behavior when animating. So we recommend always using the
 * `useSafeAreaInsets` hook instead and avoid using the `SafeAreaView`
 * component.
 *
 * @see https://reactnavigation.org/docs/handling-safe-area
 * @see https://docs.expo.dev/versions/latest/sdk/safe-area-context/#optimization
 *
 * @param props The props for the component.
 * @param children The children to render.
 * @param edges The edges of the screen to consider safe.
 * @returns The safe view.
 */
export const SafeView = ({ children, edges = [], className }: SafeViewProps) => {
  return (
    <SafeAreaView edges={edges} className={cn('flex flex-1', className)}>
      {children}
    </SafeAreaView>
  );
};
