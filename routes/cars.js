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
router.get('/cars/make', cars.searchCarByModel)
router.get('/cars/make', cars.searchCarByPrice)
router.get('/cars/colour', cars.searchCarByColour)
router.get('/cars/year', cars.searchCarByYear)
router.post('/movies', validateAddCar, cars.addCar)
router.post('/signup', cars.signUp)

module.exports = router;
