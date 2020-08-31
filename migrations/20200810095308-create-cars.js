/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      make: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      colour: {
        type: Sequelize.STRING
      },
      year: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('cars')
}
