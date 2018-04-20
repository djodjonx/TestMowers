'use strict'

const mowItNow = require('./lib/mowItNow')
const fs = require('fs')
const path = require('path')
const readline = require('readline')


class Commandes {

  constructor() {
    this.width = null
    this.height = null
    this.mowers = []
  }

  __toArrayOfNumber (datas) {
    return datas.map(data => isNaN(parseInt(data)) ? data : parseInt(data))
  }

  setInstructions(instructions) {
    instructions = instructions.filter(line => line.trim().length > 0)
    if (instructions.length < 3) {
      throw new Error('instructions manquantes pour réaliser test,\n veuillez éditer le fichier "entries.txt"')
    }
    for (let i = 0; i < instructions.length; i++) {
      if (!this.width && !this.height) {
        const size = this.__toArrayOfNumber(instructions[0].split(' '))
        if (size.length !== 2) {
          throw new Error('erreur à la 1ère ligne, définition de la surface erronée,\n veuillez éditer le fichier "entries.txt"')
        }
        this.width = size[0]
        this.height = size[1]
      } else {
        if (i === 1 || i % 2 !== 0) {
          if (instructions[i] === '') {
            throw new Error(`erreur à la ligne ${i + 1} de définition de paramètre tondeuse,\n veuillez éditer le fichier "entries.txt"`)
          } else if (instructions[i + 1] === '' || !instructions[i + 1]) {
            throw new Error(`erreur à la ligne ${i + 2} de définition de paramètre tondeuse,\n veuillez éditer le fichier "entries.txt"`)
          }
          this.mowers.push([...this.__toArrayOfNumber(instructions[i].trim().split(' ')), instructions[i + 1].toUpperCase()])
        }
      }
    }
  }
}

(async function init () {
  const file = fs.readdirSync(__dirname).find(file => file === 'entries.txt')
  const content = fs.readFileSync(file, 'utf8')
  const commandes = new Commandes
  try {
    commandes.setInstructions(content.split('\n'))
    const actions = await mowItNow(...Object.values(commandes))
    actions.forEach(action => console.log(action))
  } catch (error) {
    console.log(`Une erreur est survenue: \n ${error.message}`)
  }
})()