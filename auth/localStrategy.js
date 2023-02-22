const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const admin = require('../model/admin');
const bcrypt = require('bcrypt');


module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password' 
    }, (id, pwd, done) => {
            admin.signin.findAdmin(id)
                .then((user) => {
                    console.log(user.pwd);
                    if (!user)
                        return done(null, false, { message: 'Not admin' });
                    if (!bcrypt.compareSync(pwd, user.password))
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


