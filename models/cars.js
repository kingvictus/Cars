module.exports = (sequelize, DataTypes) => {
  const cars = sequelize.define(
    'cars',
    {
      make: DataTypes.STRING,
      model: DataTypes.STRING,
      year: DataTypes.INTEGER,
      colour: DataTypes.TEXT,
      price: DataTypes.INTEGER
    },
    {}
  )
  cars.associate = () => {

  }
  return cars
}
