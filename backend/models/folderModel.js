const mongoose = require('mongoose');
const assignment = require('./assignmentModel').assignmentSchema;

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    assignments: [assignment]
});

module.exports = { folderSchema: mongoose.model('folder', folderSchema) };