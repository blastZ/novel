const config = require('../config/policies');

module.exports = name => {
  return async (ctx, next) => {
    const defaultPolices = config['*'];
    const policies = config[name];
    let proceed = false;

    if (policies) {
      if (Array.isArray(policies)) {
        for (let name of policies) {
          proceed = await require(`../api/policies/${name}`)(ctx);
          if (!proceed) break;
        }
      }

      if (typeof policies == 'boolean') {
        if (policies) {
          proceed = true;
        }
      }
    } else {
      for (let name of defaultPolices) {
        proceed = await require(`../api/policies/${name}`)(ctx);
        if (!proceed) break;
      }
    }

    proceed && (await next());
  };
};
