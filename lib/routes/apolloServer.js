const { ApolloServer, gql } = require('apollo-server-express');

const path = require('path');
const filePath = path.join(__dirname, '../../tests/generateData.js');
const data = require(filePath)();

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    avatar: String
  }

  type Todo {
    id: ID!
    title: String
    order: Int
    completed: Boolean
    createdAt: String
  }

  type Post {
    uuid: ID!
    userId: Int
    title: String
    createdAt: String
  }

  type Comment {
    uuid: ID!
    postId: Int
    userId: Int
    title: String
    createdAt: String
  }

  type Query {
    me: User
    users(page: Int, limit: Int): [User]
    todos(page: Int, limit: Int): [Todo]
    posts(page: Int, limit: Int): [Post]
    comments(page: Int, limit: Int): [Comment]
    hello: String
  }
`;

function paginate(array, page_number = 1, page_size = 5) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    users: (user, args) => paginate(data.users, args.page, args.limit),
    todos: (todo, args) => paginate(data.todos, args.page, args.limit),
    posts: (post, args) => paginate(data.posts, args.page, args.limit),
    comments: (user, args) => paginate(data.comments, args.page, args.limit),
    hello: () => 'Hello world!'
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = {
  apolloServer
};
