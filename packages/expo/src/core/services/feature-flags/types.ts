type TValue = string | number | boolean | null;

export type FlagOptions = 'is-maintenance-mode' | 'last-supported-app-version' | 'my-custom-flag';
export type TraitOptions =
  | 'user-trait-1'
  | 'user-trait-2'
  | 'user-trait-3'
  | 'app-version'
  | 'os-name'
  | 'os-version';

export type DefaultFlagValue = { id?: number; enabled: boolean; value?: TValue };
