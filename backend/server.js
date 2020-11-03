require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));