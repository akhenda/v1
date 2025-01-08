import type { ImageProps } from 'expo-image';
import { Image as ExpoImage } from 'expo-image';

/**
 * A drop-in replacement for React Native's Image component that supports
 * loading and manipulating images on native platforms.
 *
 * @see https://docs.expo.dev/versions/latest/sdk/image/
 */
export const Image = (props: ImageProps) => <ExpoImage {...props} />;
