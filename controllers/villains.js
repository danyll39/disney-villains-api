const models = require('../models')

const getAllVillains = async (request, response) => {
  try {
    const villains = await models.villains.findAll()

    return response.send(villains)
  } catch (error) {
    return response.status(500).send('Unknown error while retrieving all villains')
  }
}
const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params
    const foundVillain = await models.villains.findOne({ where: { slug } })

    return response.send(foundVillain)
  } catch (error) {
    return response.status(500).send('Unknown error while retrieving villain')
  }
}
const saveNewVillain = async (request, response) => {
  try {
    const { name, movie, slug } = request.body

    if (!name || !movie || !slug) {
      return response.status(400).send('The following fields are required: name, movie, slug')
    }
    const newVillain = await models.villains.create({ name, movie, slug })

    return response.status(201).send(newVillain)
  } catch (error) {
    return response.status(500).send('Unknown error while saving new villain')
  }
}

module.exports = { getAllVillains, getVillainBySlug, saveNewVillain }
