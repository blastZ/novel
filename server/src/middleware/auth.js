const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/custom');

module.exports = () => {
  return async (ctx, next) => {
    const token = ctx.cookies.get('token');

    if (!token) {
      return (ctx.body = {
        success: false,
        message: 'Need Login'
      });
    } else {
      const decoded = jwt.verify(token, jwtSecret);
      ctx.userInfo = {
        id: decoded.id,
        name: decoded.name
      };

      await next();
    }
  };
};
