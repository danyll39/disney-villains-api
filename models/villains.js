const villains = (connection, Sequelize) => {
  return connection.define('villains', {

    name: { type: Sequelize.STRING },
    movie: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING, autoIncrement: true, primaryKey: true }, // autoIncrement ??

  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } // change to include?
    }
  }, { paranoid: true })
}

module.exports = villains
