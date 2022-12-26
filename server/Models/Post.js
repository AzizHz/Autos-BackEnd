const mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({

    Title: {
        type: String,
    },

    Description: {
        type: String,
    },
    image: String,

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: [],

    createdAt: {
        type: Date,
        default: new Date(),
    },




})


module.exports = mongoose.model('Post', PostSchema);