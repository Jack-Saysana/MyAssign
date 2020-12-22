const mongoose = require('mongoose');
const assignment = require('./assignmentModel').assignmentSchema.schema;

// Jack Saysana

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    assignments: [ assignment ],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = { folderSchema: mongoose.model('folder', folderSchema) };