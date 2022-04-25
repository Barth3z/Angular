const mongoose = require('mongoose');

const URI = 'mongodb+srv://dbUser:projetl2u2@projetl2u2.ige0b.mongodb.net/test';

mongoose.connect(URI)
    .then(db => console.log('DB est connecté'))
    .catch(err => console.error(err));

module.exports = mongoose;

