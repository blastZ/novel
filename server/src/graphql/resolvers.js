const ObjectId = require('mongodb').ObjectId;

const getBook = require('../graphql/controllers/book/get');

module.exports = {
  Query: {
    user: async (parent, args, ctx) => {
      const { userInfo, db } = ctx;

      const books = await db
        .collection('book')
        .find({ userId: ObjectId(userInfo.id) })
        .toArray();

      return {
        id: userInfo.id,
        name: userInfo.name,
        books: books.map(o => ({
          id: o.bookId,
          name: o.name,
          chapters: []
        }))
      };
    },
    book: async (parent, args, ctx) => {
      const { id } = args;

      const book = await getBook(id, { sourceId: 0 }, ctx.db);

      return book;
    },
    chapter: async (parent, args, ctx) => {
      const { id, bookId } = args;
      const chapter = await require('./controllers/chapter/get')(
        id,
        bookId,
        {
          sourceId: 0
        },
        ctx.db
      );

      return chapter;
    },
    books: async (parent, args, ctx) => {
      const { keyword } = args;
      if (keyword) {
        const books = await require('./controllers/book/search')(keyword);
        return books;
      }
    },
    topBooks: async (parent, args, ctx) => {
      const data = await ctx.db.collection('topBooks').findOne({
        sourceId: 0
      });

      if (data) {
        return data.topBooks;
      }

      const books = await require('./controllers/book/list')({
        sourceId: 0
      });

      await ctx.db.collection('topBooks').insertOne({
        sourceId: 0,
        topBooks: books
      });

      return books;
    }
  },
  Chapter: {
    content: async (parent, args, ctx) => {
      const { id, bookId } = parent;

      const content = (await require('./controllers/chapter/get')(
        id,
        bookId,
        {
          sourceId: 0
        },
        ctx.db
      )).content;

      return content;
    },
    book: async (parent, args, ctx) => {
      const { bookId } = parent;

      const book = await getBook(bookId, { sourceId: 0 }, ctx.db);

      return book;
    }
  }
};
