// Config
import config from './config';
// Utils
import HttpRequest from '../utils/HttpRequest';

export const getLocationInfo = (key) => HttpRequest()({
  method: 'get',
  url: `${config.api.url}/locations/v1/${key}?apikey=${config.credentials.weatherApi}`,
});

export const searchCities = (query) => HttpRequest()({
  method: 'get',
  url: `${config.api.url}/locations/v1/cities/autocomplete?apikey=${config.credentials.weatherApi}&q=${query}`,
});

export const getWeatherByKey = (key) => HttpRequest()({
  method: 'get',
  url: `${config.api.url}/currentconditions/v1/${key}?apikey=${config.credentials.weatherApi}`,
});

export const fetchByGeoLocation = (lat, lng) => HttpRequest()({
  method: 'get',
  url: `${config.api.url}/locations/v1/cities/geoposition/search?apikey=${config.credentials.weatherApi}&q=${lat},${lng}`,
});
