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

  static addCars(req, res) {
    carsModel.create({
      make: req.body.make,
      colour: req.body.colour,
      year: req.body.year,
      price: req.body.price
    // eslint-disable-next-line arrow-body-style
    }).then((newCar) => {
      return res
        .status(201)
        .send({ message: 'Car added successfully', newCar })
    })
  }
}

export default cars
