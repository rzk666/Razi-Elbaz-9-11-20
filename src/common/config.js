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
    url: `${SERVER_PROTOCOL}://${SERVER_HOST}/`,
  },
};

export default config;
