const passport = require('passport');
const admin = require('../model/admin');s

passport.serializeUser((user, done) => {
    done(null, { id : user.id, name : user.name });
});

passport.deserializeUser((id, done) => {
    admin.signin.findAdmin(id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
});
