// Types
import {
  WEATHER_IS_LOADING,
  WEATHER_GET_DATA,
  WEATHER_HAS_ERROR,
  FORECAST_GET_DATA,
  FORECAST_IS_LOADING,
} from './weatherTypes';
// API
import { API, api } from '../../api';
// config
import config from '../../../common/config';

export const weatherIsLoading = (isLoading) => ({
  type: WEATHER_IS_LOADING,
  isLoading,
});

export const forecastIsLoading = (isLoading) => ({
  type: FORECAST_IS_LOADING,
  isLoading,
});

export const weatherGetData = (data) => ({
  type: WEATHER_GET_DATA,
  data,
});

export const forecastGetData = (data) => ({
  type: FORECAST_GET_DATA,
  data,
});

export const weatherHasError = (data) => ({
  type: WEATHER_HAS_ERROR,
  data,
});

export const fetchWeather = (key) => (api({
  type: API,
  payload: {
    url: {
      base: 'https://testsh.free.beeceptor.com/getweather', // config.api
      endpoint: '',
    },
    method: 'get',
    success: (data) => weatherGetData(data),
    failure: (data) => weatherHasError(data),
    loader: (data) => weatherIsLoading(data),
  },
}));

export const fetchForecast = (key) => (api({
  type: API,
  payload: {
    url: {
      base: 'https://testsh.free.beeceptor.com/getforecast', // config.api
      endpoint: '',
    },
    method: 'get',
    success: (data) => forecastGetData(data),
    failure: (data) => weatherHasError(data),
    loader: (data) => forecastIsLoading(data),
  },
}));
