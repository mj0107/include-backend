const { check, validationResult } = require('express-validator');

const valid = {
    CheckRegisterInfo : [
        check('studentID').isNumeric({min : 7, max : 7}).notEmpty(),
        check('git_hub').isURL().notEmpty(),
        check('email').isEmail().notEmpty(),
        check('graduation').isInt().notEmpty(),
    ],

    CheckUpdateInfo : [
        check('git_hub').isURL().notEmpty(),
        check('email').isEmail().notEmpty(),
        check('graduation').isInt().notEmpty(),
    ],
    
    CheckRegistActivityInfo : [
        check('title').notEmpty(),
        check('details').notEmpty(),
        check('year').isNumeric().isLength({ min : 2, max : 2 }).notEmpty(),
        check('semester').isNumeric().isLength({ min : 1, max : 1 }).notEmpty(),
        check('complete').isNumeric().notEmpty()
    ],

    CheckUpdateActivityInfo : [
        check('title').notEmpty(),
        check('details').notEmpty(),
        check('year').isNumeric().isLength({ min : 2, max : 2 }).notEmpty(),
        check('semester').isNumeric().isLength({ min : 1, max : 1 }).notEmpty(),
        check('complete').isNumeric().notEmpty()
    ],

    errorCallback : (req, res, next) => {
        const errors = validationResult(req);
        if(Object.keys(errors).length === 0 )   {
            res.json(errors);
        }
        else
            next();
    }
}

module.exports = valid;