import { create } from 'apisauce';

import { config } from '@/core/constants';

import { axios } from './axios';

export const client = create({ axiosInstance: axios, baseURL: config.apiURL });
