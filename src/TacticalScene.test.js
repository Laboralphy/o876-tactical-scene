const TacticalScene = require('./index')

function createEntity () {
  return {
    id: Math.random().toString().substring(2).toString(36)
  }
}

describe('basic', function () {
  it('set distance and get distance', function () {
    const ts = new TacticalScene()
    const e1 = createEntity()
    const e2 = createEntity()
    ts.setEntityRoom(e1, 'r1')
    ts.setEntityRoom(e2, 'r1')
    ts.setDistance(e1, e2, 30)
    expect(ts.getDistance(e1, e2)).toBe(30)
    expect(ts.getDistance(e2, e1)).toBe(30)
  })
  it('modify distance', function () {
    const ts = new TacticalScene()
    const e1 = createEntity()
    const e2 = createEntity()
    ts.setEntityRoom(e1, 'r1')
    ts.setEntityRoom(e2, 'r1')
    ts.setDistance(e1, e2, 30)
    expect(ts.getDistance(e1, e2)).toBe(30)
    ts.moveEntityForward(e1, e2, 10)
    expect(ts.getDistance(e1, e2)).toBe(20)
    ts.moveEntityForward(e1, e2, 10)
    expect(ts.getDistance(e1, e2)).toBe(10)
    ts.moveEntityBackward(e1, e2, 15)
    expect(ts.getDistance(e1, e2)).toBe(25)
  })
  it('getNearestEntity', function () {
    const ts = new TacticalScene()
    const e1 = createEntity()
    const e2 = createEntity()
    ts.setEntityRoom(e1, 'r1')
    ts.setEntityRoom(e2, 'r1')
    ts.setDistance(e1, e2, 30)
    const ne = ts.getNearestEntities(e1)
    expect(ne.length).toBe(1)
    expect(ne[0].entity.id).toBe(e2.id)
    expect(ne[0].distance).toBe(30)
  })
})
