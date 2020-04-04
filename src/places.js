const qs = require('query-string')
const { setup } = require('axios-cache-adapter')

require('dotenv').config();

const http = setup({
  baseURL: process.env.PLACES_API || 'https://maps.googleapis.com/maps/api/place',
  cache: {
    maxAge: 15 * 60 * 1000,
    debug: true,
    exclude: {
      query: false
    }
  }
});

const nearby = ({ location, radius, type }) => {
  const path = '/nearbysearch/json?';
  const parameters = {
    key: process.env.PLACES_KEY,
    location,
    radius,
    type,
  };
  
  return http.get(path + qs.stringify(parameters));
}

const search = ({ input, fields, locationbias, inputtype = 'textquery' }) => {
  const path = '/findplacefromtext/json?';
  const parameters = {
    key: process.env.PLACES_KEY,
    input,
    inputtype,
    fields,
    locationbias,
  };
  
  return http.get(path + qs.stringify(parameters));
}

const details = ({ place_id, fields }) => {
  const path = '/details/json?';
  const parameters = {
    key: process.env.PLACES_KEY,
    place_id,
    fields,
  };
  
  return http.get(path + qs.stringify(parameters));
}

const photoUrl = ({ photo_reference, maxwidth, maxHeight }) => {
  
  if (!photo_reference)
    return null;
  
  const path = 'https://maps.googleapis.com/maps/api/place/photo?';
  const parameters = {
    key: process.env.PLACES_KEY,
    photoreference: photo_reference,
    maxwidth,
    maxHeight,
  };
  
  return path + qs.stringify(parameters);
}

module.exports = {
  search,
  photoUrl,
  details,
  nearby,
}