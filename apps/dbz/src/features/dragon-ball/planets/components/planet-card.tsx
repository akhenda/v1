import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import type { Planet } from '@/core/api/endpoints/dragon-ball';
import { useColorScheme } from '@/design/lib/hooks/use-color-scheme';
import { Heart } from '@/design/lib/icons/Heart';
import { Text } from '@/design/ui-kit/components/ui/text';
import { ToggleIcon } from '@/design/ui-kit/components/ui/toggle';

cssInterop(Image, { className: 'style' });
cssInterop(LinearGradient, { className: 'style' });

type PlanetCardProps = {
  planet: Planet;
  fave: boolean;
  like: (planet: Pick<Planet, 'id' | 'name' | 'image'>) => void;
  unlike: (id: number) => void;
};

const lightGradient = ['transparent', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.95)'] as const;
const darkGradient = ['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.95)'] as const;

export function PlanetCard({ planet, fave = false, like, unlike }: PlanetCardProps) {
  const { colorScheme: theme } = useColorScheme();
  const heartIconFillColor = useMemo(() => (fave ? 'red' : 'white'), [fave]);
  const gradient = useMemo(() => (theme === 'light' ? lightGradient : darkGradient), [theme]);

  if (!planet) return <Text>Loading...</Text>;

  const toggleLike = () => {
    return fave
      ? unlike(planet!.id)
      : like({ id: planet.id, name: planet.name, image: planet.image });
  };

  return (
    <View className="h-72 w-full flex-1 overflow-auto rounded-[20] shadow shadow-primary/40">
      <View className="relative h-full w-full">
        <LinearGradient
          colors={gradient}
          locations={[0.3, 0.7, 1]}
          className="absolute top-0 right-0 bottom-0 left-0 z-20 h-full w-full flex-1 rounded-[20]"
        />
        <Image
          source={{ uri: planet.image }}
          className="z-10 h-full w-full rounded-[20]"
          contentFit="cover"
        />
        <ToggleIcon
          icon={Heart}
          className="absolute top-3 right-3 z-40 text-red-700 dark:text-red-200"
          size={28}
          fill={heartIconFillColor}
          onPress={toggleLike}
          strokeWidth={1}
        />
        <View className="absolute bottom-0 z-30 w-full flex-row rounded-br-[20] rounded-bl-[20] p-5">
          <View>
            <Text className="font-extrabold text-2xl text-primary">
              {planet.name} {planet.isDestroyed && String.fromCodePoint(0x1f4a5)}
            </Text>
            <Text className="line-clamp-2 font-normal text-accent-foreground text-md opacity-55">
              {planet.description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
