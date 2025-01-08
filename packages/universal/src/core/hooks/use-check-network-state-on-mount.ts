import * as Network from 'expo-network';

import { ONE_SECOND } from '@/core/constants';
import { ErrorMonitoring } from '@/core/observability';
import { sleep } from '@/core/utils';
import { Toaster } from '@/design/ui-kit/components/toaster';

import { useOnMount } from './use-on-mount';

/**
 * Checks the network state to determine if the internet is reachable.
 * If the internet is not reachable, displays a toaster notification
 * informing the user about the lack of internet connection.
 * The check is delayed by one second to allow for network initialization.
 */
export const useCheckNetworkStateOnMount = () => {
  const checkNetworkState = async () => {
    await sleep(ONE_SECOND);

    const { isInternetReachable } = await Network.getNetworkStateAsync();

    if (!isInternetReachable) {
      Toaster.show({
        type: 'info',
        text1: 'No internet connection',
        text2: 'Please check your internet connection. The app might not work properly without it.',
      });
    }
  };

  useOnMount(() => {
    checkNetworkState().catch(() => {
      ErrorMonitoring.breadcrumbs({
        category: 'network',
        type: 'network',
        message: 'Failed to check network state',
      });
    });
  });
};
