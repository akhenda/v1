/**
 * Uses https://restcountries.com
 *
 * Base URL: https://restcountries.com/v3.1
 */
import type { Country } from './types';

import { client } from '@/core/api/config';

const BASE_URL = 'https://restcountries.com/v3.1';
const ENDPOINT = '/region';

client.setBaseURL(BASE_URL);

/**
 * Get a list of countries in the Africa region.
 *
 * @returns A list of countries in the Africa region.
 */
export async function getCountries() {
  const { data } = await client.get<Country[]>(`${ENDPOINT}/africa`);

  return data;
}
