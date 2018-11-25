const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
    message: {type: string},
    username: {type: string, required: true},
});

module.exports = mongoose.model('MessageModel', MessageSchema);