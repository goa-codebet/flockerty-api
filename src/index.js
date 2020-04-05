const { ApolloServer, gql } = require('apollo-server');
const resolverImplementations = require('./resolvers');
const typeDefs = require('./schema');

require('dotenv').config();

const resolvers = {
  Query: resolverImplementations.Query,
  Mutation: resolverImplementations.Mutation,
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});