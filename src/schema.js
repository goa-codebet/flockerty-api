module.exports = `
  type Slot {
    place_id: String
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
    heatmap: [Int]
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
    setFavorite(uuid: String, place_id: String): [Place]
    removeFavorite(uuid: String, place_id: String): [Place]
    setSlot(uuid: String, place_id: String, slotStart: Int, slotEnd: Int): Slot
  }
`;