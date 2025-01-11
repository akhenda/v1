import { osVersion } from 'expo-device';
import type { ReactElement } from 'react';
import flagsmith from 'react-native-flagsmith';
import { FlagsmithProvider } from 'react-native-flagsmith/react';
import type { IFlagsmith } from 'react-native-flagsmith/types';

import { FIFTEEN_MINUTES, IS_IOS, config } from '@/core/constants';
import { featureFlagStorage } from '@/core/storage';

import { defaultFlags } from '../default-flags';

const cacheOptions = { skipAPI: true, ttl: FIFTEEN_MINUTES };

const options: Parameters<IFlagsmith['init']>[0] = {
  environmentID: config.flagsmith.key,
  cacheFlags: true,
  AsyncStorage: featureFlagStorage,
  cacheOptions,
  defaultFlags,

  // TODO(prod): add proper user identity and traits
  identity: 'user-123',
  traits: {
    'user-trait-1': 'value-1',
    'user-trait-2': 2,
    'user-trait-3': true,
    'os-name': IS_IOS ? 'iOS' : 'Android',
    'os-version': osVersion,
    'app-version': config.appVersion || 'Not set',
  },
};

/**
 * Provides flagsmith flags to the application. This component should be used at the very top of the component tree.
 * It uses the AsyncStorage to store the flags locally, so the flags are persisted even after the app is killed.
 * The data is fetched from the server when the app starts, and is then periodically updated in the background.
 *
 * @param children The children components of the FeatureFlagsProvider.
 * @returns The children components wrapped in a FlagsmithProvider.
 */
export const FeatureFlagsProvider = ({ children }: { children: ReactElement }) => {
  return (
    <FlagsmithProvider
      flagsmith={flagsmith}
      options={{
        ...(options as Record<string, unknown>),
        onChange: (_, { isFromServer }) => {
          if (!isFromServer) {
            // Flags are coming from the cache
            // Decide here if we want to force fetch new flags
          }
        },
      }}
    >
      {children}
    </FlagsmithProvider>
  );
};
