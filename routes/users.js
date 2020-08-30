import express from 'express'
import cars from '../controllers/cars'
import validateAddCar from '../middleware/cars'
/* GET users listing. */
const router = express.Router();

router.get('/cars', cars.getAllCars)
router.post('/cars', cars.addCar)
router.put('/cars/:id', cars.updateCar)
router.delete('/cars/:id', cars.deleteCar)
router.get('/cars/:id', cars.getCar)
router.get('/cars/make', cars.searchCarByMake)
router.get('/cars/colour', cars.searchCarByColour)
router.get('/cars/year', cars.searchCarByYear)
router.post('/movies', validateAddCar, cars.addCar)

module.exports = router;
