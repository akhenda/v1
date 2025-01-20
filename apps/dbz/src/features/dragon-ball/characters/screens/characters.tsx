import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { SwipeableCardStack, type SwipeableCardStackRef } from 'react-native-swipeable-card-stack';

import type { CharacterListItem } from '@/core/api/endpoints/dragon-ball';
import { logger } from '@/core/observability';
import { SafeView } from '@/design/ui-kit/components/safe-view';
import { Button } from '@/design/ui-kit/components/ui/button';
import { Text } from '@/design/ui-kit/components/ui/text';

import { useGetCharacters } from '../api';
import { CharacterCard } from '../components';

export function Characters() {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState<CharacterListItem[]>([]);

  const ref = useRef<SwipeableCardStackRef>(null);
  const { data: characters, isError, isLoading } = useGetCharacters(page);

  useEffect(() => {
    if (characters?.items && characters.items.length > 0) {
      setCards((prev) => [...prev, ...characters.items]);
    }
  }, [characters]);

  const reloadStack = () => {
    logger.info('Refreshing... 🍸', { page, cards: cards.length });
    setCards([]);
    setPage(1);
  };

  if (isError) return <Text>Characters not found</Text>;
  if (isLoading || !characters || cards.length === 0)
    return (
      <View className="p-6">
        <Text>Loading...</Text>
      </View>
    );

  return (
    <SafeView className="flex-1">
      <View className="absolute top-0 right-0 bottom-0 left-0 items-center justify-center gap-y-4">
        <Text className="text-primary text-xl">No more characters</Text>
        <Text className="mb-6 text-md text-primary">Come back later!</Text>
        <Button onPress={reloadStack}>
          <Text>Refresh</Text>
        </Button>
      </View>
      <SwipeableCardStack
        ref={ref}
        data={cards}
        numberOfRenderedCards={3}
        renderCard={CharacterCard}
        onActiveCardUpdate={({ currentIndex, phase }) => {
          if (phase === 'below-threshold' || phase === 'above-threshold') {
            impactAsync(ImpactFeedbackStyle.Rigid).catch((error: unknown) => {
              logger.error(error, 'Failed to impact');
            });
          }

          if (currentIndex === cards.length - 3 && phase === 'started') setPage((prev) => prev + 1);
        }}
      />
    </SafeView>
  );
}
