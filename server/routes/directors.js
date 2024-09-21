const express = require('express');
const router = express.Router();
const getDirectors =  require('../conrollers/directorsController');

router.get('/',getDirectors);

module.exports = router