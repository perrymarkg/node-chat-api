const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

UserSchema.plugin(validator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('UserSchema', UserSchema);