// server/models/contentModel.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    niche: {
        type: String,
        required: true,
    },
    hook: {
        type: String,
        required: true,
    },
    reelIdea: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    hashtags: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;