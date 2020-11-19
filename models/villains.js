const villains = (connection, Sequelize) => {
  return connection.define('villains', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    movie: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING } // autoIncrement ??

  }, {
    defaultScope: {
      attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt'] } // change to include?
    }
  }, { paranoid: true })
}

module.exports = villains
