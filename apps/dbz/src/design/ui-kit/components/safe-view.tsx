import type { NativeSafeAreaViewProps } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

type SafeViewProps = NativeSafeAreaViewProps;

/**
 * A view that is safe to render at the root of the app.
 *
 * The `edges` prop allows you to specify which edges of the screen should be
 * considered safe. For example, if you want to render a tab bar at the bottom
 * of the screen, you can use `edges={['bottom']}`. If you want to render a
 * navigation bar at the top of the screen, you can use `edges={['top']}`.
 *
 * @param props The props for the component.
 * @param children The children to render.
 * @param edges The edges of the screen to consider safe.
 * @returns The safe view.
 */
export const SafeView = ({ children, edges = [] }: SafeViewProps) => {
  return (
    <SafeAreaView edges={edges} className="flex flex-1">
      {children}
    </SafeAreaView>
  );
};
