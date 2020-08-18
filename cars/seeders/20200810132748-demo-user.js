/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'cars',
      [
        {
          make: 'Ferrari',
          model: 'California Rosso',
          colour: 'Red',
          year: 2015,
          price: 240000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          make: 'Mercedes',
          model: 'SLS AMG',
          colour: 'Black',
          year: 2016,
          price: 150000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          make: 'Maserati',
          model: 'Grand Tourer',
          colour: 'White',
          year: 2017,
          price: 250000,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('cars', null, {})
}
