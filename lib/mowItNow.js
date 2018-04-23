const Promise = require('bluebird')
const Mower = require('./mower')
const Space = require('./space')
const validator = require('./validator')


module.exports = async function mowItNow (width, height , mowers) {
  const mowersList = []

  try {
   validator(width, height, mowers)
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
