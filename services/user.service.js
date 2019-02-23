const mongoose = require('mongoose');
const User = require('../db/models/user.model');
const bcrypt = require('bcrypt');

const _this = {
    validateUser: (username, password) => {
        //
        return new Promise((resolve, reject) => {
            _this.findUserBy(username)
            .then(user => _this.validatePassword(user, password))
            .then(user => resolve(user))
            .catch(error => {
                reject(error);
            });
        });
    },
    validatePassword: (user, rawpassword) => {
        //
        return new Promise((resolve, reject) => {
            if (!user) {
                reject('Invalid user');
            }

            bcrypt.compare(rawpassword, user.password)
                .then(result => resolve(user))
                .catch(error => reject(error));
        });
    },
    findUserBy: (value, field = 'username') => {
        //
        const search ={};
        search[field] = value;

        return new Promise((resolve, reject) => {
            User.findOne(search)
            .exec()
            .then(result => {
                //
                if (result === null) {
                    reject('Invalid username/password');
                } else {
                    resolve(result);
                }
            })
            .catch(error => reject(error));
        });
    },
    createUser: (username, password) => {
        //
        return new User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: password
        });
    },
    saveUser: (username, password) => {
        //
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10)
            .then(hashedPass => _this.createUser(username, hashedPass))
            .then(user => user.save())
            .then(user => resolve(user))
            .catch(error => reject(error));
        });
    }
}

module.exports = _this;