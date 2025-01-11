/**
 * https://tkdodo.eu/blog/zustand-and-react-context
 */
import { type ReactNode, createContext, useContext, useState } from 'react';
import { useStore } from 'zustand';

import { type DragonBallsState, createDragonBallsStore } from './dragon-balls.store';

import { createSelectors } from '../utils';

const DragonBallsStoreContext = createContext<ReturnType<typeof createDragonBallsStore> | null>(
  null,
);

/**
 * Provides a context provider for the DragonBalls store.
 *
 * This component initializes the DragonBalls store with an initial number
 * of collected dragon balls and provides it to its children via React context.
 *
 * @param children - The child components that will have access to the store.
 * @param initialCollected - The initial number of collected dragon balls to
 *                           start the store with.
 */
export const DragonBallsStoreProvider = ({
  children,
  initialCollected,
}: { children: ReactNode; initialCollected: number }) => {
  const [store] = useState(createDragonBallsStore({ collected: initialCollected }));

  return (
    <DragonBallsStoreContext.Provider value={store}>{children}</DragonBallsStoreContext.Provider>
  );
};

/**
 * Retrieves the DragonBalls store from the context and applies the given
 * selector to the store's state.
 *
 * This hook is a wrapper around the `useStore` hook from `zustand` and provides
 * a convenient way to access the DragonBalls store with a selector.
 *
 * @throws Will throw an error if used outside of a DragonBallsStoreProvider.
 * @param selector - A function that takes the store's state and returns a
 *                   value to be returned by the hook.
 * @returns The value returned by the selector.
 */
export function useDragonBallsStore<T>(selector: (state: DragonBallsState) => T) {
  const store = useContext(DragonBallsStoreContext);

  if (!store) throw new Error('Missing DragonBallsStoreProvider');

  return useStore(store, selector);
}

/**
 * Retrieves the `usable` property from the DragonBalls store.
 *
 * This is a boolean that indicates whether the dragon balls can be used.
 *
 * @returns The value of the `usable` property in the store.
 */
export const useUsable = () => useDragonBallsStore((state) => state.usable);

/**
 * Retrieves the `collected` property from the DragonBalls store.
 *
 * This is the number of dragon balls collected by the user.
 *
 * @returns The value of the `collected` property in the store.
 */
export const useCollected = () => useDragonBallsStore((state) => state.collected);

/**
 * Custom hook to access the DragonBalls store with auto-generated selectors.
 *
 * This hook retrieves the DragonBalls store from the context and applies the
 * `createSelectors` utility to generate selectors for accessing the store's
 * state values by their keys.
 *
 * @returns A store with auto-generated selectors for accessing state values.
 * @throws Will throw an error if used outside of a DragonBallsStoreProvider.
 */
export function useDragonBallsStoreWithSelectors() {
  const store = useContext(DragonBallsStoreContext);

  if (!store) throw new Error('Missing DragonBallsStoreProvider');

  return createSelectors(store);
}
