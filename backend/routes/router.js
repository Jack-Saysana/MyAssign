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
        - message (STRING) => status message

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
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

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
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

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
*/
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

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.post('/folder', async (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if (err) res.status(500).send({ error: err });
        if (user.folders.length <= 10) {
            user.folders.push(new Folder({
                name: req.body.name
            }));
            try {
                await user.save(err => {
                    if (err) res.status(500).send({ error: err });
                    res.status(200).send({ message: "Folder successfully added" })
                });
            } catch (err) {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(400).send({ error: "Folder limit reached" })
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

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
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

/* ============== (DELETE) DELETE FOLDER ============== BY JACK SAYSANA
    DELETES AN INDIVIDUAL FOLDER

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.folder (STRING) => folder id

    REQUIRES:
        - user authenticated

    RETURNS:
        - message (STRING) => status message

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
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

/* ============== (GET) ASSIGNMENTS ============== BY JACK SAYSANA
    RETURNS ALL OF THE ASSIGNMENTS INSIDE A USER'S FOLDER

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.folder (STRING) => folder id

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
router.get('/assignments', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(400).send({ error: err });
        res.status(200).send({ assignments: user.folders.id(req.body.folder).assignments });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (GET) ASSIGNMENT ============== BY JACK SAYSANA
    RETURNS A SINGLE ASSIGNMENT

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.folder (STRING) => folder id
        - req.body.assignment (STRING) => assignment id

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
router.get('/assignment', (req, res) => {
    User.findOne({ _id: req.body.id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(400).send({ error: err });
        res.status(200).send({ assignment: user.folders.id(req.body.folder).assignments.id(req.body.assignment) });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (GET) FOLDERS ============== BY JACK SAYSANA
    RETURNS A USER'S FOLDER

    PARAMETERS:
        - req.body._id (STRING) => user id

    REQUIRES:
        - user authenticated

    RETURNS:
        - message (STRING) => status message

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.get('/folders', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => { //CURRENTLY SET TO REQ.BODY._ID FOR TESTING PURPOSES
        if(err) res.status(400).send({ error: err });
        res.status(200).send({ folders: user.folders });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

/* ============== (GET) FOLDER ============== BY JACK SAYSANA
    RETURNS A SINGLE FOLDER

    PARAMETERS:
        - req.body._id (STRING) => user id
        - req.body.folder (STRING) => folder id

    REQUIRES:
        - user authenticated

    RETURNS:
        - message (STRING) => status message

    STATUS CODES:
        200 - Successful Request
        500 - Internal Server Error
        400 - Bad Request/Client Error
        404 - User not found
*/
router.get('/folder', (req, res) => {
    User.findOne({ _id: req.body._id }, async (err, user) => {
        if(err) res.status(400).send({ error: err });
        res.status(200).send({ folders: user.folders.id(req.body.folder) });
    }).catch(err => {
        res.status(404).send({ error: err });
    });
});

module.exports = router;