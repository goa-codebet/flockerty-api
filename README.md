# Flockerty API
A Hack the crisis project

## .env
`PLACES_KEY` - Google places api key
`PLACES_API` - Google places api path (Defaults to google endpoint)
`NODE_PERSIST_DIR` - Node persist file storage dir default is .node-persist/storage


## Example queries
### nearby stores
{
  nearby(location:"56.6702937,16.2976897" radius: 10000 category: "supermarket") {
    name
    place_id
    photo
  }
}

### nearby cities
{
  nearby(location:"56.6702937,16.2976897" radius: 50000 category: "locality") {
    name
    place_id
    photo
  }
}

### favorites
{
  favorites(uuid: "x") {
    name
    place_id
  }
}

### latest
{
  latest(uuid: "x") {
    name
    place_id
  }
}

### set slot
mutation {
  setSlot(uuid: "x", place_id: "ChIJz_fhF4PRV0YRNYBIp76ybZI", slotStart: 1585992790, slotEnd: 1585994590) 
}

### setFavorite
mutation {
  setFavorite(uuid: "x" place_id: "ChIJz_fhF4PRV0YRNYBIp76ybZI") 
}