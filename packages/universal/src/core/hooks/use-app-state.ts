import { useCallback, useEffect, useState } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';

/**
 * Custom React hook that subscribes to app state changes and triggers
 * callbacks when the app moves to the foreground or background.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {() => void} params.onComingToForeground - Callback function to be called when the app comes to the foreground.
 * @param {() => void} params.onGoingToBackground - Callback function to be called when the app goes to the background.
 * @returns {void}
 */
export const useAppState = ({
  onComingToForeground,
  onGoingToBackground,
}: {
  onComingToForeground: () => void;
  onGoingToBackground: () => void;
}) => {
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      const isComingToForeground = nextAppState === 'active' && appState !== 'active';
      const isGoingToBackground = nextAppState === 'background' && appState !== 'background';

      if (isComingToForeground) onComingToForeground();
      if (isGoingToBackground) onGoingToBackground();

      setAppState(nextAppState);
    },
    [appState, onComingToForeground, onGoingToBackground],
  );

  useEffect(() => {
    const listener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      listener.remove();
    };
  }, [appState, handleAppStateChange]);
};
