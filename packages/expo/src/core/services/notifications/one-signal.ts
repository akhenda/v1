import { OneSignal } from 'react-native-onesignal';

import { config } from '@/core/constants';
import { logger } from '@/core/observability';

/**
 * Provides methods for interacting with the OneSignal library.
 *
 * @see https://documentation.onesignal.com/docs/react-native
 */
export const Notifications = {
  /**
   * Initializes the OneSignal library.
   *
   * @remarks
   * Will automatically opt-in the user to push notifications if they have not
   * previously opted-out.
   */
  init() {
    OneSignal.initialize(config.oneSignal.appId);

    this.watchForNotificationPress();
  },

  /**
   * Identifies the user and sets their ID.
   *
   * @param userId a unique identifier for the user
   */
  setUser(userId: string) {
    OneSignal.login(userId);
  },

  /**
   * Logs out the user from OneSignal.
   *
   * @remarks
   * This should be called when the user logs out of the app.
   */
  removeUser() {
    OneSignal.logout();
  },

  /**
   * Adds an email address to the user's profile in OneSignal.
   *
   * @param email the email address to add
   */
  setUserEmail(email: string) {
    OneSignal.User.addEmail(email);
  },

  /**
   * Removes an email address from the user's profile in OneSignal.
   *
   * @param email the email address to remove
   */
  removeUserEmail(email: string) {
    OneSignal.User.removeEmail(email);
  },

  /**
   * Sets the user's preferred language in OneSignal.
   *
   * @param language the ISO 639-1 language code to use
   */
  setUserLanguage(language: string) {
    OneSignal.User.setLanguage(language);
  },

  /**
   * Adds a tag to the user's profile in OneSignal.
   *
   * @param key the key for the tag
   * @param value the value for the tag
   */
  addTag(key: string, value: string) {
    OneSignal.User.addTag(key, value);
  },

  /**
   * Removes a tag from the user's profile in OneSignal.
   *
   * @param key the key for the tag to remove
   */
  removeTag(key: string) {
    OneSignal.User.removeTag(key);
  },

  /**
   * Disables push notifications for the user. This is a convenience method around
   * OneSignal.User.pushSubscription.optOut().
   *
   * @see https://documentation.onesignal.com/docs/react-native#section--optout-
   */
  optOut() {
    OneSignal.User.pushSubscription.optOut();
  },

  /**
   * Enables push notifications for the user. This is a convenience method around
   * OneSignal.User.pushSubscription.optIn().
   *
   * @see https://documentation.onesignal.com/docs/react-native#section--optin-
   */
  optIn() {
    OneSignal.User.pushSubscription.optIn();
  },

  /**
   * Adds an event listener to OneSignal for when a notification is clicked.
   * The callback logs the event to the console.
   *
   * @see https://documentation.onesignal.com/docs/react-native#section--add-event-listener
   */
  watchForNotificationPress() {
    OneSignal.Notifications.addEventListener('click', (event) => {
      logger.dev('OneSignal: notification clicked:', { event });
    });
  },
};
