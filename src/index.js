const { ApolloServer, gql } = require('apollo-server')
const data = {
  places: [{
    name: 'Ica Maxi',
    location: {
      lat: 15.023467,
      lon: 12.023467
    }
  },{
    name: 'Kalmar bibilotek',
    location: {
      lat: 15.022467,
      lon: 12.021467
    }
  },{
    name: 'Apoteket',
    location: {
      lat: 15.123467,
      lon: 12.223467
    }
  }]
}

const typeDefs = `
  type Location {
    lat: Float
    lon: Float
  }
  
  type Place {
    name: String
    location: Location
  }
  
  type User {
    id: String
    recentPlaces: [Place]
  }
  
  type Query {
    places: [Place]
  }
`

const resolvers = {
  Query: {
    places: () => data.places
  }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});