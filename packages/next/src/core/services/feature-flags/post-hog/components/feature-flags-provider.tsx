import { NoOp } from '@/design/lib/utils';

/**
 * A do-nothing component to be used as a drop-in replacement for `FlagsmithProvider`
 * when the Flagsmith library is not available.
 *
 * @returns A do-nothing component.
 */
export const FeatureFlagsProvider = NoOp;
