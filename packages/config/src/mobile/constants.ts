export const isDev = __DEV__;
export const bundleIdRegex = /^com\.[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.[dev|prod|preview|rc]+$/;

export interface BaseConfig {
  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: 'always' | 'dev' | 'prod' | 'never';

  /**
   * This is the environment that the app bundle is currently running in
   */
  bundleEnv: 'development' | 'production';

  /**
   * This is a list of all the route names that will exit the app if the
   * back button is pressed while in that screen. Only affects Android.
   */
  exitRoutes: string[];

  /**
   * This feature is particularly useful in development mode, but
   * can be used in production as well if you prefer.
   */
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';
}

const constants: BaseConfig = {
  catchErrors: 'always',
  exitRoutes: ['Welcome', 'Home'],
  persistNavigation: 'never',
  bundleEnv: isDev ? 'development' : 'production',
};

export default constants;
