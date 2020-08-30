import isNumeric from 'validator/lib/isNumeric'

// eslint-disable-next-line consistent-return
const validateAddCar = (req, res, next) => {
  if (!req.body.title.trim()) {
    return res.status(400).send({ message: 'Make cannot be empty' })
  }
  if (!req.body.writers.trim()) {
    return res.status(400).send({ message: 'Colour cannot be empty' })
  }
  if (!isNumeric(req.body.year)) {
    return res.status(400).send({ message: 'Year must be a number' })
  }
  if (!isNumeric(req.body.price)) {
    return res.status(400).send({ message: 'Price must be a number' })
  }
  next()
}

export default validateAddCar
