const mongoose = require('mongoose');

// Jack Saysana

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    annotations: {
        notes: {
            type: String,
            default: ""
        },
        due: {
            type: Date,
            default: null
        },
        reoccuring: {
            type: Boolean,
            default: false
        }
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = { assignmentSchema: mongoose.model('assignment', assignmentSchema) };