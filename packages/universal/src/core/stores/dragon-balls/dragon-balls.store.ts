import { createStore } from 'zustand';

export type DragonBallsState = { collected: number; usable?: boolean };
export type DragonBallsActions = { actions: { lose: () => void; collect: () => void } };
export type DragonBallsStore = DragonBallsState & DragonBallsActions;

export const defaultInitState: DragonBallsState = { collected: 0, usable: true };

/**
 * Creates a DragonBalls store using Zustand with initial state and actions.
 *
 * The store manages the state of collected dragon balls and provides actions
 * to lose or collect dragon balls. The number of collected dragon balls cannot
 * drop below 1 or exceed 7.
 *
 * @param initState - The initial state to initialize the store with, defaulting
 *                    to `defaultInitState` if not provided.
 * @returns A Zustand store managing DragonBallsState and DragonBallsActions.
 */
export const createDragonBallsStore = (initState: DragonBallsState = defaultInitState) => {
  return createStore<DragonBallsStore>((set) => ({
    ...initState,
    actions: {
      lose: () =>
        set((state) => ({
          collected: state.collected > 1 ? state.collected - 1 : state.collected,
        })),
      collect: () =>
        set((state) => ({
          collected: state.collected < 7 ? state.collected + 1 : state.collected,
        })),
    },
  }));
};
