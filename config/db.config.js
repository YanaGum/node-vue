const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/AdvDb', {
        useNewUrlParser: true,
    })
    .then(() => console.log('Database is Connected...'))
    .catch(err => console.log(err));