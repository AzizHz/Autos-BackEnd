const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    FullName: {
        type: String
    },
    Email: {
        type: String
    },
    Phone: {
        type: String
    },
    Password: {
        type: String
    },
    DateOfBirth: {
        type: String
    },
    Country: {
        type: String
    },
    State: {
        type: String
    },
    HomeAddress: {
        type: String
    },
    AccountState: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    Posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },

    ],
}, { timestamps: true });
module.exports = mongoose.model("User", UserSchema); 