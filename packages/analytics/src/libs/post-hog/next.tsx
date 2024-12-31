'use client';

// @ts-ignore
import { usePathname, useSearchParams } from 'next/navigation';
import { posthog } from 'posthog-js';
import { PostHogProvider, usePostHog } from 'posthog-js/react';
import { type ReactNode, useEffect } from 'react';

import { NoOp } from '../utils.js';
import type { Config, NextPostHogProviderProps } from './types.js';

export function NextPostHogProvider({
  children,
  host,
  apiKey,
  personProfiles = 'identified_only',
}: NextPostHogProviderProps) {
  useEffect(() => {
    posthog.init(apiKey, {
      api_host: host,
      person_profiles: personProfiles,
      // Disable automatic pageview capture, as we capture manually
      capture_pageview: false,
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export default function PostHogPageView() {
  const posthog = usePostHog();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      let url = window.origin + pathname;

      if (searchParams.toString()) url = `${url}?${searchParams.toString()}`;

      posthog.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

export function setupAnalytics(
  config: Config,
  env: { isProd: boolean; enablePageViews?: boolean },
) {
  if (!env.isProd) return { PostHogProvider: NoOp, PostHogPageView: NoOp };

  const { apiKey, apiHost, personProfiles } = config;

  return {
    PostHogProvider: ({ children, ...props }: { children: ReactNode }) => (
      <NextPostHogProvider
        apiKey={apiKey}
        host={apiHost}
        personProfiles={personProfiles}
        {...props}
      >
        {env.enablePageViews && <PostHogPageView />}
        {children}
      </NextPostHogProvider>
    ),
    PostHogPageView,
  };
}
