const express = require("express");
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require('./middleware');
require('express-session');

//html
// http://localhost:8080/login
// router.get('/', async(req, res) => {
//     res.render('signin/login');
// })

//http://localhost:8080/login
router.post('/', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);

        if (!user)  {
            //react
            return handleResponse(res, 404, info);
            //html
            // res.redirect('/login')
        }

        return req.logIn(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            //react
            handleResponse(res, 200, 'login success');
            //html
            // res.redirect('/');
        });
    }) (req, res, next);
});

module.exports = router;