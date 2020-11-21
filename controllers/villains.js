const models = require('../models')

const getAllVillains = async (request, response) => {
  try {
    const villains = await models.Villains.findAll()

    return response.send(villains)
  } catch (error) {
    return response.status(400)
  }
}
const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const foundVillain = await models.Villains.findOne({ where: { slug } })

    return response.send(foundVillain)
  } catch (error) {
    return response.status(400)
  }
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
