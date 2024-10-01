const {body,param} = require('express-validator')

const validateAddMovie = [
    body('title')
        .isString()
        .notEmpty().withMessage('title can\'t be empty.')
        .matches(/^[A-Za-z0-9\s]+$/).withMessage('name must contain only EN letters, numbers and spaces.'),
    body('release_date')
        .isISO8601().withMessage('release date must be in format YYYY-MM-DD.'),
    body('budget')
        .isFloat({min:0}).withMessage('Budget must be a positive number.'),
    body('duration_minutes')
        .isInt({ min: 0 }).withMessage('duration must be a positive number.'),
    body('director_id')
        .isInt().withMessage('director id must be a a number')
];

const validateUpdateMovie = [
    param('id').isInt().withMessage('ID must be a number.'),
    body('title')
        .isString()
        .notEmpty().withMessage('title can\'t be empty.')
        .matches(/^[A-Za-z0-9\s]+$/).withMessage('name must contain only EN letters, numbers and spaces.'),
    body('release_date')
        .isISO8601().withMessage('release date must be in format YYYY-MM-DD.'),
    body('budget')
        .isFloat({min:0}).withMessage('Budget must be a positive number.'),
    body('duration_minutes')
        .isInt({ min: 0 }).withMessage('duration must be a positive number.'),
    body('director_id')
        .isInt().withMessage('director id must be a a number')
];

const validatePatchMovie = [
    param('id').isInt().withMessage('ID must be a number.'),
    body('title')
    .optional()
        .isString()
        .notEmpty().withMessage('title can\'t be empty.')
        .matches(/^[A-Za-z0-9\s]+$/).withMessage('name must contain only EN letters, numbers and spaces.'),
    body('release_date')
    .optional()
        .isISO8601().withMessage('release date must be in format YYYY-MM-DD.'),
    body('budget')
    .optional()
        .isFloat({min:0}).withMessage('Budget must be a positive number.'),
    body('duration_minutes')
    .optional()
        .isInt({ min: 0 }).withMessage('duration must be a positive number.'),
    body('director_id')
    .optional()
        .isInt().withMessage('director id must be a a number')
];

module.exports = { validateAddMovie, validateUpdateMovie, validatePatchMovie };

