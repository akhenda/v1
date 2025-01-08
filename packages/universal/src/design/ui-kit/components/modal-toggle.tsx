import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { CircleUserRound } from '@/design/lib/icons';
import { cn } from '@/design/lib/utils';

/**
 * A component that renders a pressable icon which, when pressed, navigates to
 * a modal route. The icon's appearance changes slightly when pressed.
 */
export function ModalToggle() {
  return (
    <Pressable
      onPress={() => {
        router.push('/modal');
      }}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => (
        <View
          className={cn(
            'web:pl-4 aspect-square flex-1 items-end justify-center pt-0.5',
            pressed && 'opacity-70',
          )}
        >
          <CircleUserRound className="text-foreground" size={24} strokeWidth={1.25} />
        </View>
      )}
    </Pressable>
  );
}
