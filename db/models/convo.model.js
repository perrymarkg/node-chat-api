const mongoose = require('mongoose');

const ConvoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

module.exports = mongoose.model('Convo', ConvoSchema);