const local = require('./localStrategy');
const admin = require('../model/admin');
const passport = require('passport');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        admin.signin.findAdmin(id)
            .then((user) => {
                return done(null, user)
            })
            .catch((err) => done(err));
    });

    local();
};