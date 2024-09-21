const express = require('express');
const router = express.Router();
const {getMovies,addMovie, deleteMovie,updateMovie,patchMovie} = require('../conrollers/moviesController');

router.get('/',getMovies)
router.post('/',addMovie)
router.delete('/:id',deleteMovie)
router.put('/:id',updateMovie)
router.patch('/:id',patchMovie)

module.exports = router;