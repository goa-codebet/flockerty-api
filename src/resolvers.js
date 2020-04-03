const { search, photoUrl, details } = require('./places');

const places = async (parent, args) => {
  const res = await search({
    input: args.name,
    locationbias: args.locationbias,
    fields: args.fields || 'geometry,name,icon,photos,place_id',
  });
  
  return res.data.candidates.map(item => ({
    id: item.place_id,
    name: item.name,
    icon: item.icon,
    photo: photoUrl({ photo_reference: item.photos[0].photo_reference }),
    location: {
      lat: item.geometry.location.lat,
      lng: item.geometry.location.lng,
    }
  }));
}

const place = async (parent, args) => {
  const res = await details({
    place_id: args.id,
    fields: args.fields,
  });
  
  if (!res.data.result)
    return {};
    
  const item = res.data.result;
  return {
    name: item.name,
    icon: item.icon,
    image: photoUrl({ photo_reference: item.photos[0].photo_reference }),
    location: {
      lat: item.geometry.location.lat,
      lng: item.geometry.location.lng,
    },
    address: item.formatted_address,
    phone_number: item.international_phone_number,
    categories: item.types,
  };
}

module.exports = {
  places,
  place,
}