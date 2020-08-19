import express from 'express'
import cars from '../controllers/cars'

/* GET users listing. */
const router = express.Router();

router.get('/cars', cars.getAllCars)

module.exports = router;
