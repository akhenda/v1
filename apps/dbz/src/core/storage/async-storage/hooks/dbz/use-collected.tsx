import { useEffect, useState } from 'react';

import {
  type DragonBall,
  deleteCollectedBall as deleteCollectedBallStorage,
  getCollected as getCollectedStorage,
  setCollected as setCollectedStorage,
} from '../../items/dbz';

/**
 * Custom hook for managing the user's saved Dragon Balls.
 *
 * @returns An object containing the following properties:
 * - `collected`: An array of Dragon Balls that have been saved.
 * - `setCollected`: A function to set the user's saved Dragon Balls.
 * - `removeCollectedBall`: A function to remove a single Dragon Ball from the list.
 */
export function useDBZCollected() {
  const [collected, setCollected] = useState<DragonBall[]>([]);

  /**
   * Retrieves the user's saved Dragon Balls from storage.
   */
  async function getCollectedBalls() {
    const balls = await getCollectedStorage();

    setCollected(balls);
  }

  /**
   * Sets the user's saved Dragon Balls.
   *
   * @param balls An array of Dragon Balls to save.
   */
  async function setCollectedBalls(balls: DragonBall[]) {
    await setCollectedStorage(balls);

    setCollected(balls);
  }

  /**
   * Removes a Dragon Ball from the user's saved Dragon Balls.
   *
   * @param id The ID of the Dragon Ball to remove.
   */
  async function removeCollectedBall(id: string) {
    await deleteCollectedBallStorage(id);
    await getCollectedBalls();
  }

  useEffect(() => {
    getCollectedBalls();
  }, []);

  return { collected, setCollected: setCollectedBalls, removeCollectedBall };
}
