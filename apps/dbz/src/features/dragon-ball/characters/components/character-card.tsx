import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { RenderCardProps } from 'react-native-swipeable-card-stack';

import type { CharacterListItem } from '@/core/api/endpoints/dragon-ball';
import { useLikedCharacters } from '@/core/storage';
import { Heart } from '@/design/lib/icons/Heart';
import { Info } from '@/design/lib/icons/Info';
import { cn } from '@/design/lib/utils/cn';
import { Text } from '@/design/ui-kit/components/ui/text';
import { ToggleIcon } from '@/design/ui-kit/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/design/ui-kit/components/ui/tooltip';

cssInterop(Image, { className: 'style' });

export type SwipeAction = 'swipe-right' | 'swipe-left';
type Props = RenderCardProps<CharacterListItem>;

export function CharacterCard({ data: character, status }: Props) {
  const { characters: likedCharacters, like, unlike } = useLikedCharacters();
  const liked = useMemo(
    () => likedCharacters.some((c) => c.id === character.id),
    [likedCharacters],
  );
  const heartIconFillColor = useMemo(() => (liked ? 'red' : 'white'), [liked]);
  const toggleLike = () => {
    return liked
      ? unlike(character!.id)
      : like({ id: character.id, name: character.name, image: character.image });
  };

  return (
    <View className="h-full w-full flex-1 p-8 pt-12 pb-8">
      <View className="relative h-full w-full flex-1 self-center rounded-[20] bg-gray-100 shadow">
        <Image
          className="z-10 h-full w-full flex-1 items-center justify-center self-center overflow-hidden rounded-[20] opacity-20"
          source={{ uri: 'https://web.dragonball-api.com/images-compress/89980.webp' }}
          cachePolicy="memory-disk"
        />
        <ToggleIcon
          icon={Heart}
          className="absolute top-3 left-3 z-40 text-red-700 dark:text-red-200"
          size={28}
          strokeWidth={1}
          fill={heartIconFillColor}
          onPress={toggleLike}
        />
        <Image
          source={{ uri: character.image }}
          className={cn(
            'absolute z-20 mt-[-20] h-[85%] w-full opacity-0',
            status === 'current' && 'opacity-100',
          )}
          contentFit="contain"
        />
        <Tooltip delayDuration={150} className="absolute top-4 right-4 z-20">
          <TooltipTrigger className="px-2 pb-0.5 active:opacity-50">
            <Info size={20} strokeWidth={2.5} className="text-primary dark:text-accent" />
          </TooltipTrigger>
          <TooltipContent className="bg-transparent/70 px-4 py-2 shadow">
            <Text className="native:text-lg text-white">Hold to transform</Text>
          </TooltipContent>
        </Tooltip>
        <View className="z-0 w-full flex-row rounded-br-[20] rounded-bl-[20] bg-stone-700 p-5 pt-8">
          <View className="w-[50%]">
            <View>
              <Text className="font-extrabold text-2xl text-white">{character.name}</Text>
              <Text className="font-bold text-green-500 text-lg">
                {character.race} - {character.gender}
              </Text>
            </View>
            <View>
              <Text className="font-bold text-white text-xl">Base KI:</Text>
              <Text className="font-bold text-green-500 text-lg">{character.ki}</Text>
            </View>
          </View>
          <View className="w-[50%]">
            <View>
              <Text className="font-extrabold text-white text-xl">Total KI:</Text>
              <Text className="font-bold text-green-500 text-lg">{character.maxKi}</Text>
            </View>
            <View>
              <Text className="font-bold text-white text-xl">Affiliation:</Text>
              <Text className="font-bold text-green-500 text-lg">{character.affiliation}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
