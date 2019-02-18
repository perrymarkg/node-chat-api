const route = require('express').Router();

const bcrypt = require('bcrypt');
const User = require('../db/models/user.model');
const validator = require('./validators/auth.validator')
const authService = require('../services/auth.service');

route.post(
    '/register',
    validator.auth,
    (req, res) => {
        authService.hash(req,res);
    }
);

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