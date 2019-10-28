require('dotenv').config();

const Koa = require('koa');
const { ApolloServer } = require('apollo-server-koa');
const KoaBody = require('koa-body');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { router, auth, cors } = require('./middleware');
const Mongo = require('./lib/db');
const dbConfig = require('./config/database');

const app = new Koa();
const mongo = new Mongo(dbConfig);

app.use(cors());
app.use(KoaBody());
app.use(router(app));
app.use(auth());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => {
    return {
      userInfo: ctx.userInfo,
      db: mongo.db
    };
  }
});

server.applyMiddleware({
  app,
  cors: false
});

app.listen({ port: 1338 }, () => {
  console.log(`Server ready at http://127.0.0.1:1338${server.graphqlPath}`);
});
