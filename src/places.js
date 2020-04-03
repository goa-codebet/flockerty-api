const axios = require('axios')
const qs = require('query-string')

const search = ({ input, fields, locationbias, inputtype = 'textquery' }) => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
  const parameters = {
    key: process.env.PLACES_KEY,
    input,
    inputtype,
    fields,
    locationbias,
  }
  
  return axios.get(baseUrl + qs.stringify(parameters))
}

const details = ({ place_id, fields }) => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json?'
  const parameters = {
    key: process.env.PLACES_KEY,
    place_id,
    fields,
  }
  
  return axios.get(baseUrl + qs.stringify(parameters))
}

const photoUrl = ({ photo_reference, maxwidth, maxHeight }) => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/photo?'
  const parameters = {
    key: process.env.PLACES_KEY,
    photoreference: photo_reference,
    maxwidth,
    maxHeight,
  }
  
  return baseUrl + qs.stringify(parameters)
}

module.exports = {
  search,
  photoUrl,
  details,
}