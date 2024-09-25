const express = require('express');
const router = express.Router();
const {getMovies,addMovie, deleteMovie,updateMovie,patchMovie,getMovieById} = require('../controllers/moviesController');

router.get('/',getMovies)
router.get('/:id',getMovieById)
router.post('/',addMovie)
router.delete('/:id',deleteMovie)
router.put('/:id',updateMovie)
router.patch('/:id',patchMovie)

module.exports = router;