import type { ReactNode } from 'react';

import type { FlagOptions } from '../../types';
import { useIsFeatureFlagEnabled } from '../hooks/use-is-feature-flag-enabled';

type FeatureFlagSplitterProps = {
  children?: ReactNode;
  ifOn?: ReactNode;
  ifOff?: ReactNode;
  flagKey: FlagOptions;
};

/**
 * A component that splits the rendering of children based on the value of a
 * feature flag.
 *
 * @example
 * <FeatureFlagSplitter flagKey="some-flag">
 *   <div>Some content</div>
 * </FeatureFlagSplitter>
 *
 * @example
 * <FeatureFlagSplitter flagKey="some-flag" ifOn={<div>Some content</div>}>
 *   <div>Some other content</div>
 * </FeatureFlagSplitter>
 *
 * @param {ReactNode} [children] - The children to render if the flag is on.
 * @param {ReactNode} [ifOn] - The content to render if the flag is on. If not
 *   provided, the children will be used.
 * @param {ReactNode} [ifOff] - The content to render if the flag is off. If not
 *   provided, nothing will be rendered.
 * @param {FlagOptions} flagKey - The key of the feature flag to check.
 *
 * @returns {ReactNode} The rendered content.
 */
export function FeatureFlagSplitter({
  children = null,
  ifOn = null,
  ifOff = null,
  flagKey,
}: FeatureFlagSplitterProps) {
  const isEnabled = useIsFeatureFlagEnabled(flagKey);

  if (isEnabled) return children ?? ifOn;

  return ifOff;
}
