const Sequelize = require('sequelize')
const villainsModel = require('./Villains')

const connection = new Sequelize('disney'// database
  , 'villains'// name of user
  , 'Vi11Ains!'// password
  , {
    host: 'localhost', dialect: 'mysql'
  })

const Villains = villainsModel(connection, Sequelize)

module.exports = { Villains }
