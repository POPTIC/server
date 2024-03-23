const {MongoUrl} = require('../config/dataBaseConfig')

const mongoose = require('mongoose');
mongoose.connect(MongoUrl).then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error));

module.exports = mongoose;
