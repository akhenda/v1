import { PostHog, PostHogProvider } from 'posthog-react-native';
import type { PostHogPersistedProperty } from 'posthog-react-native/lib/posthog-core/src';
import type { PropsWithChildren } from 'react';

import { NoOp, logger, noop } from '../utils.js';

import type { Config, ExpoPostHogProviderProps, SetData, TrackedUser } from './types.js';

/* Setup */

function init({ apiKey, apiHost }: Config) {
  try {
    const client = new PostHog(apiKey, { host: apiHost });

    return client;
  } catch (error) {
    logger.error(error, 'Failed to initialize PostHog');
  }

  return;
}

/**
 * On program exit, call shutdown to stop pending pollers and flush any
 * remaining events
 *
 * @param client
 */
function shutdown(client: PostHog) {
  client.shutdown();
}

function reset(client: PostHog, propertiesToKeep?: PostHogPersistedProperty[]) {
  client.reset(propertiesToKeep);
}

/* User related */

// TODO(prod): Add user properties

/**
 * Identifies a user and sets their associated traits in PostHog.
 *
 * This function uses the `identify` method of the PostHog client to associate
 * the provided distinct identifier with the user and optionally sets or sets once
 * their traits.
 *
 * Best practices when using identify
 *
 * 1. Call identify as soon as you're able to
 *
 * In your frontend, you should call identify as soon as you're able to. Typically, this is every
 * time your app loads for the first time, and directly after your users log in. This ensures that
 * events sent during your users' sessions are correctly associated with them.
 * You only need to call identify once per session.
 *
 * 2. Use unique strings for distinct IDs
 *
 * If two users have the same distinct ID, their data is merged and they are considered one user in
 * PostHog. Two common ways this can happen are:
 * - Your logic for generating IDs does not generate sufficiently strong IDs and you can end up
 *   with a clash where 2 users have the same ID.
 * - There's a bug, typo, or mistake in your code leading to most or all users being identified
 *   with generic IDs like null, true, or distinctId.
 * PostHog also has built-in protections to stop the most common distinct ID mistakes.
 *
 * 3. Reset after logout
 *
 * If a user logs out on your frontend, you should call reset() to unlink any future events made on
 * that device with that user.
 * This is important if your users are sharing a computer, as otherwise all of those users are
 * grouped together into a single user due to shared cookies between sessions. We strongly
 * recommend you call reset on logout even if you don't expect users to share a computer.
 *
 * @param {PostHog} client - The PostHog client instance.
 * @param {string} distinctId - The user's unique identifier.
 * @param {SetData} [setData] - Optional data to set for the user.
 * @param {SetData} [setOnceData] - Optional data to set once for the user.
 */
function identifyUser(
  client: PostHog,
  user: TrackedUser,

  /** $set_once data (optional) */
  setOnceData?: SetData,
) {
  const { id, firstName, lastName, email } = user;

  client.identify(id, { firstName, lastName, email }, setOnceData);
}

/* Properties */

function setUserProperty<T extends string>(
  client: PostHog,
  propertyName: T,
  propertyValue: string,
) {
  client.capture('$set', { $set: { [propertyName]: [propertyValue] } });
}

function unsetUserProperty<T extends string>(client: PostHog, propertyName: T) {
  client.capture('$unset', { $unset: [propertyName] });
}

/* Events */

function trackEvent<T extends string>(client: PostHog, eventName: T, properties?: SetData) {
  client.capture(eventName, { ...properties });
}

function trackPageView(client: PostHog) {
  client.capture('$pageview');
}

export function ExpoPostHogProvider({ children, host, apiKey }: ExpoPostHogProviderProps) {
  return (
    <PostHogProvider apiKey={apiKey} options={{ host }} autocapture>
      {children}
    </PostHogProvider>
  );
}

export function setupAnalytics<
  PropertyNames extends string = string,
  EventNames extends string = string,
>(config: Config, env: { isProd: boolean }) {
  const client = init(config);

  if (!env.isProd || !client) {
    return {
      reset: noop,
      setUserId: noop,
      setUser: noop,
      setUserProperty: noop,
      unsetUserProperty: noop,
      trackEvent: noop,
      shutdown: noop,
      PostHogProvider: NoOp,
      ExpoPostHogProvider: NoOp,
    };
  }

  trackEvent(client, 'analytics-lib-init');

  return {
    shutdown: () => shutdown(client),
    reset: (propertiesToKeep?: PostHogPersistedProperty[]) => reset(client, propertiesToKeep),
    identifyUser: (user: TrackedUser, onceData?: SetData) => identifyUser(client, user, onceData),
    trackPageView: () => trackPageView(client),
    setUserProperty: (prop: PropertyNames, value: string) => setUserProperty(client, prop, value),
    unsetUserProperty: (property: PropertyNames) => unsetUserProperty(client, property),
    trackEvent: (name: EventNames, properties?: SetData) => trackEvent(client, name, properties),
    ExpoPostHogProvider: ({ children }: PropsWithChildren) => (
      <ExpoPostHogProvider host={config.apiHost} apiKey={config.apiKey}>
        {children}
      </ExpoPostHogProvider>
    ),
    PostHogProvider,
  };
}
