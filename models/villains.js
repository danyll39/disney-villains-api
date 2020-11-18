const villains = (connection, Sequelize) => {
  return connection.define('villains', {
    slug: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    movie: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },

  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = villains
