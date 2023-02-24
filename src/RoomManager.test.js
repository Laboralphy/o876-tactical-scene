const RoomManager = require('./RoomManager')

describe('Room Manager', function () {
  it('in same room', function () {
    const rm = new RoomManager()
    const oGob1 = { id: 1 }
    const oGob2 = { id: 2 }
    const oGob3 = { id: 3 }
    const oGob4 = { id: 4 }
    const oGob5 = { id: 5 }
    rm.setEntityRoom(oGob1, 'r1')
    rm.setEntityRoom(oGob2, 'r1')
    rm.setEntityRoom(oGob3, 'r1')
    rm.setEntityRoom(oGob4, 'r2')
    rm.setEntityRoom(oGob5, 'r2')
    expect(rm.getEntityRoom(oGob1)).toBe('r1')
    expect(rm.getEntityRoom(oGob2)).toBe('r1')
    expect(rm.getEntityRoom(oGob3)).toBe('r1')
    expect(rm.getEntityRoom(oGob4)).toBe('r2')
    expect(rm.getEntityRoom(oGob5)).toBe('r2')
    expect(rm.inSameRoom(oGob1, oGob2)).toBeTruthy()
    expect(rm.inSameRoom(oGob2, oGob1)).toBeTruthy()
    expect(rm.inSameRoom(oGob2, oGob4)).toBeFalsy()
    expect(rm.inSameRoom(oGob5, oGob4)).toBeTruthy()
  })
  it('getRoomEntities', function () {
    const rm = new RoomManager()
    const oGob1 = {}
    oGob1.id = 1001
    rm.setEntityRoom(oGob1, 'r1')
    const aEntR1 = rm.getRoomEntities(oGob1)
    expect(aEntR1).toBeInstanceOf(Array)
    expect(aEntR1.length).toBe(1)
    expect(aEntR1[0].id).toBe(1001)
  })
  it('getRoomRegistry', function () {
    const rm = new RoomManager()
    const oGob1 = {}
    oGob1.id = 1001
    const oGob2 = {}
    oGob2.id = 1002
    const oGob3 = {}
    oGob3.id = 1009
    rm.setEntityRoom(oGob1, 'r1')
    rm.setEntityRoom(oGob2, 'r1')
    const oRoom = rm.getRoomRegistry('r1')
    expect(oRoom.length).toBe(2)
    expect(oRoom.includes(oGob1)).toBeTruthy()
    expect(oRoom.includes(oGob2)).toBeTruthy()
    expect(oRoom.includes(oGob3)).toBeFalsy()
  })
  it('getRoomEntities 2', function () {
    const rm = new RoomManager()
    const oGob1 = {}
    oGob1.id = 1001
    const oGob2 = {}
    oGob2.id = 1002
    rm.setEntityRoom(oGob1, 'r1')
    rm.setEntityRoom(oGob2, 'r1')
    const aEntR1 = rm.getRoomEntities(oGob1)
      .map(e => e.id)
      .sort((a, b) => a - b)
    expect(aEntR1).toBeInstanceOf(Array)
    expect(aEntR1.length).toBe(2)
    expect(aEntR1[0]).toBe(1001)
    expect(aEntR1[1]).toBe(1002)
  })
  it('get room entities', function () {
    const rm = new RoomManager()
    const oGob1 = {}
    oGob1.id = 1001
    const oGob2 = {}
    oGob2.id = 1002
    const oGob3 = {}
    oGob3.id = 1003
    const oGob4 = {}
    oGob4.id = 1004
    const oGob5 = {}
    oGob5.id = 1005
    rm.setEntityRoom(oGob1, 'r1')
    rm.setEntityRoom(oGob2, 'r1')
    rm.setEntityRoom(oGob3, 'r1')
    rm.setEntityRoom(oGob4, 'r2')
    rm.setEntityRoom(oGob5, 'r2')
    const aEntR1 = rm
      .getRoomEntities(oGob1)
      .map(e => e.id)
      .sort((a, b) => a - b)
    expect(aEntR1).toEqual([1001, 1002, 1003])
    const aEntR2 = rm
      .getRoomEntities(oGob5)
      .map(e => e.id)
      .sort((a, b) => a - b)
    expect(aEntR2).toEqual([1004, 1005])
  })
  it('removing entity', function () {
    const rm = new RoomManager()
    const oGob1 = {}
    oGob1.id = 1001
    const oGob2 = {}
    oGob2.id = 1002
    const oGob3 = {}
    oGob3.id = 1003
    const oGob4 = {}
    oGob4.id = 1004
    const oGob5 = {}
    oGob5.id = 1005
    rm.setEntityRoom(oGob1, 'r1')
    rm.setEntityRoom(oGob2, 'r1')
    rm.setEntityRoom(oGob3, 'r1')
    rm.setEntityRoom(oGob4, 'r2')
    rm.setEntityRoom(oGob5, 'r2')
    const aEntR1 = rm
      .getRoomEntities(oGob1)
      .map(e => e.id)
      .sort((a, b) => a - b)
    expect(aEntR1).toEqual([1001, 1002, 1003])
    rm.removeEntityRoom(oGob2)
    const aEntR2 = rm
      .getRoomEntities(oGob1)
      .map(e => e.id)
      .sort((a, b) => a - b)
    expect(aEntR2).toEqual([1001, 1003])
  })
  it('moving entity', function () {
    const rm = new RoomManager()
    const oGob1 = {}
    oGob1.id = 1001
    const oGob2 = {}
    oGob2.id = 1002
    const oGob3 = {}
    oGob3.id = 1003
    const oGob4 = {}
    oGob4.id = 1004
    const oGob5 = {}
    oGob5.id = 1005
    rm.setEntityRoom(oGob1, 'r1')
    rm.setEntityRoom(oGob2, 'r1')
    rm.setEntityRoom(oGob3, 'r1')
    rm.setEntityRoom(oGob4, 'r2')
    rm.setEntityRoom(oGob5, 'r2')
    const aEntR1 = rm
      .getRoomEntities(oGob2)
      .map(e => e.id)
      .sort((a, b) => a - b)
    expect(aEntR1).toEqual([1001, 1002, 1003])
    rm.moveEntity(oGob2, 'r2')
    const aEntR2 = rm
      .getRoomEntities(oGob1)
      .map(e => e.id)
      .sort((a, b) => a - b)
    expect(aEntR2).toEqual([1001, 1003])
    const aEntR3 = rm
      .getRoomEntities(oGob2)
      .map(e => e.id)
      .sort((a, b) => a - b)
    expect(aEntR3).toEqual([1002, 1004, 1005])
  })
  it('destroy entity', function () {
    const rm = new RoomManager()
    const oGob1 = {}
    oGob1.id = 1001
    const oGob2 = {}
    oGob2.id = 1002
    const oGob3 = {}
    oGob3.id = 1003
    const oGob4 = {}
    oGob4.id = 1004
    const oGob5 = {}
    oGob5.id = 1005
    rm.setEntityRoom(oGob1, 'r1')
    rm.setEntityRoom(oGob2, 'r1')
    rm.setEntityRoom(oGob3, 'r1')
    rm.setEntityRoom(oGob4, 'r2')
    rm.setEntityRoom(oGob5, 'r2')
    rm.destroyEntity(oGob3)
    const aEntR1 = rm
      .getRoomEntities(oGob2)
      .map(e => e.id)
      .sort((a, b) => a - b)
    expect(aEntR1).toEqual([1001, 1002])
  })
})
