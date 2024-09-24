const express = require('express');
const router = express.Router();
const {getDirectors,getDirectorByID,addDirector,deleteDirector,updateDirector,patchDirector} =  require('../conrollers/directorsController');

router.get('/',getDirectors);
router.get('/:id',getDirectorByID)
router.post('/',addDirector)
router.delete('/:id',deleteDirector)
router.put('/:id',updateDirector)
router.patch('/:id',patchDirector)

module.exports = router