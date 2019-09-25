const Koa = require('koa');
const { ApolloServer } = require('apollo-server-koa');
const KoaBody = require('koa-body');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { db, router, auth, cors, env } = require('./middleware');

const app = new Koa();

app.use(env());
app.use(db());
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
      db: ctx.db
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
