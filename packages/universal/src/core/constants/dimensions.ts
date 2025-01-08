import { Dimensions } from 'react-native';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export {
  /** The mobile device witdh */
  DEVICE_WIDTH,
  /** The mobile device height */
  DEVICE_HEIGHT,
  /** The screen width */
  SCREEN_WIDTH,
  /** The screen height */
  SCREEN_HEIGHT,
};
