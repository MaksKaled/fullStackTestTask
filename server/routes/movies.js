const express = require('express');
const router = express.Router();
const {getMovies,addMovie, deleteMovie,updateMovie,patchMovie,getMovieById} = require('../controllers/moviesController');
const {validateAddMovie,validatePatchMovie,validateUpdateMovie} = require('../controllers/validation/moviesValidation')
router.get('/',getMovies)
router.get('/:id',getMovieById)
router.post('/',validateAddMovie,addMovie)
router.delete('/:id',deleteMovie)
router.put('/:id',validateUpdateMovie,updateMovie)
router.patch('/:id',validatePatchMovie,patchMovie)

module.exports = router;