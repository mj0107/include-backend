const admin = require('../model/admin');
const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

module.exports = () => {
    passport.use(new localStrategy({
        usernameField: 'id',  //req.body.id
        passwordField: 'pwd', //req.body.pwd
        session: true,
        passReqToCallback: false
    }, (id, pwd, done) => {
        admin.signin.findAdmin(id)
            .then((user) => { // { id : "" , password : "" }
                if (user === undefined) {
                    return done(null, false, { message: 'Not admin' });
                }
                else {
                    if (!(bcrypt.compareSync(pwd, user.password)))
                        return done(null, false, { message: 'wrong password' });
                    else
                        return done(null, user, { message: 'success' });
                }
            })
            .catch((err) => {
                return done(err);
            })
    }))
}