const route = require('express').Router();

const bcrypt = require('bcrypt');
const User = require('../db/models/user.model');
const validator = require('./validators/auth.validator')
const userService = require('../services/user.service');

route.post(
    '/register',
    validator.auth,
    (req, res) => {
        userService
            .saveUser(req.body.username, req.body.password)
            .then(result => {
                res.status(200).send(result);
            }).catch(error => {
                res.status(401).send(error);
            });
    }
);

route.get('/', (req, res) => {
    res.status(200).json({msg: "message"});
});

route.post(
    '/login',
    validator.auth,
    (req, res) => {
        userService
            .validateUser(req.body.username,  req.body.password)
            .then(result => {
                res.status(200).send(result);
            }).catch(error => {
                res.status(401).send(error);
            })
    /* User.findOne({username: req.body.username})
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
    }); */
});



module.exports = route;