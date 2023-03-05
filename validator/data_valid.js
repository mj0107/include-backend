const { check, validationResult } = require('express-validator');

const valid = {
    CheckMemberInfo : [
        //check('studentID').isNumeric({min : 7, max : 7}).notEmpty(),
        check('name').notEmpty(),
        check('first_track').notEmpty(),
        check('git_hub').isURL().notEmpty(),
        check('email').isEmail().notEmpty(),
        check('graduation').isInt({ gt : 0, lt : 1}).notEmpty()
    ],

    CheckRegisterInfo : [
        //check('studentID').isNumeric({min : 7, max : 7}).notEmpty(),
        check('name').notEmpty(),
        check('first_track').notEmpty(),
        check('git_hub').isURL().notEmpty(),
        check('email').isEmail().notEmpty(),
        check('graduation').isInt({ gt : 0, lt : 1}).notEmpty()
    ],

    CheckUpdateInfo : [
        check('name').notEmpty(),
        check('first_track').notEmpty(),
        check('git_hub').isURL().notEmpty(),
        check('email').isEmail().notEmpty(),
        check('graduation').isInt({ gt : 0, lt : 1}).notEmpty()
    ],
    
    CheckActivityInfo : [
        check('title').notEmpty(),
        check('details').notEmpty(),
        check('year').isNumeric().isLength({ min : 2, max : 2 }).notEmpty(),
        check('semester').isNumeric().isLength({ min : 1, max : 1 }).notEmpty(),
        check('complete').isInt({ gt : 0, lt : 2}).notEmpty()
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