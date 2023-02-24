/**
 * Gestion des pièces et des entité
 * Afin de compartimenter les calculs de distance entre entité et gagner en performance
 */
class RoomManager {
  constructor () {
    this._roomRegistry = {} // liste des entités dans chaque pièce
    this._entityRegistry = {} // information sur les entités
  }

  /**
   * Indique si les deux entité sont dans la même pièce
   * @param oEntity1
   * @param oEntity2
   * @return {boolean}
   */
  inSameRoom (oEntity1, oEntity2) {
    return this.getEntityRegistry(oEntity1).room === this.getEntityRegistry(oEntity2).room
  }

  /**
   * Renvoie le registre de la pièce spécifiée, permet de déterminer la liste des entité à l'intérieur
   * @param idRoom {string} identifiant de la pièce
   * @returns {TacticalSceneEntity[]}
   */
  getRoomRegistry (idRoom) {
    if (idRoom === null) {
      throw new Error('room id cannot be null')
    }
    if (!(idRoom in this._roomRegistry)) {
      this._roomRegistry[idRoom] = []
    }
    return this._roomRegistry[idRoom]
  }

  /**
   * déterminer la liste des entité dans la pièce
   * @param oEntity {TacticalSceneEntity}
   * @return {TacticalSceneEntity[]}
   */
  getRoomEntities (oEntity) {
    return this.getRoomRegistry(this.getEntityRoom(oEntity))
  }

  /**
   * Renvoie l'identifiant de la pièce dans laquelle se trouve l'entité
   * @param oEntity {TacticalSceneEntity}
   * @return {string|number}
   */
  getEntityRoom (oEntity) {
    const { room } = this.getEntityRegistry(oEntity)
    return room
  }

  /**
   * Renvoie le registre de l'entité spécifié
   * @param oEntity {TacticalSceneEntity}
   * @returns {{ room }}
   */
  getEntityRegistry (oEntity) {
    if (!('id' in oEntity)) {
      throw new Error('entity needs "id" property')
    }
    const idEntity = oEntity.id
    if (!(idEntity in this._entityRegistry)) {
      this._entityRegistry[idEntity] = {
        room: null
      }
    }
    return this._entityRegistry[idEntity]
  }

  /**
   * Défini la pièce dans laquelle se trouve une entité
   * @param oEntity {TacticalSceneEntity}
   * @param idRoom {string}
   */
  setEntityRoom (oEntity, idRoom) {
    const r = this.getRoomRegistry(idRoom)
    if (r.indexOf(oEntity) < 0) {
      r.push(oEntity)
    }
    const e = this.getEntityRegistry(oEntity)
    e.room = idRoom
  }

  /**
   * Retirer l'entité de la pièce dans laquelle elle se trouvait
   * @param oEntity {TacticalSceneEntity}
   */
  removeEntityRoom (oEntity) {
    const e = this.getEntityRegistry(oEntity)
    const idRoom = e.room
    if (idRoom !== null) {
      const r = this.getRoomRegistry(idRoom)
      const i = r.indexOf(oEntity)
      if (i >= 0) {
        r.splice(i, 1)
      }
      e.room = null
    }
  }

  destroyEntity (oEntity) {
    this.removeEntityRoom(oEntity)
    delete this._entityRegistry[oEntity.id]
  }

  /**
   * Déplace une entité d'une pièce à une autre
   * @param oEntity {TacticalSceneEntity}
   * @param idRoom {string|null}
   */
  moveEntity (oEntity, idRoom) {
    this.removeEntityRoom(oEntity)
    if (idRoom !== null) {
      this.setEntityRoom(oEntity, idRoom)
    }
  }
}

module.exports = RoomManager
