import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>;
};