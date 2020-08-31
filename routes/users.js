/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express'
import User from '../handlers/user'

const router = express.Router()

router.post('/signup', User.signUp)

module.exports = router
