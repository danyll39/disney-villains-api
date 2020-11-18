const models = require('../models')



const getAllVillains = async (request, response) => { // grab all teams and return
  const villains = await models.Villains.findAll()

  return response.send(villains)
}

module.exports = { getAllVillains }
