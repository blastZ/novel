const config = require('../config/security');

module.exports = () => {
  const {
    cors: { allowOrigins }
  } = config;

  return async (ctx, next) => {
    const origin = ctx.get('Origin');

    await next();

    if (allowOrigins.includes(origin)) {
      ctx.set('Access-Control-Allow-Origin', origin);
      if (config.cors.allowCredentials) {
        ctx.set('Access-Control-Allow-Credentials', true);
      }
      ctx.set('Access-Control-Allow-Headers', 'content-type');
    }
  };
};
