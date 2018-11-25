const userModel = require('../models/user.model');
const mongoose = require('mongoose');

class UserService {

    constructor(params) {}

    async save(username, password)
    {
        const userObject = new userModel({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: password
        });
        
        return userObject.save();
    }
}

module.exports = UserService;