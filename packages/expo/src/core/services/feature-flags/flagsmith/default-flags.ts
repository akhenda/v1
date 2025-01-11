import type { DefaultFlagValue, FlagOptions } from '../types';

/**
 * Default feature flag values
 */
export const defaultFlags: Record<FlagOptions, DefaultFlagValue> = {
  'is-maintenance-mode': { enabled: false },
  'last-supported-app-version': { enabled: true, value: '1.0.0' },
  'my-custom-flag': { enabled: false },
};
