import express from 'express'

import cars from '../controllers/cars'

const router = express.Router();

/* GET home page. */

router.get('/', cars.welcome)

module.exports = router
