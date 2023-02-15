const express = require("express");
const router = express.Router();
const admin = require('../model/admin');
const bcrypt = require('bcrypt');

router.get('/', async(req, res) => {
    res.render('signup/signup.html');
})


// {
//     "id" : "Admin",
//     "pwd" : 1234
// }

// http://localhost:8080/signup
router.post('/', async(req, res) => {
    
    let adminData = {
        id : req.body.id,
        pwd : req.body.pwd
    };

    let encryptPwd = bcrypt.hashSync(adminData.pwd, 10);

    let actualInputValue = {
        id : adminData.id,
        pwd : encryptPwd,
        name : 'admin'
    };

    await admin.signup.createAdmin(actualInputValue, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.log(err);
        }
    }) 
})

module.exports = router;