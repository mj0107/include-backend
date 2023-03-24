const express = require("express");
const router = express.Router();
require('express-session');

router.get('/', (req, res) => {

    let verified = Object.assign({}, req.session.passport);
    if (Object.values(verified).toString() === 'admin') {
        res.render('home', { isLoggedIn : 1 });
    }
    else
        res.render('home' , { isLoggedIn : 0 });

})


module.exports = router;