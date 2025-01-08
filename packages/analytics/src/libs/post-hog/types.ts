import type { PropsWithChildren } from 'react';

export type Config = {
  /**
   * The PostHog API key to use.
   */
  apiKey: string;

  /**
   * The PostHog API host to use.
   *
   * usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
   */
  apiHost: 'https://us.i.posthog.com' | 'https://eu.i.posthog.com';

  /**
   * The
   */
  personProfiles?: 'always' | 'identified_only';
};

export type SetData = Record<string, unknown>;
export type TrackedUser = { id: string; firstName: string; lastName: string; email: string };
export type PostHogConfig = { host: Config['apiHost']; apiKey: Config['apiKey'] };
export type ExpoPostHogProviderProps = PropsWithChildren & PostHogConfig;
export type NextPostHogProviderProps = PropsWithChildren &
  PostHogConfig & { personProfiles: Config['personProfiles'] };
