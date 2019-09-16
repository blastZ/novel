const MongoClient = require('mongodb').MongoClient;

const config = require('../config/database');

const { user, password, host, port = 27017, dbName } = config;
const url = `mongodb://${user}:${password}@${host}:${port}`;
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let client = null;

const getClient = async () => {
  if (!client) {
    client = await mongoClient.connect();
  }

  return client;
};

(async () => {
  await getClient();
})();

module.exports = () => {
  return async (ctx, next) => {
    try {
      const client = await getClient();

      const db = client.db(dbName);
      ctx.db = db;

      await next();
    } catch (err) {
      return (ctx.body = {
        success: false,
        message: 'Connect database failed'
      });
    } finally {
      await client.close();
    }
  };
};
