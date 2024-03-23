const mongoose = require('../db/mongo');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    name : {'type':String, "require": true},
    friend: {"type":Array, "require":true},    
})

module.exports = mongoose.model('friend', friendSchema, 'friend');