// https://medium.com/@barisberkemalkoc/axios-interceptor-intelligent-db46653b7303
import assert from 'node:assert';
import Axios, { type InternalAxiosRequestConfig } from 'axios';

import { config } from '@/core/constants';
import { logger } from '@/core/observability';
import { sessionTokenStorage } from '@/core/storage';

assert(config.apiURL, 'env variable not set: apiURL');

/**
 * Returns a promise that resolves with a new session token after a 1 second delay.
 * NOTE: This is a placeholder, you should replace it with your actual token refresh logic.
 * @returns a promise that resolves with a new session token
 */
function refreshToken() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('new token');
    }, 1000);
  });
}

/**
 * Axios request interceptor that adds an Authorization header with a Bearer token
 * from the session token storage if it exists.
 *
 * @param {InternalAxiosRequestConfig} config - Axios request config
 * @returns {InternalAxiosRequestConfig} - Modified Axios request config
 */
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const authToken = sessionTokenStorage.getItem();

  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;

  return config;
}

/**
 * Handles errors in the request interceptor.
 * @param {unknown} error - the error from the request interceptor
 * @returns {Promise<never>} - a rejected promise with the error
 */
function authRequestInterceptorError(error: unknown) {
  // Do something with request error
  return Promise.reject(error);
}

/**
 * Axios response interceptor that logs errors and their responses.
 * @param {Error & { response: Response }} error - the error from the response interceptor
 * @returns {Promise<never>} - a rejected promise with the error
 */
function errorResponseInterceptor(error: Error & { response: Response }) {
  const status = error.response ? error.response.status : null;

  if (status === 401) {
    // Handle unauthorized access
    logger.error(error, 'Unauthorized access', {
      userMessage: { title: 'Unauthorized', message: 'Access denied' },
    });
  } else if (status === 404) {
    // Handle not found errors
    logger.error(error, 'Not found', {
      userMessage: { title: '404', message: 'Resource not found' },
    });
  } else {
    // Handle other errors
    logger.error(error, 'An error occurred', {
      userMessage: { title: 'Error', message: 'An error occurred' },
    });
  }

  return Promise.reject(error);
}

/**
 * Axios response interceptor that handles 401 Unauthorized responses by refreshing the user's auth token.
 * @param {Error & { response: Response; config: InternalAxiosRequestConfig }} error - the error from the response interceptor
 * @returns {Promise<AxiosResponse | never>} - a resolved promise with the response of the retried request, or a rejected promise with the error
 */
async function refreshAuthTokenInterceptor(
  error: Error & { response: Response; config: InternalAxiosRequestConfig },
) {
  if (error.response.status === 401) {
    // Refresh the token
    const newToken = await refreshToken();

    // Store the new token
    sessionTokenStorage.setItem(newToken);

    // Retry the original request
    return axios(error.config);
  }

  return Promise.reject(error);
}

export const axios = Axios.create({ baseURL: config.apiURL });

axios.interceptors.request.use(authRequestInterceptor, authRequestInterceptorError);
axios.interceptors.response.use((res) => res, errorResponseInterceptor);
axios.interceptors.response.use((res) => res, refreshAuthTokenInterceptor);
