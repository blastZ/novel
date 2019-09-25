const local = {
  user: 'root',
  password: 'admin123',
  host: 'localhost',
  port: 27017,
  dbName: 'novel'
};

const production = {
  connectionURL: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00-d9poo.mongodb.net:27017,cluster0-shard-00-01-d9poo.mongodb.net:27017,cluster0-shard-00-02-d9poo.mongodb.net:27017/novel?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`
};

module.exports = production;
