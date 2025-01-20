import { type PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import {
  type Planet,
  clearLikedPlanets as clearLikedPlanetsStorage,
  deleteLikedPlanet as deleteLikedPlanetStorage,
  getLikedPlanets as getLikedPlanetsStorage,
  setLikedPlanets as setLikedPlanetsStorage,
} from '../../items/dbz';

/**
 * Custom hook for managing the user's favorite planets.
 *
 * @returns An object containing the following properties:
 * - `planets`: An array of planets that have been marked as favorites.
 * - `like`: A function to add a planet to the user's favorites.
 * - `unlike`: A function to remove a planet from the user's favorites.
 * - `clear`: A function to clear all planets from the user's favorites.
 */
function useDBZLikedPlanets() {
  const [planets, setPlanets] = useState<Planet[]>([]);

  /**
   * Retrieves the user's favorite planets from storage.
   */
  async function getLikedPlanets() {
    const faves = await getLikedPlanetsStorage();
    setPlanets(faves);
  }

  /**
   * Sets the user's favorite planets.
   *
   * @param faves An array of favorite planets to save.
   */
  async function setLikedPlanets(faves: Planet[]) {
    await setLikedPlanetsStorage(faves);
    setPlanets(faves);
  }

  /**
   * Adds a planet to the user's favorites.
   *
   * @param planet The planet to add to favorites.
   */
  async function like(planet: Planet) {
    await setLikedPlanets([...planets, planet]);
  }

  /**
   * Removes a planet from the user's favorites.
   *
   * @param id The ID of the planet to remove from favorites.
   */
  async function unlike(id: number) {
    await deleteLikedPlanetStorage(id);
    await getLikedPlanets();
  }

  useEffect(() => {
    getLikedPlanets();
  }, []);

  return { planets, like, unlike, clear: clearLikedPlanetsStorage };
}

/**
 * A context for managing the user's favorite planets.
 */
const LikedPlanetsContext = createContext<ReturnType<typeof useDBZLikedPlanets> | null>(null);

/**
 * A provider component for the `LikedPlanetsContext`.
 *
 * @param children The children components to render.
 */
export const LikedPlanetsProvider = ({ children }: PropsWithChildren) => {
  const value = useDBZLikedPlanets();

  return <LikedPlanetsContext.Provider value={value}>{children}</LikedPlanetsContext.Provider>;
};

/**
 * A hook for accessing the `LikedPlanetsContext`.
 *
 * @throws {Error} If the `LikedPlanetsProvider` is not a parent of the component
 *   calling this hook.
 */
export function useLikedPlanets() {
  const value = useContext(LikedPlanetsContext);

  if (!value) throw new Error('Missing LikedPlanetsProvider');

  return value;
}
