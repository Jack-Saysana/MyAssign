require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('./config/passport.config')(passport);

//MongoDB set-up
mongoose.connect('mongodb://localhost/MyAssign', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.log(err);
    console.log("MongoDB connection established");
});

//Express set-up
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Session set-up
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//Passport set-up
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

//Router set-up
app.use('/', require('./routes/router'));