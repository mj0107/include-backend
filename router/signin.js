const express = require("express");
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../auth/localStrategy');
const authhepler = require('../auth/_helper');

//html
// http://localhost:8080/login
// router.get('/login', async(req, res) => {
//     res.render('signin/login');
// })

// http://localhost:8080/login
router.post('/login', passport.authenticate('local', {
    //html
    // successRedirect : '/',
    // failureRedirect : '/login',

    //react
    //error msg callback
    failureFlash : true,
    //성공했을 때 상태값 전달 --> 이렇게 전달하는게 좋을려나
    successFlash : 'Welcome!'
  }), (req, res) => {
    res.redirect('/');
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