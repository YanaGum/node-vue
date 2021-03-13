const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Adverts = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
    },
    photo: String,
    categories: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'categories',
    },

});

module.exports = mongoose.model('Adverts', Adverts, 'adverts');