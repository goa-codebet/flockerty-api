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

const nearby = async ({ location, radius, type }) => {
  const path = '/nearbysearch/json?';
  const parameters = {
    key: process.env.PLACES_KEY,
    location,
    radius,
    type,
  };
  
  const res = await http.get(path + qs.stringify(parameters));
  if (!res.data.results)
    return []
    
  return res.data.results;
}

const search = async ({ input, fields, locationbias, inputtype = 'textquery' }) => {
  const path = '/findplacefromtext/json?';
  const parameters = {
    key: process.env.PLACES_KEY,
    input,
    inputtype,
    fields,
    locationbias,
  };
  
  const res = await http.get(path + qs.stringify(parameters));
  if (!res.data.candidates)
    return []
    
  return res.data.candidates;
}

const details = async ({ place_id, fields }) => {
  const path = '/details/json?';
  const parameters = {
    key: process.env.PLACES_KEY,
    place_id,
    fields,
  };
  
  const res = await http.get(path + qs.stringify(parameters));
  if (!res.data.result)
    return {};
    
  return res.data.result;
}

const photoUrl = async ({ photo_reference, maxwidth = 400, maxHeight }) => {
  if (!photo_reference)
    return null;
  
  const path = process.env.PLACES_PHOTO_URL || 'https://maps.googleapis.com/maps/api/place/photo?';
  const parameters = {
    // Key is provided by azure
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