const store = {
  favorites: [],
  slots: [],
}

const getFavorites = ({ uuid }) => {
  return store.favorites.filter(i => i.uuid === uuid)
}

const setFavorite = ({ uuid, place_id }) => {
  return store.favorites.push({
    uuid,
    place_id,
  })
}

const removeFavorite = ({ uuid, place_id }) => {
  const item = store.favorites.find(f => f.uuid === uuid && f.place_id === place_id)
  delete store.favorites[store.favorites.indexOf(item)]
  return store.favorites
}

const setSlot = ({ uuid, place_id, slot }) => {
  const sum = uuid+place_id+slot.start+slot.end;
  
  if (store.slots.find(x => x.sum === sum))
    return null;
    
  return store.slots.push({
    sum,
    uuid,
    place_id,
    slot,
  });
}

const getSlots = ({ place_id, uuid, slot }) => {
  if (place_id && slot && slot.start && slot.end)
    return store.slots.filter(i => i.place_id === place_id && i.slot.start >= slot.start && i.slot.end <= slot.end)
  else if (place_id && slot && slot.start)
    return store.slots.filter(i => i.place_id === place_id && i.slot.start >= slot.start)
  else if (place_id && slot && slot.end)
    return store.slots.filter(i => i.place_id === place_id && i.slot.end <= slot.end)
  else if (place_id)
    return store.slots.filter(i => i.place_id === place_id)
  else if (uuid)
    return store.slots.filter(i => i.uuid === uuid)
}

module.exports = {
  getFavorites,
  setFavorite,
  removeFavorite,
  setSlot,
  getSlots,
}