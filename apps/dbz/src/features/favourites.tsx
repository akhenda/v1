import React from 'react';

import { SafeView } from '@/design/ui-kit/components/safe-view';
import { CharacterGroup, PlanetGroup } from '@/features/dragon-ball';

export const Favourites = () => {
  return (
    <SafeView className="flex flex-1 p-6">
      <PlanetGroup limit={9} className="mb-8" />
      <CharacterGroup limit={9} />
    </SafeView>
  );
};

export default Favourites;
