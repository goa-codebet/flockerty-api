const placesApi = require('./places');
const { get } = require('lodash')

const placeMap = item => ({
  name: item.name,
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
    place_id: args.id,
    fields: args.fields,
  });
  
  if (!res.data.result)
    return {};
    
  return placeMap(res.data.result);
}

module.exports = {
  places,
  nearby,
  place,
}