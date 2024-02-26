const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    created_at: {
        type: Date,
        required: Date.now
    },
    updated_at: {
        type: Date,
        required: Date.now
    },
});

module.exports = mongoose.model('Post', postSchema);