const SERVER_PROTOCOL = process.env.REACT_APP_SERVER_PROTOCOL;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const config = {
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  server: {
    host: SERVER_HOST,
    protocol: SERVER_PROTOCOL,
  },
  api: {
    url: `${SERVER_PROTOCOL}://${SERVER_HOST}`,
  },
  credentials: {
    weatherApi: WEATHER_API_KEY,
    googleMaps: MAPS_API_KEY,
  },
};

export default config;
