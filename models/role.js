const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const role = new Schema({
    name: String
});

module.exports = model('role', role)