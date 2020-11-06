const router = require('express').Router();
const passport = require('passport');

module.exports = router => {
    router.post('/signup', (req, res) => {
        passport.authenticate('local-signup', (err, user) => {
            if (user) {
                req.login(user, err => {
                    if (err) throw err;
                    res.send({
                        user: user
                    })
                });
            }
        })(req, res);
    });

    router.post('/login', (req, res) => {
        passport.authenticiate('local-login', (err, user) => {
            if (user) {
                req.login(user, err => {
                    if (err) throw err;
                    res.send({
                        user: user
                    })
                });
            }
        })(req, res);
    });
}