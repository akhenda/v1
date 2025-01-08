'use client';

// @ts-ignore
import { usePathname, useSearchParams } from 'next/navigation';
import { posthog } from 'posthog-js';
import { PostHogProvider, usePostHog } from 'posthog-js/react';
import { type ReactNode, Suspense, useEffect } from 'react';

import { NoOp } from '../utils.js';
import type { Config, NextPostHogProviderProps } from './types.js';

export function NextPostHogProvider({
  children,
  host,
  apiKey,
  personProfiles = 'always',
}: NextPostHogProviderProps) {
  useEffect(() => {
    posthog.init(apiKey, {
      api_host: host,
      person_profiles: personProfiles,
      // Disable automatic pageview capture, as we capture manually
      capture_pageview: false,
      capture_pageleave: false,
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function PostHogPageView() {
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

/**
 * Wrap this in Suspense to avoid the `useSearchParams` usage above
 * from de-opting the whole app into client-side rendering
 *
 * @see: https://nextjs.org/docs/messages/deopted-into-client-rendering
 */
export default function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
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
        {env.enablePageViews && <SuspendedPostHogPageView />}
        {children}
      </NextPostHogProvider>
    ),
    PostHogPageView,
    SuspendedPostHogPageView,
  };
}
