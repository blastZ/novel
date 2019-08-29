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
      const book = await require('./controllers/book/biqiuge/get')(id);

      return book;
    },
    books: async (parent, args, ctx) => {
      const { keyword } = args;
      if (keyword) {
        const books = await require('./controllers/book/biquge/search')(keyword);
        return books;
      }
    },
    topBooks: async (_, __, ctx) => {
      const books = await require('./controllers/book/biqiuge/list')(ctx);
      return books;
    }
  }
};
