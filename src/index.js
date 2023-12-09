const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function initServer() {
  const url = await server.listen({port: process.env.SERVER_PORT});
  console.log(`Server graphql started at ${url.port}`);
}

initServer();
