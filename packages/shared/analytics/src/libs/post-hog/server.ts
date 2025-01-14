import { PostHog } from 'posthog-node';

import { logger, noop } from '../utils.js';
import type { Config, SetData } from './types.js';

/* Setup */

/**
 * Initializes PostHog with the provided configuration.
 *
 * The PostHog client is created with `flushAt` set to `1` and `flushInterval` set to `0`.
 * This ensures that events are sent immediately and not batched. The client instance is
 * returned, and the caller is responsible for calling await posthog.shutdown() once done.
 *
 * Note: Because server-side functions in Next.js can be short-lived, we set `flushAt` to `1` and
 * `flushInterval` to `0`.
 *
 * - `flushAt` sets how many capture calls we should flush the queue (in one batch).
 * - `flushInterval` sets how many milliseconds we should wait before flushing the queue.
 *    Setting them to the lowest number ensures events are sent immediately and not batched.
 *    We also need to call `await posthog.shutdown()` once done.
 *
 * @param {Config} config - The PostHog configuration.
 * @returns {Promise<PostHog>} A promise that resolves to the PostHog client instance.
 */
function init({ apiKey, apiHost }: Config) {
  try {
    const client = new PostHog(apiKey, { host: apiHost, flushAt: 1, flushInterval: 0 });

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

/* User related */

function setUserId(
  client: PostHog,

  /** Required. User's unique identifier */
  distinctId: string,

  /** the event */
  eventName: string,

  /** $set, optional */
  setData?: SetData,

  /** $set_once, optional */
  setOnceData?: SetData,
) {
  client.capture({
    distinctId,
    event: eventName,
    properties: { $set: { ...setData }, $setOnce: { ...setOnceData } },
  });
}

// TODO(prod): Add user properties

function setUser(
  client: PostHog,
  user: { id: string },

  /** the event */
  eventName: string,

  /** $set, optional */
  setData?: SetData,

  /** $set_once, optional */
  setOnceData?: SetData,
) {
  setUserId(client, user.id, eventName, setData, setOnceData);
}

/* Properties */

function setUserProperty(
  client: PostHog,
  distinctId: string,
  eventName: string,
  propertyName: string,
  propertyValue: string,
) {
  // client.capture('$set', { $set: { [propertyName]: [propertyValue] } });
  setUser(client, { id: distinctId }, eventName, { [propertyName]: propertyValue });
}

function unsetUserProperty(
  client: PostHog,
  distinctId: string,
  eventName: string,
  propertyName: string,
) {
  client.capture({ distinctId, event: eventName, properties: { $unset: [propertyName] } });
}

/* Events */

function trackEvent(client: PostHog, distinctId: string, eventName: string, properties?: SetData) {
  client.capture({ distinctId, event: eventName, properties: { ...properties } });
}

function trackPageView(client: PostHog, distinctId: string, currentUrl: string) {
  client.capture({
    distinctId,
    event: '$pageview',
    properties: { $current_url: currentUrl },
  });
}

export function setupAnalytics({ apiKey, apiHost }: Config, env: { isProd: boolean }) {
  const client = init({ apiKey, apiHost });

  if (!env.isProd || !client) {
    return {
      shutdown: noop,
      reset: noop,
      setUserId: noop,
      setUser: noop,
      trackPageView: noop,
      setUserProperty: noop,
      unsetUserProperty: noop,
      trackEvent: noop,
    };
  }

  return {
    shutdown: () => shutdown(client),
    setUserId: (distinctId: string, eventName: string) => setUserId(client, distinctId, eventName),
    setUser: (user: { id: string }, eventName: string) => setUser(client, user, eventName),
    trackPageView: (distinctId: string, currentUrl: string) =>
      trackPageView(client, distinctId, currentUrl),
    setUserProperty: (
      distinctId: string,
      eventName: string,
      propertyName: string,
      propertyValue: string,
    ) => setUserProperty(client, distinctId, eventName, propertyName, propertyValue),
    unsetUserProperty: (distinctId: string, eventName: string, propertyName: string) =>
      unsetUserProperty(client, distinctId, eventName, propertyName),
    trackEvent: (distinctId: string, eventName: string, properties?: SetData) =>
      trackEvent(client, distinctId, eventName, properties),
  };
}
