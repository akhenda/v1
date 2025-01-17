import { create } from 'apisauce';

import { config } from '../../constants';

import { axios } from './axios';

export const client = create({ axiosInstance: axios, baseURL: config.apiURL });
