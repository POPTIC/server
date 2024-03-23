const mongoose = require('../db/mongo');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    from: { 'type': String, 'require': true },
    to: { 'type': String, 'require': true },
    info: { 'type': Array, 'require': true },
});

module.exports = mongoose.model('message', MessageSchema, 'message');
