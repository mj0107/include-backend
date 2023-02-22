const express = require("express");
const router = express.Router();
const passport = require('passport');
const authhepler = require('../auth/_helper');

//html
// http://localhost:8080/login
// router.get('/login', async(req, res) => {
//     res.render('signin/login');
// })

// http://localhost:8080/login
// router.post('/login', passport.authenticate('local', {
//     //html
//     // successRedirect : '/',
//     // failureRedirect : '/login',

//     //react
//     failureFlash : true,
//     successFlash : 'Welcome!'
//   }), (req, res) => {
//     console.log(req);
//     res.redirect('/');
// });

// http://localhost:8080/login
router.post('/login', authhepler.isNotLoggedIn, (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
        failureFlash : true,
        successFlash : 'Welcome!'
    }), (req, res, next);
});


//로그아웃 페이지는 따로 필요할 거 같지 않은데, 머릿속에 난장판이라 안돌아가요 필요하면 말해주세요

// http://localhost:8080/logout
router.post('/logout', (req, res, next) => {
    //authhepler.loginRequired, 
    req.logout();
    //react
    handleResponse(res, 200, 'logout success');
    //html
    //res.redirect('/');
});

//어디서 쓰임?
// let handleLogin = (req, user) => {
//     return new Promise((resolve, reject) => {
//         req.login(user, (err) => {
//             if (err) reject(err);
//             resolve();
//         });
//     });
// }

let handleResponse = (res, code, statusMsg) => {
    res.status(code).json({ status: statusMsg })
}

module.exports = router;