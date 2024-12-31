import { PostHog, PostHogProvider } from 'posthog-react-native';
import type { PostHogPersistedProperty } from 'posthog-react-native/lib/posthog-core/src';

import { NoOp, logger, noop } from '../utils.js';
import type { Config, ExpoPostHogProviderProps, SetData } from './types.js';

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

function setUserId(
  client: PostHog,

  /** Required. User's unique identifier */
  distinctId: string,

  /** $set, optional */
  setData?: SetData,

  /** $set_once, optional */
  setOnceData?: SetData,
) {
  client.identify(distinctId, setData, setOnceData);
}

// TODO(prod): Add user properties

function setUser(
  client: PostHog,
  user: { id: string },

  /** $set, optional */
  setData?: SetData,

  /** $set_once, optional */
  setOnceData?: SetData,
) {
  setUserId(client, user.id, setData, setOnceData);
}

/* Properties */

function setUserProperty(
  client: PostHog,
  eventName: string,
  propertyName: string,
  propertyValue: string,
) {
  client.capture(eventName, { $set: { [propertyName]: [propertyValue] } });
}

function unsetUserProperty(client: PostHog, eventName: string, propertyName: string) {
  client.capture(eventName, { $unset: [propertyName] });
}

/* Events */

function trackEvent(client: PostHog, eventName: string, properties?: SetData) {
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

export function setupAnalytics(config: Config, env: { isProd: boolean }) {
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
    };
  }

  trackEvent(client, 'app-start');

  return {
    shutdown: () => shutdown(client),
    reset: (propertiesToKeep?: PostHogPersistedProperty[]) => reset(client, propertiesToKeep),
    setUserId: (distinctId: string, setData: SetData, setOnceData?: SetData) =>
      setUserId(client, distinctId, setData, setOnceData),
    setUser: (user: { id: string }, setData: SetData, setOnceData?: SetData) =>
      setUser(client, user, setData, setOnceData),
    trackPageView: () => trackPageView(client),
    setUserProperty: (eventName: string, propertyName: string, propertyValue: string) =>
      setUserProperty(client, eventName, propertyName, propertyValue),
    unsetUserProperty: (eventName: string, propertyName: string) =>
      unsetUserProperty(client, eventName, propertyName),
    trackEvent: (eventName: string, properties?: SetData) =>
      trackEvent(client, eventName, properties),
    PostHogProvider: ExpoPostHogProvider,
    ExpoPostHogProvider,
  };
}
