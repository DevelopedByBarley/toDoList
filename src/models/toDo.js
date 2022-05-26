const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: () => new Date()
    },
    comment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ToDo', toDoSchema);
