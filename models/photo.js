const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photo = new Schema({
    photoUrl: String
});

module.exports = model('photo', photo)