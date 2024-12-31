import type { ReactNode } from 'react';

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

  personProfiles?: 'always' | 'identified_only';
};

export type SetData = Record<string, unknown>;

export type ExpoPostHogProviderProps = {
  children: ReactNode;
  host: Config['apiHost'];
  apiKey: Config['apiKey'];
};

export type NextPostHogProviderProps = {
  children: ReactNode;
  host: Config['apiHost'];
  apiKey: Config['apiKey'];
  personProfiles: Config['personProfiles'];
};
