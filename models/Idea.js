const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({ // create a schema for your data
    text: {
        type: String,
        required: true
    },
    tag: {
        type: String,
    },
    username: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Idea', IdeaSchema);