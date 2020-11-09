const svc = {
  getNodeEnv() {
    return process.env;
  },
  getNodeEnvByKey(key) {
    if (!key) throw new Error('Key cannot be null/undefined');
    return process.env[key];
  },
  getNodeEnvMode() {
    return svc.getNodeEnvByKey('NODE_ENV') || 'test';
  },
  isProduction() {
    return svc.getNodeEnvMode() === 'production';
  },
  isDevelopment() {
    return svc.getNodeEnvMode() === 'development';
  },
  isTest() {
    return !svc.getNodeEnvMode() || svc.getNodeEnvMode() === 'test';
  },
  isServer() {
    return !process.browser;
  },
};

export default svc;
