const placesApi = require('./places');
const storeApi = require('./store');
const { getHeatmap } = require('./utils')
const { get } = require('lodash')

const getAddressComponent = (components, component) => {
  const res = components.find(c => c.types.includes(component))
  return res ? res.long_name : null
}

const defaultFields = 'geometry,name,icon,photos,place_id,types'
const placeMap = item => ({
  name: item.name,
  place_id: item.place_id,
  icon: item.icon,
  photo: placesApi.photoUrl({ photo_reference: get(item,'photos[0].photo_reference') }),
  heatmap: getHeatmap({data: storeApi.getSlots({ place_id: item.place_id }), start: Math.floor(Date.now()/1000)}),
  location: {
    lat: item.geometry.location.lat,
    lng: item.geometry.location.lng,
  },
  city: item.address_components && getAddressComponent(item.address_components, 'postal_town'),
  address: item.formatted_address,
  phone_number: item.international_phone_number,
  categories: item.types,
})

/*** Queries ***/

const places = async (parent, args) => {
  const places = await placesApi.search({
    input: args.name,
    fields: args.fields || defaultFields,
  });
  
  return places.map(placeMap);
}

const nearby = async (parent, args) => {
  const places = await placesApi.nearby({
    location: args.location,
    radius: args.radius,
    rankby: args.rankby,
    type: args.category,
  });
  
  return places.map(placeMap);
}

const place = async (parent, args) => {
  const place = await placesApi.details({
    place_id: args.place_id,
    fields: args.fields,
  });
  
  return placeMap(place);
}

const latest = async (parent, args) => {
  const { uuid } = args;
  const start = Math.floor(Date.now()/1000)
  
  const slots = storeApi.getSlots({ uuid });
  const places = []
  // Get place for all slots
  for (const item of slots) {
    const place = await placesApi.details({ place_id: item.place_id });
    places.push(place)
  }
  
  return places.map(placeMap)
};

const favorites = async (parent, args) => {
  const { uuid } = args;
  const favorites = storeApi.getFavorites({ uuid });
  const places = []
  // Get place for all slots
  for (const item of favorites) {
    const place = await placesApi.details({ place_id: item.place_id });
    places.push(place)
  }
  
  return places.map(placeMap)
};

/*** Mutations ***/

const setSlot = (parent, args) => {
  const { uuid, place_id, slotStart, slotEnd } = args;
  
  storeApi.setSlot({ uuid, place_id, slot: {
    start: slotStart,
    end: slotEnd,
  } });
  
  return place(parent, args);
};

const setFavorite = (parent, args) => {
  const { uuid, place_id } = args;
  
  storeApi.setFavorite({ uuid, place_id });
  return favorites(parent, args);
};

const removeFavorite = (parent, args) => {
  const { uuid, place_id } = args;
  
  storeApi.removeFavorite({ uuid, place_id });
  return favorites(parent, args);
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