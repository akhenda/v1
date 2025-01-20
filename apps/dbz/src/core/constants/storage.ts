/**
 * storage keys
 */
export const STORAGE_KEYS = {
  app: { id: 'app-storage', locale: 'app.locale' },
  dbz: {
    id: 'dragon-ball-z-storage',
    collected: 'dragon-ball-z.collected',
    usable: 'dragon-ball-z.usable',
    likedPlanets: 'dragon-ball-z.liked-planets',
    likedCharacters: 'dragon-ball-z.liked-characters',
  },
  featureFlag: { id: 'feature-flag-storage' },
  query: { id: 'query-storage', client: 'query.client' },
  session: { id: 'session-storage', token: 'session.token' },
  store: { id: 'store-storage' },
} as const;
