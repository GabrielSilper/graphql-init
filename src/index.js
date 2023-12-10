const { ApolloServer, gql } = require('apollo-server');
const { randomUUID } = require('node:crypto');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
    getActiveUsers(active: Boolean): [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const usersData = [
  {
    _id: randomUUID(),
    name: 'Gabriel Pereira',
    email: 'gabriel@test.com',
    active: true,
  },
  {
    _id: randomUUID(),
    name: 'Fulano Silva',
    email: 'fulano@test.com',
    active: false,
  },
];

const resolvers = {
  Query: {
    hello: () => 'Hello world',
    users: () => usersData,
    getUserByEmail: (_, args) =>
      usersData.find((user) => user.email === args.email),
    getActiveUsers: (_, args) =>
      usersData.filter((user) => user.active === args.active),
  },
  Mutation: {
    createUser: (_, { name, email }) => {
      const newUser = {
        _id: randomUUID(),
        name,
        email,
        active: true,
      };

      usersData.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function initServer() {
  const url = await server.listen({ port: process.env.SERVER_PORT });
  console.log(`Server graphql started at ${url.port}`);
}

initServer();
