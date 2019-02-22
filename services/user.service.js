const mongoose = require('mongoose');
const User = require('../db/models/user.model');
const bcrypt = require('bcrypt');
const responseService = require('./response.service');

const _this = {
    validateUser: (username, password) => {
        return new Promise((resolve, reject) => {
            _this.findUserBy(username)
            .then(result => {
                
                bcrypt.compare(password, result.password)
                .then(res => {
                    if(res) {
                        delete result.password;
                        resolve(responseService.ok(result));
                    } else {
                        reject(responseService.error('Invalid password'));
                    }
                }).catch(err => {
                    reject(err);
                });
                

            }).catch(error => {
                reject(responseService.error('Invalid'));
            });
        });
    },
    // @Todo: Fix field make dynamic
    findUserBy: (username, field = 'username') => {
        return new Promise((resolve, reject) => {
            User
            .findOne({'username': username})
            .exec()
            .then(result => {

                if (result === null) {
                    reject({'msg': "Error"});
                } else {
                    resolve(result);
                }
            }).catch(error => {
                reject(error)
            })
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