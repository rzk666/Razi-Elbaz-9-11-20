// Types
import {
  WEATHER_IS_LOADING,
  WEATHER_GET_DATA,
  WEATHER_HAS_ERROR,
} from './weatherTypes';
// API
import { API, api } from '../../api';
// config
import config from '../../../common/config';

export const weatherIsLoading = (isLoading) => ({
  type: WEATHER_IS_LOADING,
  isLoading,
});

export const weatherGetData = (data) => ({
  type: WEATHER_GET_DATA,
  data,
});

export const weatherHasError = (data) => ({
  type: WEATHER_HAS_ERROR,
  data,
});

// We'll set this up later
export const fetchWeather = () => (api({
  type: API,
  payload: {
    url: {
      base: '', // config.api
      endpoint: '',
    },
    method: 'get',
    success: (data) => weatherGetData(data),
    failure: (data) => weatherHasError(data),
    loader: (data) => weatherIsLoading(data),
  },
}));
