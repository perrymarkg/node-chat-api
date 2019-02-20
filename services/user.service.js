const mongoose = require('mongoose');
const User = require('../db/models/user.model');
const bcrypt = require('bcrypt');

const _this = {
    validateUser: (username, password) => {
        return Promise((resolve, reject) => {
            _this.findUserBy(username)
            .then(result => {
                //const res = _this.validatePassword(password, result.password);

                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },
    findUserBy: (username, field = 'username') => {
        return new Promise((resolve, reject) => {
            User
            .findOne({field, username})
            .exec()
            .then(result => {
                resolve(result);
            }).catch(error => {
                reject(error)
            })
        });
    },
    validatePassword: (password, hashedpwd) => {
        bcrypt.compare(password, hashedpwd, (err, result) => {
            if (err) {
                return {valid: false, msg: err.message};
            }

            if (result) {
                return {valid: true};
            }

            return {valid:false, msg: 'Invalid'};
        });
    },
    createUser: (username, password) => {
        return new User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: password
        });
    },
    saveUser: (username, password, cb) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    const user = _this.createUser(username, hash);

                    user.save().then(result => {
                        resolve({
                            _id: result._id,
                            username: result.username
                        });
                    }).catch(error => {
                        reject(error);
                    });
                }
            });
        });
    }
}

module.exports = _this;