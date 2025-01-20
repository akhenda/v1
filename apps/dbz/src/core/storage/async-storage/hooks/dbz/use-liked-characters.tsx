import { type PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import {
  type Character,
  clearLikedCharacters as clearLikedCharactersStorage,
  deleteLikedCharacter as deleteLikedCharacterStorage,
  getLikedCharacters as getLikedCharactersStorage,
  setLikedCharacters as setLikedCharactersStorage,
} from '../../items/dbz';

/**
 * Custom hook for managing the user's favorite characters.
 *
 * @returns An object containing the following properties:
 * - `characters`: An array of characters that have been marked as favorites.
 * - `like`: A function to add a character to the user's favorites.
 * - `unlike`: A function to remove a character from the user's favorites.
 * - `clear`: A function to clear all characters from the user's favorites.
 */
function useDBZLikedCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  /**
   * Retrieves the user's favorite characters from storage.
   */
  async function getFavoutiteCharacters() {
    const faves = await getLikedCharactersStorage();
    setCharacters(faves);
  }

  /**
   * Sets the user's favorite characters.
   *
   * @param faves An array of favorite characters to save.
   */
  async function setLikedCharacters(faves: Character[]) {
    await setLikedCharactersStorage(faves);
    setCharacters(faves);
  }

  /**
   * Adds a character to the user's favorites.
   *
   * @param character The character to add to favorites.
   */
  async function like(character: Character) {
    await setLikedCharacters([...characters, character]);
  }

  /**
   * Removes a character from the user's favorites.
   *
   * @param id The ID of the character to remove from favorites.
   */
  async function unlike(id: number) {
    await deleteLikedCharacterStorage(id);
    await getFavoutiteCharacters();
  }

  useEffect(() => {
    getFavoutiteCharacters();
  }, []);

  return { characters, like, unlike, clear: clearLikedCharactersStorage };
}

/**
 * A context for managing the user's favorite characters.
 */
const LikedCharactersContext = createContext<ReturnType<typeof useDBZLikedCharacters> | null>(null);

/**
 * A provider component for the `LikedCharactersContext`.
 *
 * @param children The children components to render.
 */
export const LikedCharactersProvider = ({ children }: PropsWithChildren) => {
  const value = useDBZLikedCharacters();

  return (
    <LikedCharactersContext.Provider value={value}>{children}</LikedCharactersContext.Provider>
  );
};

/**
 * A hook for accessing the `LikedCharactersContext`.
 *
 * @throws {Error} If the `LikedCharactersProvider` is not a parent of the component
 *   calling this hook.
 */
export function useLikedCharacters() {
  const value = useContext(LikedCharactersContext);

  if (!value) throw new Error('Missing LikedCharactersProvider');

  return value;
}
