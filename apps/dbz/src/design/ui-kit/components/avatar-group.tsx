import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

import { SCREEN_WIDTH } from '@/core/constants';
import { cn } from '@/design/lib';
import { Text } from '@/design/ui-kit/components/ui/text';

import { H4 } from './ui/typography';

cssInterop(Image, { className: 'style' });

export function AvatarGroup({
  avatarUrls = [],
  className,
  title,
  limit = 4,
  contentFit = 'cover',
}: {
  avatarUrls?: string[];
  className?: string;
  limit?: number;
  title?: string;
  contentFit?: 'cover' | 'contain';
}) {
  if (avatarUrls.length === 0 || limit === 0) return null;

  const max = Math.floor((SCREEN_WIDTH - 64) / (80 - 32));
  const computedLimit = Math.min(limit, max);
  const collapsed = avatarUrls.length > computedLimit;

  return (
    <View className={cn('flex max-w-full items-start shadow', className)}>
      {title && <H4 className="mb-4 text-primary">{title}</H4>}
      <View className="max-w-full flex-row rounded-full bg-primary-foreground p-2 shadow shadow-primary/10">
        {avatarUrls.slice(0, computedLimit).map((url, index) => (
          <Image
            key={index}
            className="-mr-8 size-20 rounded-full border-2 border-secondary bg-gray-200 dark:bg-gray-800"
            contentFit={contentFit}
            contentPosition={'top center'}
            source={{ uri: url }}
            alt={`Avatar ${index + 1}`}
          />
        ))}
        {collapsed ? (
          <View className="flex items-center justify-center">
            <Text className="px-12 pr-6 text-center font-bold text-primary text-xl">
              +{avatarUrls.length - computedLimit}
            </Text>
          </View>
        ) : (
          <View className="flex size-8 items-center justify-center" />
        )}
      </View>
    </View>
  );
}
