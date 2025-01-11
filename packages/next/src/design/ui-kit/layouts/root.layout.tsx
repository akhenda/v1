import type { PropsWithChildren } from 'react';

import { bootstrapServices } from '@/core/services/bootstrap';

export default async function RootLayout({ children }: PropsWithChildren) {
  await bootstrapServices();

  return <>{children}</>;
}
