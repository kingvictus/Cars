/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-unresolved
import { expect } from 'chai'
import supertest from 'supertest'
import server from '../app'

const chai = require('chai')

const should = chai.should()

const request = supertest.agent(server)
const carsModel = models.cars

let carToDelete = {}
let newCar = {}

describe('Cars Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    newCar = await carsModel.create({
      make: 'Mercedes',
      model: 'GLE',
      colour: 'Black',
      price: 50000,
      year: '2017'
    })
    carToDelete = await carsModel.create({
      make: 'Bentley',
      model: 'flying spur',
      colour: 'Blue',
      price: 300000,
      year: '2017'
    })
  })
  after(async () => {
    // empty the database
    await carsModel.destroy({ where: {} })
  })
  describe('Index route', () => {
    it('should return welcome message when / route is matched', (done) => {
      request.get('/api/v1').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.message).be.equal('Welcome to Cars Api')
        done()
      })
    })
  })
  describe('Get all Cars', () => {
    it('it should GET all cars', (done) => {
      request.get('/cars').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.cars).to.be.an('array')
        expect(res.body.message).be.equal('Cars retrieved successfully')
        done()
      })
    })
  })
  describe('Update cars route', () => {
    it('should UPDATE a car by the id', (done) => {
      request
        .put(`/cars/${newCar.id}`)
        .send({
          make: 'Ferrari',
          model: 'California',
          colour: 'Red',
          price: 250000,
          year: '2018'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).be.equal('Car updated successfully')
          done()
        })
    })
  })

  describe('Delete car', () => {
    it('should DELETE a Car given the id', (done) => {
      request.delete(`/api/v1/cars/${carToDelete.id}`).end((err, res) => {
        res.status.should.be.equal(204)
        done()
      })
    })
    it('should return Car does not exist', (done) => {
      request.delete('/api/v1/cars/808020').end((err, res) => {
        res.status.should.be.equal(404)
        expect(res.body.message).be.equal('Car not found')
        done()
      })
    })
  })
})
