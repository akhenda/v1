import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server';
import { fetchAction, fetchMutation, fetchQuery } from 'convex/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';

import { api } from '@v1/convex/_generated/api';

export default async function Layout({ children }: PropsWithChildren) {
  const user = await fetchQuery(api.users.getUser, {}, { token: await convexAuthNextjsToken() });
  const checkoutUrl = await fetchAction(
    api.subscriptions.getOnboardingCheckoutUrl,
    {},
    { token: await convexAuthNextjsToken() },
  );

  if (!checkoutUrl) return null;

  if (!user?.subscription && !user?.polarSubscriptionPendingId) {
    await fetchMutation(
      api.subscriptions.setSubscriptionPending,
      {},
      { token: await convexAuthNextjsToken() },
    );

    return redirect(checkoutUrl);
  }

  return (
    <div className="relative flex h-screen w-full bg-card">
      <div className="-translate-x-1/2 absolute top-8 left-1/2 mx-auto transform justify-center">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </div>
      <div className="z-10 h-screen w-screen">{children}</div>
      <div className="base-grid fixed h-screen w-screen opacity-40" />
      <div className="fixed bottom-0 h-screen w-screen bg-gradient-to-t from-[hsl(var(--card))] to-transparent" />
    </div>
  );
}
