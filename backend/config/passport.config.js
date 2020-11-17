const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel').userSchema;

module.exports = passport => {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
        async (req, username, password, done) => {
            if(!await User.exists({email: username})){
                let newUser = new User({
                    name: req.body.name,
                    email: username
                });
                newUser.password = newUser.hashPassword(password);
                await newUser.save(err => {
                    if(err) {
                        console.log(err);
                        return done(null, false);
                    }
                    return done(null, newUser);
                });
            }else{
                return done(null, false);
            }
        }
    ));
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email'
    },
        async (username, password, done) => {
            User.findOne({email: username}, (err, user) => {
                if(err) {
                    console.log(err);
                    return done(null, false);
                }
                if(!user || !user.checkPassword(password)){
                    return done(null, false);
                }else{
                    return done(null, user);
                }
            })
        }
    ))
}