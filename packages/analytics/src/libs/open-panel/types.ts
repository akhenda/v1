import type { TrackHandlerPayload } from '@openpanel/web';

/**
 * The configuration for the openpanel library
 */
export type Config = {
  /** The url of the openpanel API or your self-hosted instance */
  apiUrl?: string;

  /** The client id of your application */
  clientId: string;

  /** The client secret of your application (only required for server-side events) */
  clientSecret?: string;

  /** A function that will be called before sending an event. If it returns false, the event will not be sent */
  filter?: (event: TrackHandlerPayload) => boolean;

  /** If true, the library will not send any events */
  disabled?: boolean;

  /** If true, the library will wait for the profile to be set before sending events */
  waitForProfile?: boolean;

  /** If true, the library will automatically track screen views (default: false) */
  trackScreenViews?: boolean;

  /** If true, the library will automatically track outgoing links (default: false) */
  trackOutgoingLinks?: boolean;

  /** If true, you can trigger events by using html attributes (<button type="button" data-track="your_event" />) (default: false) */
  trackAttributes?: boolean;
};

export type TrackedUser = {
  profileId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Properties = {
  tier: 'free' | 'pro';
};
