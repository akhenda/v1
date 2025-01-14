import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { PropsWithChildren } from 'react';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  return <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>;
};
