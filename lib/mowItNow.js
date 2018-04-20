const Promise = require('bluebird')

function __isValideEntries (width, height, mowers) {
  try {
    if (!width || typeof width !== 'number' || width < 0) {
      throw new Error(`Aucun paramètre de largeur ou le paramètre n'est pas de type chiffre positif`)
    }
    if (!height || typeof width !== 'number' || width < 0) {
      throw new Error(`Aucun paramètre de hauteur ou le paramètre n'est pas de type chiffre positif`)
    }
    if (!mowers) {
      throw new Error(`Aucun paramètre de tondeuse`)
    }
    if (!Array.isArray(...mowers) ) {
      if (mowers.length !== 4) {
        throw new Error(`Erreur dans les paramètres de tondeuse ${mowers}`)
      }
      try {
       __testMower(width, height, mowers)
      } catch (error) {
        throw new Error(error.message)
      }
    }
    if (Array.isArray(...mowers)){
      if (mowers.filter(mower => mower.length !== 4).length > 0) {
        throw new Error(`Erreur dans les paramètres de tondeuse ${mowers.filter(mower => mower.length !== 4)}`)
      }
      mowers.map(mower => {
        try {
          __testMower(width, height, mower)
        } catch (error) {
          throw new Error(error.message)
        }
      })
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

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

module.exports = async function mowItNow (width, height , mowers) {
  const mowersList = []

  try {
   __isValideEntries(width, height, mowers)
  } catch (error) {
    throw new Error(error.message)
  }

   const space = new Space(width, height)

   if (!Array.isArray(...mowers)) {
     mowersList.push(new Mower(...mowers))
   } else {
     mowers.forEach( mower => {
       mowersList.push(new Mower(...mower))
     })
   }

   let res = await Promise.map(mowersList, async mower => {
     try {
       let actions = await mower.start(space, mowersList)
       return actions[actions.length - 1]
     } catch (error) {
       throw new Error(`une erreur c'est produite`)
     }
   })

  return await res
}

class Mower {

  constructor(xPostion, yPosition, cardinalPosition, movements) {
    this.id = `${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}`
    this.x = xPostion
    this.y = yPosition
    this.cardinal = cardinalPosition
    this.movements = movements.split('')
  }

  __moveTop (max) {
    return this.y === max ? max : this.y + 1
  }
  __moveLeft () {
    return this.x === 0 ? 0 : this.x - 1
  }
  __moveRight (max) {
    return this.x === max ? max : this.x + 1
  }
  __moveDown () {
    return this.y === 0 ? 0 : this.y - 1
  }

  __getOtherMowersPosition (mowers) {
    const others = []
    mowers.map(mower => {
      if (mower.id !== this.id) {
        others.push({x: mower.x, y: mower.y})
      }
    })
    return others
  }

  __comparePosition (mowers, x, y) {
    const isNext = []
    mowers.map(mower => {
      if (mower.x === x && mower.y === y) {
        isNext.push(true)
      } else {
        isNext.push(false)
      }
    })
    return isNext.indexOf(true) !== -1
  }

  __move (space, mowers) {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        const cardinals = ['N', 'E', 'S', 'W']
        const mowersList = this.__getOtherMowersPosition(mowers)
        const cardinalIndex = cardinals.indexOf(this.cardinal)
        let nextX = this.x
        let nextY = this.y
          if (this.movements[0] === 'A') {
            switch (this.cardinal) {
              case 'N':
                nextY = this.__moveTop(space.height)
                break
              case 'E':
                nextX = this.__moveRight(space.width)
                break
              case 'S':
                nextY = this.__moveDown()
                break
              case 'W':
                nextX = this.__moveLeft()
                break
            }
            let timer = setInterval(() => {
              if (!this.__comparePosition(mowersList, nextX, nextY)) {
                clearInterval(timer)
              }
            }, Math.floor(Math.random() * 10))
            this.x = nextX
            this.y = nextY
          } else if (this.movements[0] === 'D') {
            this.cardinal = cardinalIndex === cardinals.length -1 ? cardinals[0] : cardinals[cardinalIndex + 1]
          } else {
            this.cardinal = cardinalIndex === 0 ? cardinals[cardinals.length - 1] : cardinals[cardinalIndex - 1]
          }
        resolve(`${this.x} ${this.y} ${this.cardinal}`)
      }, Math.floor(Math.random() * 10));
    })
  }

  async start(space, mowers) {
    var result = Promise.mapSeries(this.movements, async (move) => {
      let res = await this.__move(space, mowers)
      this.movements.shift()
      return res
    })
    return result
  }
}

class Space {

  constructor(width, height) {
    this.width = width
    this.height = height
  }
}



