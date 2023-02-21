const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const admin = require('../model/admin');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, { id : user.id, name : user.name });
    });
  
    passport.deserializeUser((id, done) => {
        admin.signin.findAdmin(id)
        .then((user) => { done(null, user); })
        .catch((err) => { done(err, null); });
    });

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pwd' 
    }, (id, pwd, done) => {
            admin.signin.findAdmin(id)
                .then((user) => {
                    if (!user)
                        return done(null, false), { message: 'Not admin' };
                    if (!bcrypt.compareSync(pwd, user.pwd))
                        return done(null, false, { message: 'wrong password' });
                    else
                        return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                })
    
            }
        )
    )
}


