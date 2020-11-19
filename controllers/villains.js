const models = require('../models')



const getAllVillains = async (request, response) => { // grab all villain 
  const villains = await models.Villains.findAll()

  return response.send(villains)
}

const getVillainBySlug = async (request, response) => { // find one villain 
  const { slug } = request.params

  const foundVillain = await models.Villains.findOne({ where: { slug } })

  return response.send(foundVillain)
}



module.exports = { getAllVillains, getVillainBySlug }
