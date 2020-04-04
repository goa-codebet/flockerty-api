const { getHeatmap } = require('./utils');

describe('Group slots by slotSize = 5', () => {
  const place_id = "x"
  const start = 0
  const length = 20
  const slotSize = 5
  
  const expected = [3,5,3,2];

  const mockData = [
    {
      place_id,
      slot: {
        start: 0,
        end: 5
      }
    },
    {
      place_id,
      slot: {
        start: 1,
        end: 6
      }
    },
    {
      place_id,
      slot: {
        start: 1,
        end: 6
      }
    },
    {
      place_id,
      slot: {
        start: 6,
        end: 11
      }
    },
    {
      place_id,
      slot: {
        start: 10,
        end: 15
      }
    },
    {
      place_id,
      slot: {
        start: 15,
        end: 20
      }
    }
  ]
  
  const heatmap = getHeatmap({ data: mockData, start, length, slotSize })
  
  it('contains correct number of slots', () => {
    expect(heatmap).toHaveLength(4);
  })
  
  it('contains correct data', () => {
    expect(heatmap).toEqual(expected);
  })
})
