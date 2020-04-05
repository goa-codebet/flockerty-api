const getHeatmap = ({ data, start, length = 12 * 3600, slotSize = 3600 }) => {
  const end = start + length
  const slots = new Array(Math.floor((end - start) / slotSize)).fill(0)
  
  for (let i=0;i<slots.length;i++) {
    const slotStartD = new Date((start*1000)+(slotSize*i)*1000)
    const key = slotStartD.getUTCHours();
    
    slots[i] = {
      time: key,
      value: data.filter(item => {
        const slot = {
          start: start + (slotSize*i),
          end: start + (slotSize*(i+1))
        }
        return item.slot.end >= slot.start && item.slot.end <= slot.end || item.slot.start >= slot.start && item.slot.start <= slot.end
      }).length
    }
  }
  
  return slots
}

module.exports = {
  getHeatmap
}