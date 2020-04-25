const storage = require('node-persist');

storage.init();

const getFavorites = async ({ uuid }) => {
  const res = await storage.getItem('f'+uuid) || [];
  return res
}

const setFavorite = async ({ uuid, place_id }) => {
  const favorites = await getFavorites({ uuid });
  
  favorites.push(place_id);
  const distinct = favorites.filter((value, index, self) => self.indexOf(value) === index);
  return await storage.setItem('f'+uuid, distinct);
}

const removeFavorite = async ({ uuid, place_id }) => {
  const favorites = getFavorites({ uuid });
  
  const item = favorites.find(f => f.place_id === place_id);
  delete store.favorites[store.favorites.indexOf(item)];
  
  const distinct = favorites.filter((value, index, self) => self.indexOf(value) === index);
  return await storage.setItem('f'+uuid, distinct);
}

const getSlots = async ({ place_id, uuid, slot }) => {
  const slots = await storage.getItem('slots') || [];
  
  if (place_id && slot && slot.start && slot.end)
    return slots.filter(i => i.place_id === place_id && i.slot.start >= slot.start && i.slot.end <= slot.end) || [];
  else if (place_id && slot && slot.start)
    return slots.filter(i => i.place_id === place_id && i.slot.start >= slot.start) || [];
  else if (place_id && slot && slot.end)
    return slots.filter(i => i.place_id === place_id && i.slot.end <= slot.end) || [];
  else if (place_id && uuid)
    return slots.filter(i => i.place_id === place_id && i.uuid === uuid) || [];
  else if (place_id)
    return slots.filter(i => i.place_id === place_id) || [];
  else if (uuid)
    return slots.filter(i => i.uuid === uuid) || [];
  else
    return slots || [];
}

const setSlot = async ({ uuid, place_id, slot }) => {
  const slots = await getSlots({});
  const sum = uuid+place_id+slot.start+slot.end;
  
  if (slots.find(x => x.sum === sum))
    return null;
    
  slots.push({
    sum,
    uuid,
    place_id,
    slot,
  });
  
  return await storage.setItem('slots', slots);
}

module.exports = {
  getFavorites,
  setFavorite,
  removeFavorite,
  setSlot,
  getSlots,
}