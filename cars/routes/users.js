import express from 'express'
import cars from '../controllers/cars'

/* GET users listing. */
const router = express.Router();

router.get('/cars', cars.getAllCars)
router.post('/cars', cars.addCar)
router.put('/cars/:id', cars.updateCar)

module.exports = router;
