const Promise = require('bluebird')

module.exports = class Mower {

  constructor(xPostion, yPosition, cardinalPosition, movements) {
    this.id = `${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}`
    this.x = xPostion
    this.y = yPosition
    this.cardinal = cardinalPosition
    this.movements = movements.split('')
  }

  getOutput () {
    return `${this.x} ${this.y} ${this.cardinal}`
  }

  __moveTop(max) {
    return this.y === max ? max : this.y + 1
  }
  __moveLeft() {
    return this.x === 0 ? 0 : this.x - 1
  }
  __moveRight(max) {
    return this.x === max ? max : this.x + 1
  }
  __moveDown() {
    return this.y === 0 ? 0 : this.y - 1
  }

  __getOtherMowersPosition(mowers) {
    return mowers.filter(mower => mower.id !== this.id)
  }

  __comparePosition(mowers) {
    return mowers.find(mower => mower.x === this.x && mower.y === this.y)
  }

  async __move(space, mowers) {
    const mowersList = this.__getOtherMowersPosition(mowers)
    switch (this.cardinal) {
      case 'N':
        this.y = this.__moveTop(space.height)
        break
      case 'E':
        this.x = this.__moveRight(space.width)
        break
      case 'S':
        this.y = this.__moveDown()
        break
      case 'W':
        this.x = this.__moveLeft()
        break
    }
    let timer = setInterval(() => {
      if (!this.__comparePosition(mowersList)) {
        clearInterval(timer)
      }
    }, Math.floor(Math.random() * 10))
    return this.getOutput()
  }

  async __changeCardinals() {
    const cardinals = ['N', 'E', 'S', 'W']
    const cardinalIndex = cardinals.indexOf(this.cardinal)
    this.cardinal = cardinalIndex === cardinals.length - 1 ? cardinals[0] : cardinals[cardinalIndex + 1]
    if (this.movements[0] === 'D') {
      this.cardinal = cardinalIndex === cardinals.length - 1 ? cardinals[0] : cardinals[cardinalIndex + 1]
    } else {
      this.cardinal = cardinalIndex === 0 ? cardinals[cardinals.length - 1] : cardinals[cardinalIndex - 1]
    }
    return this.getOutput()
  }

  async start(space, mowers) {
    return Promise.mapSeries(this.movements, async (move) => {
      let res
      if (move === 'A') {
        res = await this.__move(space, mowers)
      } else {
        res = await this.__changeCardinals()
      }
      this.movements.shift()
      return res
    })
  }
}