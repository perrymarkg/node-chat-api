// Convesation Model
const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    convoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Convo' },
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true }],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Message', MessageSchema);