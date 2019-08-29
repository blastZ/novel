# Mark

## bcrypt

```js
const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
  // Store hash in your password DB.
});

bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
  // res == true
});
```

## mongodb

```js
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://root:admin123@localhost:27017';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (ctx, next) => {
  await client.connect();

  const db = client.db('novel');
  ctx.db = db;

  await next();
};
```

## jwt

```js
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar', iat, exp }, 'shhhhh'); // iat, exp use seconds
var decoded = jwt.verify(token, 'shhhhh');
```

## graphql

### scalar types

- String
- Int
- Float
- Boolean
- ID

## koa

```js
// app
app.use(test());

// test
module.exports = () => {
  // code here only run once in the app start
  return async (ctx, next) => {
    // code here run every time
    await next();
  };
};
```

## cors

app.use(async (ctx, next) => {
ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
ctx.set('Access-Control-Allow-Credentials', true);
ctx.set('Access-Control-Allow-Headers', 'content-type');

await next();
});

需要提到 apollo applyMiddleware 之前，并禁用 apollo 自身的跨域配置，来配合 api 鉴权 router。
