const placesApi = require('./places');
const storeApi = require('./store');
const { get } = require('lodash')

const placeMap = item => ({
  name: item.name,
  place_id: item.place_id,
  icon: item.icon,
  photo: placesApi.photoUrl({ photo_reference: get('photos[0].photo_reference', item) }),
  location: {
    lat: item.geometry.location.lat,
    lng: item.geometry.location.lng,
  },
  address: item.formatted_address,
  phone_number: item.international_phone_number,
  categories: item.types,
})

const defaultFields = 'geometry,name,icon,photos,place_id,types'

const places = async (parent, args) => {
  const res = await placesApi.search({
    input: args.name,
    fields: args.fields || defaultFields,
  });
  
  return res.data.candidates.map(placeMap);
}

const nearby = async (parent, args) => {
  const res = await placesApi.nearby({
    location: args.location,
    radius: args.radius,
    rankby: args.rankby,
    type: args.category,
  });
  
  return res.data.results.map(placeMap);
}

const place = async (parent, args) => {
  const res = await placesApi.details({
    place_id: args.place_id,
    fields: args.fields,
  });
  
  if (!res.data.result)
    return {};
    
  return placeMap(res.data.result);
}

const latest = async (parent, args) => {
  const { uuid } = args;
  const start = Math.floor(Date.UTC()/1000)
  
  const slots = storeApi.getSlots({ uuid });
  const places = []
  // Get place for all slots
  for (const item of slots) {
    const place = await placesApi.details({ place_id: item.place_id });
    places.push(place.data.result)
  }
  
  return places.map(placeMap)
};

const favorites = async (parent, args) => {
  const { uuid } = args;
  const start = Math.floor(Date.UTC()/1000)
  const favorites = storeApi.getFavorites({ uuid });
  const places = []
  // Get place for all slots
  for (const item of favorites) {
    const place = await placesApi.details({ place_id: item.place_id });
    places.push(place.data.result)
  }
  
  return places.map(placeMap)
};



const setSlot = (parent, args) => {
  const { uuid, place_id, slotStart, slotEnd } = args;
  
  storeApi.setSlot({ uuid, place_id, slot: {
    start: slotStart,
    end: slotEnd,
  } });
  
  return !!storeApi.getSlots({ uuid });
};

const setFavorite = (parent, args) => {
  const { uuid, place_id } = args;
  
  storeApi.setFavorite({ uuid, place_id });
  return !!storeApi.getFavorites({ uuid });
};

const removeFavorite = (parent, args) => {
  const { uuid, place_id } = args;
  
  storeApi.removeFavorite({ uuid, place_id });
  return !!storeApi.getFavorites({ uuid });
};

module.exports = {
  Query: {
    places,
    nearby,
    place,
    latest,
    favorites,
  },
  Mutation: {
    setSlot,
    setFavorite,
    removeFavorite,
  },
}