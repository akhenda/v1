import { OpenPanel } from '@openpanel/react-native';

import { logger, noop } from '../utils.js';

import type { Config, Properties, TrackedUser } from './types.js';

/* Setup */

/**
 * Initializes the OpenPanel client with the given configuration.
 * @param {Config} config
 * @return {OpenPanel} The initialized client
 */
function init(config: Config) {
  try {
    const client = new OpenPanel(config);

    return client;
  } catch (error) {
    logger.error(error, 'Failed to initialize OpenPanel');
  }

  return;
}

/* User related */
// TODO(prod): Add user properties

/**
 * Identifies a user in OpenPanel.
 *
 * This function calls the `identify` method of the OpenPanel client with the given
 * user object and optional properties.
 *
 * @param {OpenPanel} client - The OpenPanel client
 * @param {TrackedUser} user
 *   The user object containing the profile ID, first name, last name, and email.
 * @param {Properties} [properties] - The optional user properties
 */
function identifyUser(client: OpenPanel, user: TrackedUser, properties?: Properties) {
  const { profileId, firstName, lastName, email } = user;

  client.identify({
    profileId,
    firstName,
    lastName,
    email,
    properties,
  });
}

/* Events */

/**
 * Tracks an event with OpenPanel.
 *
 * This function calls the `track` method of the OpenPanel client with the given
 * event name and optional properties.
 *
 * @param {OpenPanel} client - The OpenPanel client
 * @param {string} eventName - The name of the event to track
 * @param {Properties} [properties] - The optional event properties
 */
function trackEvent(client: OpenPanel, eventName: string, properties?: Properties) {
  client.track(eventName, { ...properties });
}

/**
 * Tracks a page view event with OpenPanel.
 *
 * This function calls the `screenView` method of the OpenPanel client with the given path.
 *
 * @param {OpenPanel} client - The OpenPanel client
 * @param {string} path - The path of the page to track
 */
function trackPageView(client: OpenPanel, path: string, properties?: Properties) {
  client.screenView(path, properties);
}

export function setupAnalytics(config: Config, env: { isProd: boolean }) {
  const client = init(config);

  if (!env.isProd || !client) return { identifyUser: noop, trackEvent: noop, trackPageView: noop };

  return {
    identifyUser: (user: TrackedUser, properties?: Properties) =>
      identifyUser(client, user, properties),
    trackEvent: (eventName: string, properties?: Properties) =>
      trackEvent(client, eventName, properties),
    trackPageView: (path: string, properties?: Properties) =>
      trackPageView(client, path, properties),
  };
}
