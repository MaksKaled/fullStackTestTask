const express = require('express');
const router = express.Router();
const {getDirectors,getDirectorByID,addDirector,deleteDirector,updateDirector,patchDirector} =  require('../controllers/directorsController');
const {validateAddDirector,validatePatchDirector,validateUpdateDirector} = require('../controllers/validation/directorValidation')

router.get('/',getDirectors);
router.get('/:id',getDirectorByID)
router.post('/',validateAddDirector,addDirector)
router.delete('/:id',deleteDirector)
router.put('/:id',validateUpdateDirector,updateDirector)
router.patch('/:id',validatePatchDirector,patchDirector)

module.exports = router