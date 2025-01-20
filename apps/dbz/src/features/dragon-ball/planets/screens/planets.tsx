import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import React, { Fragment } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { useLikedPlanets } from '@/core/storage';
import { Button } from '@/design/ui-kit/components/ui/button';
import { Text } from '@/design/ui-kit/components/ui/text';

import { SafeView } from '@/design/ui-kit/components/safe-view';
import { useGetInfinitePlanets } from '../api';
import { PlanetCard } from '../components/planet-card';
import { PlanetCardSkeleton } from '../components/planet-card.skeleton';

cssInterop(Image, { className: 'style' });

export function Planets() {
  const { planets: likedPlanets, like, unlike } = useLikedPlanets();
  const {
    data: planets,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePlanets();

  const loadMore = () => hasNextPage && fetchNextPage();

  if (isError) return <Text>Planets not found</Text>;
  if (isLoading)
    return (
      <View className="p-6">
        {Array.from({ length: 3 }, () => null).map((_, index) => (
          <Fragment key={index}>
            <PlanetCardSkeleton />
            <View key={index} className="h-6 w-full" />
          </Fragment>
        ))}
      </View>
    );

  return (
    <SafeView>
      <FlatList
        contentContainerClassName="p-6"
        data={planets?.pages.flatMap((page) => page?.items)}
        keyExtractor={(item, index) => (item?.id ? item?.id?.toString() : index.toString())}
        renderItem={({ item }) => (
          <PlanetCard
            planet={item}
            fave={likedPlanets?.some((planet) => planet.id === item?.id)}
            like={like}
            unlike={unlike}
          />
        )}
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
        ListFooterComponent={() => (
          <View className="items-center justify-center p-12">
            {isFetchingNextPage && <ActivityIndicator />}
            {!hasNextPage && !!planets?.pages.length && (
              <Text className="text-primary text-xl opacity-40">No more planets</Text>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="-min-h-screen-safe-offset-64 h-full w-full flex-1 items-center justify-center gap-y-4">
            <Text className="text-primary text-xl">Planets not found</Text>
            <Button onPress={() => refetch()}>
              <Text>Refresh</Text>
            </Button>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-6" />}
      />
    </SafeView>
  );
}
