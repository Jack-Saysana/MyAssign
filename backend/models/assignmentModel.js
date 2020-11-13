const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    annotations: {
        notes: String,
        due: Date,
        reoccuring: Boolean
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = { assignmentSchema: mongoose.model('assignment', assignmentSchema) };