'use strict'

const mowItNow = require('./lib/mowItNow')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const Commandes = require('./lib/commandes')

async function init () {
  const file = fs.readdirSync(__dirname).find(file => file === 'entries.txt')
  const content = fs.readFileSync(file, 'utf8')
  try {
    const commandes = new Commandes(content).setInstructions()
    const actions = await mowItNow(...Object.values(commandes))
    actions.forEach(action => console.log(action))
  } catch (error) {
    console.log(`Une erreur est survenue: \n ${error.message}`)
  }
}

init()