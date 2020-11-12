// Config
import config from './config';
// Utils
import HttpRequest from '../utils/HttpRequest';

// ----- Help Functions ----- //
export const getLocationInfo = (key) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/locations/v1/${key}?apikey=${config.credentials.weatherApi}`,
  url: 'https://testsh.free.beeceptor.com/getlocation',
});

export const searchCities = (query) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/locations/v1/cities/autocomplete?apikey=${config.credentials.weatherApi}&q=${query}`,
  url: 'https://testsh.free.beeceptor.com/getcities',
});

export const getWeatherByKey = (key) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/currentconditions/v1/${key}?apikey=${config.credentials.weatherApi}`,
  url: 'https://testsh.free.beeceptor.com/getweather',
});
