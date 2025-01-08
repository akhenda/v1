/**
 * Provides methods for interacting with the Attribution service.
 *
 * You can use Appsflyer or Branch.io
 *
 * @see https://help.branch.io/developers-hub/docs/react-native-basic-integration
 * @see https://dev.appsflyer.com/hc/docs/react-native-plugin
 */
export const Attribution = {
  /**
   * Initialize the attribution service.
   *
   * This is called once on app launch and is used to set up the attribution service.
   * It is an asynchronous function, so it returns a promise.
   *
   * @returns {Promise<void>}
   */
  async init() {},

  /**
   * Listen for deep links that trigger app installs.
   *
   * This should be called once the attribution service is initialized.
   *
   * @returns {Promise<void>}
   */
  listenForDeepLinks() {},

  /**
   * Handles the install attribution process.
   *
   * This function is responsible for processing and managing the attribution
   * data received when an app install is detected. It's typically used to
   * attribute the source of app installs, such as ad campaigns or referrals.
   *
   * Make sure to call this function after the attribution service
   * has been initialized.
   */
  handleInstallAttribution() {},

  /**
   * Sets the invite ID for the current user.
   *
   * This function can be used to set the invite ID for the current user
   * when an invite link is shared. The invite ID should be a unique
   * identifier for the user who is sharing the invite link.
   *
   * @param {string} inviteId - The invite ID to set for the current user.
   */
  setInviteId() {},

  /**
   * Generates an invite link for the current user.
   *
   * This method creates a unique invite link that can be shared with others
   * to join the app. The invite link typically includes information about
   * the referring user and any associated rewards or promotions.
   *
   * @returns {Promise<string>} A promise that resolves with the generated invite link.
   */
  getInviteLink() {},

  /**
   * Tracks an event in the attribution service.
   *
   * This function should be used to track events that are relevant
   * to attribution, such as user signups, purchases, or other
   * conversion events.
   *
   * @param {string} eventName - The name of the event to track.
   * @param {Record<string, unknown>} [properties] - Additional event properties.
   */
  trackEvent() {},

  /**
   * Tracks revenue in the attribution service.
   *
   * This function should be used to track revenue-related events,
   * such as purchases or subscriptions, in the attribution service.
   * It helps in attributing revenue to specific campaigns, sources,
   * or user actions.
   *
   * Ensure that this function is called after initializing the
   * attribution service and relevant revenue events occur in the app.
   */
  trackRevenue() {},
};
