const router = require('express').Router();
const passport = require('passport');

const User = require('../models/userModel').userSchema;
const Folder = require('../models/folderModel').folderSchema;
const Assignment = require('../models/assignmentModel').assignmentSchema;

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

    router.post('/logout', (req, res) => {

    });

    router.post('/folder', async (req, res) => {
        User.findOne({_id: req.user._id}, (err, user) => {
            if(err) res.status(400).send({ error: err });
            if(user.folders.length < 10){
                user.folders.push(new Folder({
                    name: req.body.name
                }));
                try {
                    await user.save(err => {
                        if(err) res.status(400).send({ error: err });
                        res.status(200).send({ message: "Folder successfully added" })
                    });
                }catch(err){
                    res.status(400).send({ error: err });
                }
            }else{
                res.status(500).send({ error: "Folder limit reached" })
            }
        }).catch(err => {
            res.status(400).send({ error: err });
        });
    });

    router.post('/assignment', (req, res) => {
        
    });

    router.post('/update', (req, res) => {

    });
}