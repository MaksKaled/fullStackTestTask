const {body,param} = require('express-validator')

const validateAddDirector = [
    body('name')
        .isString()
        .notEmpty().withMessage('name can\'t be empty.')
        .matches(/^[A-Za-z]+$/).withMessage('name must contain only EN letters.'),
    body('birth_date')
        .isISO8601().withMessage('date of birth must be in format YYYY-MM-DD.'),
    body('nationality')
        .isString()
        .notEmpty().withMessage('nationality can\'t be empty.')
        .matches(/^[A-Za-z]+$/).withMessage('nationality must contain only EN letters.'),
    body('experience_years')
        .isInt({ min: 0 }).withMessage('years of experience must be a positive number.'),
    body('rating')
        .isFloat({ min: 0, max: 10 }).withMessage('rating must be between 0 and 10.'),
];

const validateUpdateDirector = [
    param('id').isInt().withMessage('ID must be a number.'),
    body('name')
        .optional()
        .isString()
        .matches(/^[A-Za-z]+$/).withMessage('name must contain only EN letters.'),
    body('birth_date')
        .optional()
        .isISO8601().withMessage('date of birth must be in format YYYY-MM-DD.'),
    body('nationality')
        .optional()
        .isString()
        .matches(/^[A-Za-z]+$/).withMessage('nationality must contain only EN letters.'),
    body('experience_years')
        .optional()
        .isInt({ min: 0 }).withMessage('years of experience must be a positive number.'),
    body('rating')
        .optional()
        .isFloat({ min: 0, max: 10 }).withMessage('rating must be between 0 and 10.'),
];

const validatePatchDirector = [
    param('id').isInt().withMessage('ID must be a number.'),
    body('name')
        .optional()
        .isString()
        .matches(/^[A-Za-z]+$/).withMessage('name must contain only EN letters.'),
    body('birth_date')
        .optional()
        .isISO8601().withMessage('date of birth must be in format YYYY-MM-DD.'),
    body('nationality')
        .optional()
        .isString()
        .matches(/^[A-Za-z]+$/).withMessage('nationality must contain only EN letters.'),
    body('experience_years')
        .optional()
        .isInt({ min: 0 }).withMessage('years of experience must be a positive number.'),
    body('rating')
        .optional()
        .isFloat({ min: 0, max: 10 }).withMessage('rating must be between 0 and 10.'),
];

module.exports = { validateAddDirector, validateUpdateDirector, validatePatchDirector };

