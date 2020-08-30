/* eslint-disable radix */
import { Op } from 'sequelize'
import models from '../models/index'

const carModel = models.cars

class cars {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to Cars Api' })
  }

  static getAllCars(req, res) {
    // eslint-disable-next-line no-shadow
    carModel.findAll().then((cars) => {
      res.status(200).send({ message: 'Cars fetched successfully', cars })
    })
  }

  static addCar(req, res) {
    carModel
      .create({
        make: req.body.make,
        colour: req.body.colour,
        year: req.body.year,
        price: req.body.price
      })
      .then((newCar) =>
        res.status(201).send({ message: 'Car added successfully', newCar }))
  }

  static updateCar(req, res) {
    // eslint-disable-next-line radix
    const id = parseInt(req.params.id)
    // eslint-disable-next-line no-shadow
    carModel.findByPk(id).then((cars) => {
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

  static deleteCar(req, res) {
    // eslint-disable-next-line radix
    const id = parseInt(req.params.id)
    carModel.findByPk(id).then((cars) => {
      if (!cars) {
        return res.status(404).send({
          message: 'car not found'
        })
      }
      return cars.destroy().then(() =>
        res.status(204).send({
          message: 'car deleted successfully'
        }))
    })
  }

  static getCar(req, res) {
    const id = parseInt(req.params.id)
    carModel
      .findOne({
        where: {
          id
        }
      })
      .then((cars) => {
        if (!cars) {
          return res.status(404).send({
            message: 'car not found'
          })
        }
        return res.status(201).send({ message: 'Car found successfully', cars })
      })
  }

  static searchCarByMake(req, res) {
    carModel
      .findAll({
        where: {
          make: {
            [Op.substring]: `%${req.query.make}%`
          }
        }
      })
      .then((cars) => {
        res.status(200).send({ cars })
      })
  }

  static searchCarByColour(req, res) {
    carModel.findAll({
      where: {
        genres: {
          [Op.substring]: `%${req.query.colour}%`
        }
      }
    }).then((cars) => {
      res
        .status(200)
        .send({ cars })
    })
  }

  static searchCarByYear(req, res) {
    if (req.query.year) {
      const year = parseInt(req.query.year)
      carModel.findAll({
        where: {
          year: {
            [Op.eq]: year
          }
        }
      }).then((cars) => {
        res.status(200).send({ cars })
      })
    }
    if (req.query.year_greater_than) {
      const year = parseInt(req.query.year_greater_than)
      carModel.findAll({
        where: {
          year: {
            [Op.gt]: year
          }
        }
      }).then((cars) => {
        res.status(200).send({ cars })
      })
    }
    if (req.query.year_less_than) {
      const year = parseInt(req.query.year_less_than)
      carModel.findAll({
        where: {
          year: {
            [Op.lt]: year
          }
        }
      }).then((cars) => {
        res.status(200).send({ cars })
      })
    }
  }

  static searchCarByPrice(req, res) {
    if (req.query.price) {
      const price = parseInt(req.query.price)
      carModel.findAll({
        where: {
          price: {
            [Op.eq]: price
          }
        }
      }).then((cars) => {
        res.status(200).send({ cars })
      })
    }
    if (req.query.price_greater_than) {
      const price = parseInt(req.query.price_greater_than)
      carModel.findAll({
        where: {
          price: {
            [Op.gt]: price
          }
        }
      }).then((cars) => {
        res.status(200).send({ cars })
      })
    }
    if (req.query.price_less_than) {
      const price = parseInt(req.query.price_less_than)
      carModel.findAll({
        where: {
          price: {
            [Op.lt]: price
          }
        }
      }).then((cars) => {
        res.status(200).send({ cars })
      })
    }
  }
}

export default cars
