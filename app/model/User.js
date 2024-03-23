const mongoose = require('../db/mongo');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id : {'type':String, "require": true},
    name : {'type':String, "require": true},
})

module.exports = mongoose.model('user', userSchema, 'user');