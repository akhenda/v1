import type { PurchasesPackage } from 'react-native-purchases';

export type EntitlementsType = 'pro';

export type PurchasePayload = {
  purchasedPackage: PurchasesPackage;
  entitlement: EntitlementsType;
};
