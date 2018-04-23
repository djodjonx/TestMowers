
function __testMower(width, height, mower) {
  try {
    const cardinals = ['N', 'E', 'S', 'W']
    const regex = /^[A  G  D]+$/
    if (typeof mower[0] !== 'number' || mower[0] > width || mower[0] < 0) {
      throw new Error(`Le paramètre de départ x de ${mower} n'est pas un nombre ou sa valeur est supérieur à la largueur du terrain ${width} ou négatif `)
    }
    if (typeof mower[1] !== 'number' || mower[1] > height || mower[0] < 0) {
      throw new Error(`Le paramètre de départ y de ${mower} n'est pas un nombre ou sa valeur est supérieur à la hauteur du terrain ${height} ou négatif `)
    }
    if (typeof mower[2] !== 'string' || cardinals.indexOf(mower[2]) === -1) {
      throw new Error(`Le paramètre de direction de ${mower} n'est pas une lettre ou sa valeur est différente de N, E, S, W `)
    }
    if (typeof mower[3] !== 'string' || !regex.test(mower[3])) {
      throw new Error(`Les paramètres de mouvement de ${mower} n'est pas une lettre ou sa valeur est différente de A, G, D `)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = function validattor () {
  try {
    if (!arguments.length === 0 || typeof arguments[0] !== 'number' || arguments[0] < 0) {
      throw new Error(`Aucun paramètre de largeur ou le paramètre n'est pas de type chiffre positif`)
    }
    if (!arguments.length === 1 || typeof arguments[1] !== 'number' || arguments[1] < 0) {
      throw new Error(`Aucun paramètre de hauteur ou le paramètre n'est pas de type chiffre positif`)
    }
    if (!arguments.length === 2) {
      throw new Error(`Aucun paramètre de tondeuse`)
    }
    if (!Array.isArray(...arguments[2])) {
      if (arguments[2].length !== 4) {
        throw new Error(`Erreur dans les paramètres de tondeuse ${arguments[2]}`)
      }
      try {
        __testMower(arguments[0], arguments[1], arguments[2])
      } catch (error) {
        throw new Error(error.message)
      }
    }
    if (Array.isArray(...arguments[2])) {
      if (arguments[2].filter(mower => mower.length !== 4).length > 0) {
        throw new Error(`Erreur dans les paramètres de tondeuse ${arguments[2].filter(mower => mower.length !== 4)}`)
      }
      arguments[2].map(mower => {
        try {
          __testMower(arguments[0], arguments[1], mower)
        } catch (error) {
          throw new Error(error.message)
        }
      })
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
