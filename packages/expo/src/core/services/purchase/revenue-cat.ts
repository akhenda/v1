import type { LOG_LEVEL } from 'react-native-purchases';
import RevenueCat from 'react-native-purchases';

import { IS_IOS, config } from '@/core/constants';
import { logger } from '@/core/observability';

import type { PurchasePayload } from './types';

const API_KEY = IS_IOS ? config.revenueCat.appleApiKey : config.revenueCat.androidApiKey;

/**
 * Provides methods for managing in-app purchases using the RevenueCat SDK.
 *
 * @see https://docs.revenuecat.com
 */
export const Purchase = {
  /**
   * Initialize the RevenueCat instance.
   *
   * @example
   * Purchase.init();
   */
  init() {
    RevenueCat.configure({ apiKey: API_KEY });
  },

  /**
   * Sets the logging level for the RevenueCat SDK.
   *
   * @param logLevel - The desired logging level to set.
   * @returns A promise that resolves once the logging level has been set.
   */
  async setLogLevel(logLevel: LOG_LEVEL) {
    await RevenueCat.setLogLevel(logLevel);
  },

  /**
   * Set the current user by providing a unique app user ID.
   *
   * @param appUserID - The app user ID to identify the user.
   * @returns A promise that resolves once the user has been set.
   *
   * @remarks
   * {@link https://docs.revenuecat.com/docs/user-ids#setting-a-user-id}
   */
  async setUser(appUserID: string) {
    await RevenueCat.logIn(appUserID);
  },

  /**
   * Sets custom attributes for the current user.
   *
   * @param attributes - A mapping of attribute names to values.
   * @returns A promise that resolves once the attributes have been set.
   *
   * @remarks
   * {@link https://docs.revenuecat.com/docs/user-ids#setting-custom-user-attributes}
   */
  async setAttributes(attributes: Record<string, string | null>) {
    await RevenueCat.setAttributes(attributes);
  },

  /**
   * Retrieves the customer information for the current user.
   *
   * @returns A promise that resolves with the customer information.
   *
   * @remarks
   * {@link https://docs.revenuecat.com/docs/revenuecat-api#get-customer-info}
   */
  async getUserInformations() {
    return await RevenueCat.getCustomerInfo();
  },

  /**
   * Retrieves the current offerings available for purchase.
   *
   * @returns A promise that resolves with the current offerings.
   *
   * @remarks
   * This method fetches the available offerings from RevenueCat
   * and returns the currently active offering.
   * {@link https://docs.revenuecat.com/docs/offerings}
   */
  async getOfferings() {
    const offerings = await RevenueCat.getOfferings();

    return offerings.current;
  },

  /**
   * Restores any purchases made by the user.
   *
   * @returns A promise that resolves once the purchases have been restored.
   *
   * @remarks
   * {@link https://docs.revenuecat.com/docs/restore}
   */
  async restorePurchases() {
    await RevenueCat.restorePurchases();
  },

  /**
   * Initiates a purchase flow for a given package.
   *
   * @param purchasedPackage - The package to purchase.
   * @param entitlement - The entitlement to check for after the purchase is complete.
   * @returns A promise that resolves with an object describing the success of the purchase.
   *
   * @remarks
   * If the purchase is successful, the returned object will have the
   * `isPurchaseSuccessful` property set to `true`. If the purchase fails,
   * it will be set to `false` and an error will be logged.
   */
  async makePurchase({ purchasedPackage, entitlement }: PurchasePayload) {
    try {
      const { customerInfo } = await RevenueCat.purchasePackage(purchasedPackage);

      if (customerInfo.entitlements.active[entitlement]) return { isPurchaseSuccessful: true };

      return { isPurchaseSuccessful: false };
    } catch (error) {
      const message = 'Failed to purchase package';

      logger.error(error, message, { userMessage: { title: 'Failed', message } });

      return { isPurchaseSuccessful: false };
    }
  },
};
