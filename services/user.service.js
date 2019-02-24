const mongoose = require('mongoose');
const User = require('../db/models/user.model');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const _this = {
    validateUser: (username, password) => {
        //
        return new Promise((resolve, reject) => {
            _this.findUserBy(username)
            .then(user => _this.validatePassword(user, password))
            .then(user => resolve(user))
            .catch(error => reject(error));
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
                    reject({message: 'Invalid username/password'});
                } else {
                    resolve(result);
                }
            })
            .catch(error => reject(error));
        });
    },
    createUser: (email, username, password) => {
        //
        return new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            username: username,
            password: password
        });
    },
    saveUser: (email, username, password) => {
        //
        return new Promise((resolve, reject) => {
            _this.createUser(email, username,password)
            .save()
            .then(result => resolve(result))
            .catch(error => reject(_this.handeSaveUserError(error)));
        });
    },
    handeSaveUserError: (e) => {
        if (e) {
            return {
                message: (e.name === 'MongoError' && e.code === 11000) ? 'Email already exists!' : e
            }    
        } else { 
            console.log(e); 
        }
    },
    issueCredentials: (user) => {
        
        const userPayload = {
            _id: user._id,
            username: user.username
        }

        return {
            token: jwt.sign(userPayload, config.secret)
        }
        
    }
}

module.exports = _this;