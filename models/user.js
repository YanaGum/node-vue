const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [String],
        default: ['user'],
    },
    created: {
        type: Date,
        default: Date.now,
    },


});

module.exports = mongoose.model('user', user, 'user')