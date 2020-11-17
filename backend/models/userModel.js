const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const folder = require('./folderModel').folderSchema.schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    folders: [folder],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

userSchema.methods = {
    checkPassword: inputPass => { return bcrypt.compareSync(inputPass, this.password); },
    hashPassword: plainTxt => { return bcrypt.hashSync(plainTxt, 10); }
}

module.exports = {userSchema: mongoose.model('user', userSchema)};