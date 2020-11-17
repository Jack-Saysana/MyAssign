const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    annotations: {
        notes: String,
        due: Date,
        reoccuring: {
            monday: { type: Boolean, default: false },
            tuesday: { type: Boolean, default: false },
            wednesday: { type: Boolean, default: false },
            thursday: { type: Boolean, default: false },
            friday: { type: Boolean, default: false },
            saturday: { type: Boolean, default: false },
            sunday: { type: Boolean, default: false },
            time: Date
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