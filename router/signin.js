const express = require("express");
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

//html
// http://localhost:8080/login
// router.get('/login', async(req, res) => {
//     res.render('signin/login');
// })

//http://localhost:8080/login
router.post('/', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('loginError', info.message);
            return res.json(info);
        }
        return req.logIn(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.json({ message: "login success" });
        });
    }) (req, res, next);
});

//새로운 문법
// router.route('/')
// .get((req, res) => {
//     res.json("test");
// })
// .post(isNotLoggedIn, passport.authenticate('local', {
//     successMessage : 'welcome',
//     failureMessage : 'fail'
// }))

//로그아웃 페이지는 따로 필요할 거 같지 않은데, 머릿속에 난장판이라 안돌아가요 필요하면 말해주세요

// http://localhost:8080/logout
router.post('/logout', (req, res, next) => {
    //authhepler.loginRequired, 
    req.logout();
    req.session.destroy();
    handleResponse(res, 200, 'logout success');
    //html
    //res.redirect('/');
});

let handleResponse = (res, code, statusMsg) => {
    res.status(code).json({ status: statusMsg })
}

module.exports = router;