const GOPAMOJA_ENV = {
  production: {
    api: 'https://frontend.api.gopamoja.com/9',
    images: 'https://gopamoja.com/images',
    auth: 'https://auth.gopamoja.com',
  },
  staging: {
    api: 'https://test.frontend.api.gopamoja.com/9',
    images: 'https://test.gopamoja.com/images',
    auth: 'https://test.auth.gopamoja.com',
  },
  development: {
    api: 'http://192.168.43.82:3001/9',
    // api: 'http://192.168.43.82:3001/8',
    images: 'https://test.gopamoja.com/images',
    auth: 'https://192.168.43.82:3001',
  }
};

export const CONFIG = GOPAMOJA_ENV['development'];
