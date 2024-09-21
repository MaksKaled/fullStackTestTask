const express = require('express');
const router = express.Router();
const {getMovies,addMovie} = require('../conrollers/moviesController');

router.get('/',getMovies)
router.post('/',addMovie)

module.exports = router;