const RoomManager = require('./RoomManager')
const DistanceManager = require('./DistanceManager')

class TacticalScene {
  constructor () {
    this._roomManager = new RoomManager()
    this._distanceManager = new DistanceManager()
  }

  get roomManager () {
    return this._roomManager
  }

  get distanceManager () {
    return this._distanceManager
  }

  setEntityRoom (oEntity, sRoom) {
    // Supprimer de la pièce actuelle toutes les distance avec les entité de cette pièce
    const sPrevRoom = this.roomManager.getEntityRoom(oEntity)
    if (sPrevRoom) {
      this
        .roomManager
        .getRoomEntities(oEntity)
        .forEach(e => this.distanceManager.clearDistance(oEntity, e))
    }
    if (sRoom) {
      this.roomManager.moveEntity(oEntity, sRoom)
    } else {
      this.roomManager.destroyEntity(oEntity)
      this.distanceManager.destroyEntity(oEntity)
    }
  }

  moveEntityForward (oEntity, oTarget, nSpeed) {
    if (this.roomManager.inSameRoom(oEntity, oTarget)) {
      this.distanceManager.modifyDistance(oEntity, oTarget, nSpeed)
    }
  }

  moveEntityBackward (oEntity, oTarget, nSpeed) {
    this.moveEntityForward(oEntity, oTarget, -nSpeed)
  }

  getDistance (oEntity, oTarget) {
    return this.roomManager.inSameRoom(oEntity, oTarget)
      ? this.distanceManager.getDistance(oEntity, oTarget)
      : Infinity
  }

  getNearestEntities (oEntity, nDistanceMax = Infinity) {
    return this
      .roomManager
      .getRoomEntities(oEntity)
      .map(e => ({
        entity: e,
        distance: this.distanceManager.getDistance(oEntity, e)
      }))
      .filter(d => d.entity !== oEntity && d.distance <= nDistanceMax)
      .sort((a, b) => a.distance - b.distance)
  }

  setDistance (oEntity1, oEntity2, nDistance) {
    if (this.roomManager.inSameRoom(oEntity1, oEntity2)) {
      this.distanceManager.setDistance(oEntity1, oEntity2, nDistance)
    }
  }
}

module.exports = TacticalScene
