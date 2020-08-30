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

  static addCar(req, res) {
    carsModel
      .create({
        make: req.body.make,
        colour: req.body.colour,
        year: req.body.year,
        price: req.body.price
      })
      .then((newCar) => res
        .status(201)
        .send({ message: 'Car added successfully', newCar }))
  }

  static updateCar(req, res) {
    // eslint-disable-next-line radix
    const id = parseInt(req.params.id)
    // eslint-disable-next-line no-shadow
    carsModel.findByPk(id).then((cars) => {
      cars
        .update({
          make: req.body.make || cars.make,
          colour: req.body.colour || cars.colour,
          year: req.body.year || cars.year,
          price: req.body.price || cars.price
        })
        .then((updatedcar) => {
          res
            .status(201)
            .send({ message: 'Car added successfully', updatedcar })
        })
    })
  }
}

export default cars
