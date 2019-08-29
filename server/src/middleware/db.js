const MongoClient = require('mongodb').MongoClient;

module.exports = config => {
  const { user, password, host, port = 27017, dbName } = config;
  const url = `mongodb://${user}:${password}@${host}:${port}`;

  return async (ctx, next) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();
    } catch (err) {
      return (ctx.body = {
        success: false,
        message: 'Connect database failed'
      });
    }

    const db = client.db(dbName);
    ctx.db = db;

    await next();

    await client.close();
  };
};
