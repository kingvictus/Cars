import models from '../models/index'

const carsModel = models.cars

class cars {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to Cars Api' })
  }

  static getAllCars(req, res) {
    // eslint-disable-next-line no-shadow
    carsModel.findAll().then((cars) => {
      res.status(200).send({ message: 'Cars fetched successfully', cars })
    })
  }
}

export default cars
