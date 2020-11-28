const models = require('../models')

const getAllVillains = async (request, response) => {
  try {
    const villains = await models.villains.findAll()

    return response.send(villains)
  } catch (error) {
    return response.status(500).send('Unknown error while retrieving villain')
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params
    const foundVillain = await models.villains.findOne({ where: { slug } })

    return foundVillain
      ? response.send(foundVillain)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve villain, please try again')
  }
}
const saveNewVillain = async (request, response) => {
  try {
    const { name, movie, slug } = request.body

    if (!name || !movie || !slug) {
      return response.status(404).send('The following fields are required: name, movie, slug')
    }
    const newVillain = await models.villains.create({ name, movie, slug })

    return response.status(201).send(newVillain)
  } catch (error) {
    return response.status(500).send('Unable to save villain, please try again')
  }
}


module.exports = { getAllVillains, getVillainBySlug, saveNewVillain }
