const { gql } = require('apollo-server-koa');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    books: [Book]!
  }

  type Book {
    id: ID!
    name: String!
    category: String
    status: String
    thumb: String
    desc: String
    author: String
    updatedAt: String
    latest: Chapter
    chapters: [Chapter]
  }

  type Chapter {
    id: ID!
    bookId: ID!
    name: String!
    content: String
  }

  type TopBook {
    category: String!
    top: Book!
    list: [Book!]!
  }

  type Query {
    user: User!
    book(id: ID!): Book
    chapter(id: ID!, bookId: ID!): Chapter
    books(keyword: String): [Book]!
    topBooks: [TopBook!]!
  }
`;
