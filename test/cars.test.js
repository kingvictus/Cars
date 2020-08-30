/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { expect } from 'chai'
import supertest from 'supertest'
import server from '../app'
import models from '../models'

const chai = require('chai')

const should = chai.should()

const request = supertest.agent(server)

describe('Cars Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    await carsModel.create({
      make: 'mercedes',
      colour: 'red',
      year: 2017,
      price: 50000
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

  describe('/GET Get all cars', () => {
    it('it should GET all the cars', (done) => {
      request.get('/api/v1/cars').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.cars).to.be.an('array')
        expect(res.body.message).be.equal('Cars fetched successfully')
        done()
      })
    })
  })
})
