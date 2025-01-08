import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import type { Tailwindest } from 'tailwindest';

import { cn } from '@/design/lib/utils';

import { SafeView } from './safe-view';

type ScreenProps = {
  edges?: Edge[];
  children: ReactNode;
  isScrollable?: boolean;
  bg?: Tailwindest['backgroundColor'];
  p?: Tailwindest['padding'];
  testID?: string;
};

/**
 * Screen is a convenience component that wraps a `SafeView` with a full-height
 * `View` and an optional `ScrollView` to provide a basic screen layout.
 *
 * @prop {Edge[]} edges - The edges for which to add safe area insets.
 * @prop {ReactNode} children - The contents of the screen.
 * @prop {boolean} [isScrollable=true] - Whether the screen should be scrollable.
 * @prop {Tailwindest['backgroundColor']} [bg='bg-white'] - The background color of the screen.
 * @prop {Tailwindest['padding']} [p='p-4'] - The padding of the screen.
 * @prop {string} [testID] - Optional test ID for the screen.
 */
export const Screen = (props: ScreenProps) => {
  const { children, edges = [], isScrollable = true, bg = 'bg-white', p = 'p-4', testID } = props;

  return (
    <SafeView edges={edges}>
      <View className={cn(['flex flex-1', bg, p])} testID={testID}>
        {isScrollable ? <ScrollView>{children}</ScrollView> : children}
      </View>
    </SafeView>
  );
};
