import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import React from 'react';

import type { PropsWithClassName } from '@v1/types';

import { useLikedCharacters } from '@/core/storage';
import { AvatarGroup } from '@/design/ui-kit/components/avatar-group';

cssInterop(Image, { className: 'style' });

export function CharacterGroup({ className, limit = 4 }: PropsWithClassName & { limit?: number }) {
  const { characters } = useLikedCharacters();

  return (
    <AvatarGroup
      avatarUrls={characters.map((character) => character.image).reverse()}
      title="Characters"
      limit={limit}
      className={className}
      contentFit="contain"
    />
  );
}
