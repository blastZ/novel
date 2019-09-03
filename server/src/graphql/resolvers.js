const ObjectId = require('mongodb').ObjectId;

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
      const book = await require('./controllers/book/get')(id, {
        sourceId: 0
      });

      return book;
    },
    chapter: async (parent, args, ctx) => {
      const { id, bookId } = args;
      const chapter = await require('./controllers/chapter/get')(id, bookId, {
        sourceId: 0
      });

      return chapter;
    },
    books: async (parent, args, ctx) => {
      const { keyword } = args;
      if (keyword) {
        const books = await require('./controllers/book/biquge/search')(keyword);
        return books;
      }
    },
    topBooks: async (parent, args, ctx) => {
      const books = await require('./controllers/book/list')({
        sourceId: 0
      });
      return books;
    }
  },
  Chapter: {
    content: async parent => {
      const { id, bookId } = parent;
      const content = (await require('./controllers/chapter/get')(id, bookId, {
        sourceId: 0
      })).content;

      return content;
    }
  }
};
