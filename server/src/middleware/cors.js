const config = require('../config/security');

module.exports = () => {
  const {
    cors: { allowOrigins, allowMethods, allowHeaders, allowCredentials }
  } = config;

  return async (ctx, next) => {
    let origin = ctx.get('Origin');

    if (!allowOrigins.includes(origin)) {
      origin = null;
    }

    if (!origin) return await next();

    if (ctx.method !== 'OPTIONS') {
      await next();

      ctx.set('Access-Control-Allow-Origin', origin);
      ctx.set('Access-Control-Allow-Headers', allowHeaders.join(','));

      if (allowCredentials) {
        ctx.set('Access-Control-Allow-Credentials', true);
      }
    } else {
      if (!ctx.get('Access-Control-Request-Method')) {
        return await next();
      }

      ctx.set('Access-Control-Allow-Origin', origin);
      ctx.set('Access-Control-Allow-Headers', allowHeaders.join(','));

      if (allowCredentials) {
        ctx.set('Access-Control-Allow-Credentials', true);
      }

      if (allowMethods) {
        ctx.set('Access-Control-Allow-Methods', allowMethods.join(','));
      }

      ctx.status = 204;
    }
  };
};
