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
    image: String
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
    places(name: String, locationbias: String, fields: String): [Place]
    place(id: String): Place
  }
`;

const resolvers = {
  Query: {
    places: resolverImplementations.places,
    place: resolverImplementations.place,
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});