const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    convoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Convo' },
    message: {type: String},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

module.exports = mongoose.model('Message', MessageSchema);