import type { Doc } from '@v1/convex/_generated/dataModel';

export type User = Doc<'users'> & { avatarUrl?: string };
