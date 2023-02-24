/**
 * @typedef TacticalSceneEntity
 * @property id {string}
 */
class DistanceManager {
  constructor () {
    this._distanceRegistry = {} // distance entre deux entités
  }

  /**
   * Détermine la clé du registre de distance en fonction des id des deux entités pour lesquelles ont veut
   * calculer ou définir la distance.
   * @param oEntity1 {TacticalSceneEntity} Entité 1
   * @param oEntity2 {TacticalSceneEntity} Entité 2
   * @returns {string} clé de registre
   */
  computeKey (oEntity1, oEntity2) {
    // vérifier si c'est la même entité
    if (oEntity1 === oEntity2) {
      throw new Error('same entities')
    }
    const id1 = oEntity1.id > oEntity2.id ? oEntity1.id : oEntity2.id
    const id2 = oEntity1.id < oEntity2.id ? oEntity1.id : oEntity2.id
    const sKey = `${id1}::${id2}`
    if (!(sKey in this._distanceRegistry)) {
      this._distanceRegistry[sKey] = {
        entities: [oEntity1, oEntity2],
        distance: 10
      }
    }
    return sKey
  }

  /**
   * Renvoie la distance entre deux entité (précédemment définie avec setDistance)
   * @param oEntity1 {TacticalSceneEntity}
   * @param oEntity2 {TacticalSceneEntity}
   * @returns {number}
   */
  getDistance (oEntity1, oEntity2) {
    if (oEntity2 === oEntity1) {
      return 0
    }
    return this._distanceRegistry[this.computeKey(oEntity1, oEntity2)].distance
  }

  /**
   * Modifie la distance entre deux entité.
   * Les deux entité doivent etre dans la même pièce
   * @param oEntity1 {TacticalSceneEntity}
   * @param oEntity2 {TacticalSceneEntity}
   * @param nDistance {number} nouvelle distance
   */
  setDistance (oEntity1, oEntity2, nDistance) {
    this._distanceRegistry[this.computeKey(oEntity1, oEntity2)].distance = nDistance
  }

  /**
   * Supprime la distance entre les deux entités (l'une des deux entités quitte la pièce)
   * @param oEntity1 {TacticalSceneEntity}
   * @param oEntity2 {TacticalSceneEntity}
   */
  clearDistance (oEntity1, oEntity2) {
    if (oEntity1 !== oEntity2) {
      delete this._distanceRegistry[this.computeKey(oEntity1, oEntity2)]
    }
  }

  /**
   * Supprimer toute distance faisant intervenir l'entité
   * @param oEntity {TacticalSceneEntity}
   */
  destroyEntity (oEntity) {
    this._distanceRegistry = this._distanceRegistry.filter(d => d.entities.includes(oEntity))
  }

  /**
   * Modifie (diminue) la distance entre les deux entité
   * @param oEntity1 {TacticalSceneEntity}
   * @param oEntity2 {TacticalSceneEntity}
   * @param nSpeed {number}
   */
  modifyDistance (oEntity1, oEntity2, nSpeed) {
    this.setDistance(
      oEntity1,
      oEntity2,
      Math.max(5, this.getDistance(oEntity1, oEntity2) - nSpeed)
    )
  }
}

module.exports = DistanceManager
