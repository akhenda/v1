/**
 * storage keys
 */
export const STORAGE_KEYS = {
  app: { id: 'app-storage', locale: 'app.locale' },
  dragonBalls: { id: 'dragon-balls-storage', collected: 'dragon-balls.collected' },
  featureFlag: { id: 'feature-flag-storage' },
  query: { id: 'query-storage', client: 'query.client' },
  session: { id: 'session-storage', token: 'session.token' },
  store: { id: 'store-storage' },
} as const;
