const Router = require('@koa/router');

const policy = require('./policy');
const routes = require('../config/routes');

module.exports = app => {
  const router = new Router({
    prefix: '/api/v1'
  });

  Object.keys(routes).map(route => {
    const [method, path] = route.split(' ');
    funcName = routes[route];
    router[method.toLowerCase()](path, policy(funcName), require(`../api/controllers/${funcName}`));
  });

  app.use(router.routes()).use(router.allowedMethods());

  return async (ctx, next) => {
    await next();
  };
};
