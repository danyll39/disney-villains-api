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
const saveNewVillain = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('The following fields are required: name, movie, slug')
  }

  const newVillain = await models.Villains.create({ name, movie, slug })

  return response.status(201).send(newVillain)
}



module.exports = { getAllVillains, getVillainBySlug, saveNewVillain }
