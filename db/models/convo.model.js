// Convesation Model
const mongoose = require('mongoose');

const ConvoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Convo', ConvoSchema);