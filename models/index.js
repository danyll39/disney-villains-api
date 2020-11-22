const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('disney'// database
  , 'villains'// name of user
  , 'Vi11Ains!'// password
  , {
    host: 'localhost', dialect: 'mysql'
  })
const villains = villainsModel(connection, Sequelize)

module.exports = { villains }
