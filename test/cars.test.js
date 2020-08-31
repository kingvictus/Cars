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

  describe('Add cars route', () => {
    it('should Add Cars', (done) => {
      request
        .post('/api/v1/cars')
        .send({
          make: 'Mercedes',
          model: 'GLE',
          colour: 'Black',
          price: 50000,
          year: '2017'
        })
        .end((err, res) => {
          res.status.should.be.equal(201)
          expect(res.body.message).be.equal('Car added successfully')
          done()
        })
    })
    it('should Add Car when id does not exist', (done) => {
      request
        .post('/api/v1/cars/2222')
        .send({
          make: 'Mercedes',
          model: 'GLE',
          colour: 'Black',
          price: 50000,
          year: '2017'
        })
        .end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).be.equal(undefined)
          done()
        })
    })
    it('should return Year must be a number if the year passed isnt a number', (done) => {
      request
        .post('/api/v1/cars')
        .send({
          make: 'Mercedes',
          model: 'GLE',
          colour: 'Black',
          price: 50000,
          year: '2017'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Year must be a number')
          done()
        })
    })
    it('should return make cannot be empty if user doesnt put a make', (done) => {
      request
        .post('/api/v1/cars')
        .send({
          make: 'Mercedes',
          model: 'GLE',
          colour: 'Black',
          price: 50000,
          year: '2017'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Make cannot be empty')
          done()
        })
    })
    it('should return model cannot be empty if user doesnt put an model', (done) => {
      request
        .post('/api/v1/cars')
        .send({
          make: 'Mercedes',
          model: 'GLE',
          colour: 'Black',
          price: 50000,
          year: '2017'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Model cannot be empty')
          done()
        })
    })
  })
  describe('Get single Car', () => {
    it('it should GET a car by id', (done) => {
      request.get(`/api/v1/cars/${newCar.id}`).end((err, res) => {
        res.status.should.be.equal(201)
        res.body.should.be.a('object')
        expect(res.body.movie).to.have.property('make')
        expect(res.body.movie).to.have.property('model')
        expect(res.body.movie).to.have.property('colour')
        done()
      })
    })
    it('it should GET a car by id', (done) => {
      request.get('/api/v1/cars/8888').end((err, res) => {
        res.status.should.be.equal(404)
        expect(res.body.message).to.equal('car not found')
        done()
      })
    })
  })
  describe('Get Car By make route', () => {
    it('should get car by make', (done) => {
      request
        .get('/api/v1/cars/make')
        .query({ make: 'maserati' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
  describe('Get Car By model route', () => {
    it('should get car by model', (done) => {
      request
        .get('/api/v1/cars/model')
        .query({ model: 'grand tourer' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
  describe('Get Car By colour route', () => {
    it('should get car by colour', (done) => {
      request
        .get('/api/v1/cars/colour')
        .query({ colour: 'silver' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
})
