import { posthog } from 'posthog-js';

import { logger, noop } from '../utils.js';
import type { Config, SetData } from './types.js';

/* Setup */

function init({ apiKey, apiHost, personProfiles }: Config) {
  try {
    posthog.init(apiKey, { api_host: apiHost, person_profiles: personProfiles });

    trackEvent('app-start');
  } catch (error) {
    logger.error(error, 'Failed to initialize PostHog');
  }
}

/**
 * Resets PostHog's state, optionally resetting the device ID.
 *
 * @param {boolean} [resetDeviceId=false] - Whether to reset the device ID.
 */
function reset(resetDeviceId = false) {
  posthog.reset(resetDeviceId);
}

/* User related */

/**
 * Sets the user ID and associated traits.
 *
 * @param {string} id - The user's unique identifier.
 * @param {SetData} [setData] - The user's traits to set.
 * @param {SetData} [setOnceData] - The user's traits to set once.
 */
function setUserId(
  /** Required. User's unique identifier */
  id: string,

  /** $set, optional */
  setData?: SetData,

  /** $set_once, optional */
  setOnceData?: SetData,
) {
  posthog.identify(id, setData, setOnceData);
}

// TODO(prod): Add user properties

/**
 * Sets the user ID and associated traits.
 *
 * @param {Object} user - The user object containing the user's unique identifier.
 * @param {string} user.id - The user's unique identifier.
 * @param {SetData} [setData] - The user's traits to set.
 * @param {SetData} [setOnceData] - The user's traits to set once.
 */
function setUser(
  user: { id: string },

  /** $set, optional */
  setData?: SetData,

  /** $set_once, optional */
  setOnceData?: SetData,
) {
  setUserId(user.id, setData, setOnceData);
}

/* Properties */

/**
 * Sets a user property in PostHog.
 *
 * This function assigns a specified value to a user property identified by the given
 * property name. It uses the `posthog.setPersonProperties` method to update the
 * property for the current user.
 *
 * @param {string} propertyName - The name of the property to set for the user.
 * @param {string} propertyValue - The value to assign to the specified property.
 */
function setUserProperty(propertyName: string, propertyValue: string) {
  // posthog.capture('$set', { $set: { [propertyName]: [propertyValue] } });
  posthog.setPersonProperties({ [propertyName]: propertyValue });
}

/**
 * Removes a user property in PostHog.
 *
 * This function uses the `posthog.capture` method to send an event to PostHog with
 * the `$unset` property set to the specified `propertyName`. This removes the
 * property from the current user.
 *
 * @param {string} [eventName='event_name'] - The name of the event to track.
 * @param {string} propertyName - The name of the property to remove from the user.
 */
function unsetUserProperty(eventName: string, propertyName: string) {
  posthog.capture(eventName, { $unset: [propertyName] });
}

/* Events */
/**
 * Tracks an event with PostHog.
 *
 * This function wraps the `posthog.capture` method to send an event to PostHog. It
 * takes an `eventName` to identify the event and an optional `properties` object
 * to include additional data points about the event. The `properties` object is
 * merged into a single object with the event name and then passed to
 * `posthog.capture`. If no `properties` object is provided, the event name is
 * still sent to PostHog.
 *
 * @param {string} eventName - The name of the event to track.
 * @param {SetData} [properties] - Additional data points to
 * include with the event.
 */
function trackEvent(eventName: string, properties?: SetData) {
  posthog.capture(eventName, { ...properties });
}

/**
 * Tracks a page view event with PostHog.
 *
 * This function sends a `$pageview` event to PostHog using the `posthog.capture`
 * method. It's typically used to log when a user views a page or screen within
 * the application.
 */
function trackPageView() {
  posthog.capture('$pageview');
}

/**
 * Sets up PostHog analytics in the application.
 *
 * This function initializes PostHog with the provided configuration and returns
 * an object with the following methods:
 *
 * - `reset`: Resets the user ID and clears all user properties.
 * - `setUserId`: Sets the user ID to associate with events and page views.
 * - `setUser`: Sets the user properties.
 * - `setUserProperty`: Sets a single property for the current user.
 * - `unsetUserProperty`: Removes a single property from the current user.
 * - `trackEvent`: Tracks an event with PostHog.
 * - `trackPageView`: Tracks a page view event with PostHog.
 *
 * If `env.isProd` is `false`, this function returns an object with no-op methods
 * to disable analytics in development environments.
 *
 * @param {{ apiKey: string; apiHost: string; personProfiles: 'always' | 'identified_only' }} config
 * - The PostHog configuration object.
 * @param {{ isProd: boolean }} env
 * - An object with an `isProd` property indicating if the application is running
 * in a production environment.
 * @returns {Object} An object with the above methods.
 */
export function setupAnalytics(config: Config, env: { isProd: boolean }) {
  init(config);

  if (!env.isProd) {
    return {
      reset: noop,
      setUserId: noop,
      setUser: noop,
      setUserProperty: noop,
      unsetUserProperty: noop,
      trackEvent: noop,
      trackPageView: noop,
    };
  }

  return {
    reset,
    setUserId,
    setUser,
    setUserProperty,
    unsetUserProperty,
    trackEvent,
    trackPageView,
  };
}
