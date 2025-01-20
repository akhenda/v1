import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import React from 'react';

import type { PropsWithClassName } from '@v1/types';

import { useLikedPlanets } from '@/core/storage';
import { AvatarGroup } from '@/design/ui-kit/components/avatar-group';

cssInterop(Image, { className: 'style' });

export function PlanetGroup({ className, limit = 4 }: PropsWithClassName & { limit?: number }) {
  const { planets } = useLikedPlanets();

  return (
    <AvatarGroup
      avatarUrls={planets.map((planet) => planet.image).reverse()}
      title="Planets"
      limit={limit}
      className={className}
    />
  );
}
