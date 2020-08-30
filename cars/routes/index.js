/* eslint-disable import/no-unresolved */
import express from 'express'

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // res.render('index', { title: 'Express', message: 'Hello there!' })
  res.send({ message: 'Welcome to Cars API' });
});

module.exports = router
