const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods = {
    checkPassword: inputPass => { return bcrypt.compare(inputPass, this.password); },
    hashPassword: plainTxt => { return bcrypt.hashSync(plainTxt, 10); }
}

module.exports = {userSchema: mongoose.model('user', userSchema)};