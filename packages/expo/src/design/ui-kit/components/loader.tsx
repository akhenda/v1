import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

type LoaderProps = { delay?: number; size?: 'large' | 'small' };

const SMALL_SIZE = 20;
const LARGE_SIZE = 36;
const DEFAULT_DELAY = 500;

/**
 * A component that displays an `ActivityIndicator` after a certain delay.
 *
 * Useful for showing a loading state when the content is taking some time to load.
 *
 * Props:
 * - `delay`: The delay in milliseconds before showing the loading state. Defaults to 500ms.
 * - `size`: The size of the `ActivityIndicator`. Can be 'large' or 'small'. Defaults to 'large'.
 *
 * Returns a View component with the height of the `ActivityIndicator` and an `ActivityIndicator`
 * if the loading state is true.
 */
export const Loader = ({ delay = DEFAULT_DELAY, size = 'large' }: LoaderProps) => {
  const [isShowingLoading, setIsShowingLoading] = useState(false);

  const minHeight = size === 'large' ? LARGE_SIZE : SMALL_SIZE;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowingLoading(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  if (isShowingLoading) return <ActivityIndicator size={size} />;

  return <View className={`h-[${minHeight}]`} />;
};
