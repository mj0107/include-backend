const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('./middleware');

// http://localhost:8080/logout
router.post('/', isLoggedIn, (req, res) => {

    req.logout();
    req.session.destroy();
    //react
    //res.status(200).json({ message : "logout success"});
    //html
    res.redirect('/');
});

module.exports = router;