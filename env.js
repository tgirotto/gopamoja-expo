const GOPAMOJA_ENV = {
  production: {
    api: 'https://api.gopamoja.com/7',
    auth: 'https://auth.gopamoja.com',
  },
  staging: {
    api: 'https://test.api.gopamoja.com/7',
    auth: 'https://test.auth.gopamoja.com',
  },
  development: {
    api: 'http://192.168.43.82:3001/8',
    auth: 'https://192.168.43.82:3001',
  }
};

export const CONFIG = GOPAMOJA_ENV['development'];
