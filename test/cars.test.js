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

describe('Cars Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    await carsModel.create({
      Make: 'Mercedes',
      Colour: 'Black',
      Price: 50000,
      Year: '2017'
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
})
