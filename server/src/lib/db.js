const MongoClient = require('mongodb').MongoClient;

function Mongo({ connectionURL, user, password, host, port = 27017, dbName }) {
  const url = connectionURL ? connectionURL : `mongodb://${user}:${password}@${host}:${port}`;

  this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  this.client.connect(err => {
    if (err) {
      console.log(err);
    }
    console.log('MongoDB connect successfully');
    this.db = this.client.db(dbName);
  });
}

module.exports = Mongo;
