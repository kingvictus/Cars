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

describe('Cars Api', () => {
  describe('Index route', () => {
    it('should return welcome message when / route is matched', (done) => {
      request.get('/api/v1').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.message).be.equal('Welcome to Cars Api')
        done()
      })
    })
  })
})
