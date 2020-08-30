import express from 'express'
import cars from '../controllers/cars'

/* GET users listing. */
const router = express.Router();

router.get('/cars', cars.getAllCars)
router.post('/cars', cars.addCars)

module.exports = router;
