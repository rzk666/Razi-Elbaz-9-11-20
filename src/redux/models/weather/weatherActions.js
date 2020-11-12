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

export const weatherGetData = (data, key, fromClient = false) => ({
  type: WEATHER_GET_DATA,
  data,
  key,
  fromClient,
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
      base: config.api.url,
      endpoint: `/currentconditions/v1/${key}?apikey=${config.credentials.weatherApi}`,
    },
    method: 'get',
    fakeWaitTime: 1250,
    success: (data) => weatherGetData(data, key),
    failure: (data) => weatherHasError(data),
    loader: (data) => weatherIsLoading(data),
  },
}));

export const fetchForecast = (key) => (api({
  type: API,
  payload: {
    url: {
      base: config.api.url,
      endpoint: `/forecasts/v1/daily/5day/${key}?apikey=${config.credentials.weatherApi}`,
    },
    method: 'get',
    fakeWaitTime: 2500,
    success: (data) => forecastGetData(data),
    failure: (data) => weatherHasError(data),
    loader: (data) => forecastIsLoading(data),
  },
}));
