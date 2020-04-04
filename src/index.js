const { ApolloServer, gql } = require('apollo-server');
const resolverImplementations = require('./resolvers');

require('dotenv').config();

const typeDefs = `
  type Slot {
    place: Place
    uuid: String
    start: Int
    end: Int
  }
  
  type Location {
    lat: Float
    lng: Float
  }
  
  type Place {
    place_id: String
    name: String
    location: Location
    photo: String
    icon: String
    rating: Float
    address: String
    phone_number: String
    categories: [String]
  }
  
  type Query {
    nearby(location: String, radius: Int, rankby: String, category: String): [Place]
    places(name: String, locationbias: String, fields: String): [Place]
    place(place_id: String): Place
    favorites(uuid: String): [Place]
    latest(uuid: String): [Place]
    next(uuid: String): [Slot]
  }
  
  type Mutation {
    setFavorite(uuid: String, place_id: String): Boolean
    removeFavorite(uuid: String, place_id: String): Boolean
    setSlot(uuid: String, place_id: String, slotStart: Int, slotEnd: Int): Boolean
  }
`;

const resolvers = {
  Query: resolverImplementations.Query,
  Mutation: resolverImplementations.Mutation,
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});