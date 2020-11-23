const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('disney', 'villains', 'Vi11Ains!', {
  host: 'localhost', dialect: 'mysql'
})
const villains = villainsModel(connection, Sequelize)

module.exports = { villains }
