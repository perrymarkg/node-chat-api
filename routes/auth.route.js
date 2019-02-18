const route = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../db/models/user.model');
const validator = require('./validators/auth.validator')

route.post('/register', validator.auth, (req, res) => {

    if(!req.body.username || !req.body.password) {
        return res.status(401).json({
            error: 'Please provide a username and password'
        });
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        
        if (err) {
            res.status(500).json({
                error: err
            });
        } else {
            
            const user = new User({
                _id: new  mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
            });
            
            user.save().then(result => {
                let obj = {
                    _id: result._id,
                    username: result.username
                }
                
                res.status(200).json({
                    success: true,
                    obj: obj
                });
             }).catch(error => {
                res.status(500).json({
                    success: false,
                    error: error
                });
             });
        }
    })
});

route.get('/', (req, res) => {
    res.status(200).json({msg: "message"});
});

route.get('/login', (req, res) => {
    User.findOne({username: req.body.username})
    .exec()
    .then(user => {
        bcrypt.compare(
            req.body.password,
            user.password,
            (err, result) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: err.message
                    });
                } 
                if (result) {
                    return res.status(200).json({
                        success:true,
                        item: result
                    })
                }
                return res.status(401).json({
                    success:false,
                    message: 'Unauthorized'
                });
            }    
        );
    }).catch(err => {
        res.status(500).json({
            success:false,
            message:err.message
        })
    });
});



module.exports = route;