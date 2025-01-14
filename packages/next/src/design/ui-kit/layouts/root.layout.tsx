import type { PropsWithChildren } from 'react';

import { bootstrapServices } from '../../../core/services/bootstrap';

import '../global.css';

export default async function RootLayout({ children }: PropsWithChildren) {
  await bootstrapServices();

  return <>{children}</>;
}
