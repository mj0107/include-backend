const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('./middleware');
require('express-session');

// http://localhost:8080/logout
router.post('/', isLoggedIn, (req, res, next) => {


    req.logout((err) => {
        if(err)
            return next(err);
        req.session.destroy((err) => {
            if(err)
                return next(err);
            //react
            //res.status(200).json({ message : "logout success"});
            //html
            res.redirect('/');
        })

    })
});

module.exports = router;