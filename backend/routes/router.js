const router = require('express').Router();
const passport = require('passport');

const User = require('../models/userModel').userSchema;
const Folder = require('../models/folderModel').folderSchema;
const Assignment = require('../models/assignmentModel').assignmentSchema;

/* ============== (POST) SIGN UP ============== BY JACK SAYSANA
    CREATES A UNIQUE USER AND SAVES IT TO DATABASE.
    ALSO AUTHENTICATES NEWLY MADE USER BY SAVEING 
    USER OBJECT TO SESSION.

    PARAMETERS:
        - name (STRING)
        - username (STRING)
        - password (STRING)
    
    REQUIRES:
        - user not authenticated
        - unique username
    
    RETURNS:
        - user (OBJECT)
    
    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
*/
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
        }else{
            res.send({ error: "Signup Error"});
        }
    })(req, res);
});

/* ============== (POST) LOGIN ============== BY JACK SAYSANA
    VERIFIES USER INFORMATION AND AUTHENTICATES
    USER BY SAVING USER OBJECT TO SESSION

    PARAMETERS:
        - username (STRING)
        - password (STRING)

    REQUIRES:
        - user not authenticated
        - valid user info

    RETURNS:
        - user (OBJECT)

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
*/
router.post('/login', (req, res) => {
    passport.authenticate('local-login', (err, user) => {
        if (err) res.status(500).send({ error: err });
        if (user) {
            req.login(user, err => {
                if (err) res.status(500).send({ error: err });
                res.status(200).send({
                    user: user
                })
            });
        }else{
            res.status(404);
        }
    })(req, res);
});

/* ==============(POST) LOGOUT ============== BY JACK SAYSANA
    REMOVES USER AUTHENTICATION BY REMOVING 
    USER OBJECT FROM SESSION

    PARAMETERS:
        - N/A

    REQUIRES:
        - User authenticated

    RETURNS:
        - message (STRING) => status message

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
*/
router.post('/logout', (req, res) => {
    req.logout();
    res.status(200).send({ message: "Successfully logged out"});
});

/* ============== (POST) ASSIGNMENT ============== BY JACK SAYSANA
    CREATES AND STORES ASSIGNMENT FOR GIVEN USER

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.folder (STRING) => folder id
        - req.body.title (STRING) => assignment title
        - req.body.annotations (OBJECT) => assignment annotations

    REQUIRES:
        - user authenticated

    RETURNS:
        - _id (STRING) => user id
        - message (STRING) => status message
        - redirect (STRING) => redirect link

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.post('/assignment', async (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => {
        if(err) res.status(400).send({ error: err });
        user.folders.id(req.body.folder).assignments.push(new Assignment({
            title: req.body.title,
            annotations: {
                notes: (req.body.notes ? req.body.notes : ""),
                due: (req.body.due ? req.body.due : undefined)
            }
        }));
        try {
            await user.save(err => {
                if(err) res.status(500).send({ error: err });
                res.status(200).send({
                    message: "Assignment successfully added",
                    redirect: '/user'
                });
            });
        }catch(err){
            res.status(500).send({ error: err });
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (POST) UPDATE ASSIGNMENT ============== BY JACK SAYSANA
    UPDATES AN INDIVIDUAL ASSIGNMENT'S INFORMATION

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.folder (STRING) => folder id
        - req.body.assignment (STRING) => assignment id
        - req.body.title (STRING) => updated assignment title
        - req.body.annotations (OBJECT) => updated assignment annotations

    REQUIRES:
        - user authenticated

    RETURNS:
        - message (STRING) => status message
        - redirect (STRING) => redirect link

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.post('/updateAssignment', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => {
        if(err) res.status(400).send({ error: err });
        const assignment = user.folders.id(req.body.folder).assignments.id(req.body.assignment);
        assignment.title = req.body.title ? req.body.title : assignment.title;
        assignment.annotations.notes = req.body.notes ? req.body.notes : assignment.annotations.notes;
        assignment.annotations.due = req.body.due ? req.body.due : assignment.annotations.due;
        assignment.annotations.reocurring = req.body.reocurring ? req.body.reocurring : assignment.annotations.reocurring;
        assignment.completed = req.body.completed;
        try {
            await user.save(err => {
                if(err) res.status(500).send({error: err});
                res.status(200).send({
                    message: "Assignment successfully updated",
                    redirect: '/user'
                });
            });
        }catch(err){
            res.status(500).send({error: err});
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (DELETE) Delete Assignment ============== BY JACK SAYSANA
    DELETES AN INDIVIDUAL ASSIGNMENT

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.folder (STRING) => folder id
        - req.body.assignment (STRING) => assignment id

    REQUIRES:
        - user authenticated

    RETURNS:
        - message (STRING) => status message
        - redirect (STRING) => redirect link

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
*/
router.delete('/deleteAssignment', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => {
        if(err) res.status(400).send({error: err});
        user.folders.id(req.body.folder).assignments.id(req.body.assignment).remove();
        try {
            await user.save(err => {
                if(err) res.status(500).send({error: err});
                res.status(200).send({
                    message: "Assignment successfully deleted",
                    redirect: '/user'
                });
            })
        }catch(err){
            if(err) res.status(500).send({error: err});
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (POST) FOLDER ============== BY JACK SAYSANA
    CREATES AND STORES FOLDER FOR A GIVEN USER

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.name (STRING) => folder name

    REQUIRES:
        - user authenticated
        - user has at most 10 folders

    RETURNS:
        - message (STRING) => status message
        - redirect (STRING) => redirect link

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.post('/folder', async (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => {
        if (err) res.status(500).send({ error: err });
        if (user.folders.length < 10) {
            user.folders.push(new Folder({
                name: req.body.name
            }));
            try {
                await user.save(err => {
                    if (err) res.status(500).send({ error: err });
                    res.status(200).send({
                        message: "Folder successfully added",
                        redirect: '/user',
                        limit: false
                    });
                });
            } catch (err) {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(200).send({ 
                message: "Folder limit reached",
                limit: true
            });
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (POST) UPDATE FOLDER ============== BY JACK SAYSANA
    UPDATES AN INDIVIDUAL FOLDER'S INFORMATION

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.folder (STRING) => folder id
        - req.body.name (STRING) => updated folder name

    REQUIRES:
        - user authenticated

    RETURNS:
        - message (STRING) => status message
        - redirect (STRING) => redirect link

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.post('/updateFolder', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => {
        if(err) res.status(400).send({ error: err });
        user.folders.id(req.body.folder).name = req.body.name;
        try {
            await user.save(err => {
                if (err) res.status(500).send({ error: err });
                res.status(200).send({
                    message: "Folder successfully updated",
                    redirect: '/user'
                });
            });
        }catch(err){
            if (err) res.status(500).send({ error: err });
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (DELETE) DELETE FOLDER ============== BY JACK SAYSANA
    DELETES AN INDIVIDUAL FOLDER

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.folder (STRING) => folder id

    REQUIRES:
        - user authenticated

    RETURNS:
        - message (STRING) => status message
        - redirect (STRING) => redirect link

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.delete('/deleteFolder', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => {
        if (err) res.status(400).send({ error: err });
        user.folders.id(req.body.folder).remove();
        try {
            await user.save(err => {
                if (err) res.status(500).send({ error: err });
                res.status(200).send({
                    message: "Folder successfully deleted",
                    redirect: '/user'
                });
            })
        } catch (err) {
            if (err) res.status(500).send({ error: err });
        }
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (GET) ASSIGNMENTS ============== BY JACK SAYSANA
    RETURNS ALL OF THE ASSIGNMENTS INSIDE A USER'S FOLDER

    PARAMETERS:
        - req.params.userId (STRING) => user id
        - req.params.folderId (STRING) => folder id

    REQUIRES:
        - user authenticated

    RETURNS:
        - assignments (ARRAY) => all assignment objects inside the folder

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.get('/assignments/:userId/:folderId', (req, res) => {
    User.findOne({ _id: req.params.userId }, async (err, user) => {
        if(err) res.status(400).send({ error: err });
        res.status(200).send({
            assignments: user.folders.id(req.params.folderId).assignments
        });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (GET) ASSIGNMENT ============== BY JACK SAYSANA
    RETURNS A SINGLE ASSIGNMENT

    PARAMETERS:
        - req.params.userId (STRING) => user id
        - req.params.folderId (STRING) => folder id
        - req.params.assignmentId (STRING) => assignment id

    REQUIRES:
        - user authenticated

    RETURNS:
        - assignment (OBJECT) => individual assignment object

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.get('/assignment/:userId/:folderId/:assignmentId', (req, res) => {
    User.findOne({ _id: req.params.userId }, async (err, user) => {
        if(err) res.status(400).send({ error: err });
        res.status(200).send({
            assignment: user.folders.id(req.params.folderId).assignments.id(req.params.assignmentId)
        });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (GET) FOLDERS ============== BY JACK SAYSANA
    RETURNS A USER'S FOLDER

    PARAMETERS:
        - req.params.userId (STRING) => user id

    REQUIRES:
        - user authenticated

    RETURNS:
        - folders (ARRAY) => All folder objects belonging to user

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.get('/folders/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId }, async (err, user) => {
        if(err) res.status(400).send({ error: err });
        res.status(200).send({
            folders: user.folders
        });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (GET) FOLDER ============== BY JACK SAYSANA
    RETURNS A SINGLE FOLDER

    PARAMETERS:
        - req.params.userId (STRING) => user id
        - req.params.folderId (STRING) => folder id

    REQUIRES:
        - user authenticated

    RETURNS:
        - folder (OBJECT) => folder object

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.get('/folder/:userId/:folderId', (req, res) => {
    User.findOne({ _id: req.params.userId }, async (err, user) => {
        if(err) res.status(400).send({ error: err });
        res.status(200).send({ 
            folder: user.folders.id(req.body.folder)
        });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

module.exports = router;