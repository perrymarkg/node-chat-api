const { check, validationResult } = require('express-validator/check');

exports.auth = [
    check('username').exists(),
    check('password').isLength({ min: 5 }).withMessage("Must be 5 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];