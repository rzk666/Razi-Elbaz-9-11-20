const SERVER_PROTOCOL = process.env.REACT_APP_SERVER_PROTOCOL;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

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
    weatherApi: 'q4KARGiRRhZ409UDQrU8gdQAOgsaHnpS',
    googleMaps: 'AIzaSyAFgNymaVaMnIGULfPPMNuNUpO6pqLvbIc',
  },
};

export default config;
