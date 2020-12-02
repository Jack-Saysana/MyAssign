const router = require('express').Router();
const passport = require('passport');

const User = require('../models/userModel').userSchema;
const Folder = require('../models/folderModel').folderSchema;
const Assignment = require('../models/assignmentModel').assignmentSchema;

router.post('/signup', (req, res) => {
    passport.authenticate('local-signup', (err, user) => {
        if (err) res.status(500).send({ error: err });
        if (user) {
            req.login(user, err => {
                if (err) res.status(500).send({ error: err });
                res.status(200).send({
                    user: user
                })
            });
        }
    })(req, res);
});

router.post('/login', (req, res) => {
    passport.authenticiate('local-login', (err, user) => {
        if (err) res.status(500).send({ error: err });
        if (user) {
            req.login(user, err => {
                if (err) res.status(500).send({ error: err });
                res.status(200).send({
                    user: user
                })
            });
        }
    })(req, res);
});

router.post('/logout', (req, res) => {

});

router.post('/folder', async (req, res) => {
    User.findOne({_id: req.body._id}, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(500).send({ error: err });
        if(user.folders.length < 10){
            user.folders.push(new Folder({
                name: req.body.name
            }));
            try {
                await user.save(err => {
                    if(err) res.status(500).send({ error: err });
                    res.status(200).send({ message: "Folder successfully added" })
                });
            }catch(err){
                res.status(500).send({ error: err });
            }
        }else{
            res.status(400).send({ error: "Folder limit reached" })
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

router.post('/assignment', async (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(400).send({ error: err });
        user.folders.id(req.body.folder).assignments.push(new Assignment({
            title: req.body.title,
            annotations: {
                notes: (req.body.notes ? req.body.notes : ""),
                due: (req.body.due ? req.body.due : undefined),
                reoccuring: req.body.reoccuring
            }
        }));
        try {
            await user.save(err => {
                if(err) res.status(500).send({ error: err });
                res.status(200).send({ message: "Assignment successfully added" });
            });
        }catch(err){
            res.status(500).send({ error: err });
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

router.post('/updateAssignment', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(400).send({ error: err });
        user.folders.id(req.body.folder).assignments.id(req.body.assignment) = {
            title: req.body.title,
            annotations: {
                notes: (req.body.notes ? req.body.notes : ""),
                due: (req.body.due ? req.body.due : undefined),
                reoccuring: req.body.reoccuring
            },
            completed: req.body.completed
        };
        try {
            await user.save(err => {
                if(err) res.status(500).send({error: err});
                res.status(200).send({message: "Assignment successfully updated"});
            });
        }catch(err){
            res.status(500).send({error: err});
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

router.delete('/deleteAssignment', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(400).send({error: err});
        user.folders.id(req.body.folder).assignments.id(req.body.assignment).remove();
        try {
            await user.save(err => {
                if(err) res.status(500).send({error: err});
                res.status(200).send({ message: "Assignment successfully deleted"});
            })
        }catch(err){
            if(err) res.status(500).send({error: err});
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

router.post('/updateFolder', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(400).send({ error: err });
        user.folders.id(req.body.folder) = {
            name: req.body.name
        }
        try {
            await user.save(err => {
                if (err) res.status(500).send({ error: err });
                res.status(200).send({ message: "Folder successfully updated" });
            });
        }catch(err){
            if (err) res.status(500).send({ error: err });
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

router.delete('/deleteFolder', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if (err) res.status(400).send({ error: err });
        user.folders.id(req.body.folder).remove();
        try {
            await user.save(err => {
                if (err) res.status(500).send({ error: err });
                res.status(200).send({ message: "Folder successfully deleted" });
            })
        } catch (err) {
            if (err) res.status(500).send({ error: err });
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

router.get('/assignments', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(400).send({ error: err });
        res.status(200).send({ assignments: user.folders.id(req.body.folder).assignments });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

router.get('/folders', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(400).send({ error: err });
        res.status(200).send({ folders: user.folders });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

module.exports = router;