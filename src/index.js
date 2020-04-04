const { ApolloServer, gql } = require('apollo-server');
const resolverImplementations = require('./resolvers');

require('dotenv').config();

const typeDefs = `
  type Location {
    lat: Float
    lng: Float
  }
  
  type Place {
    id: String
    name: String
    location: Location
    photo: String
    icon: String
    rating: Float
    address: String
    phone_number: String
    categories: [String]
  }
  
  type User {
    id: String
    recentPlaces: [Place]
  }
  
  type Query {
    nearby(location: String, radius: Int, rankby: String, category: String): [Place]
    places(name: String, locationbias: String, fields: String): [Place]
    place(id: String): Place
  }
`;

const resolvers = {
  Query: resolverImplementations
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});