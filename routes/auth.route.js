const route = require('express').Router();
const validator = require('./validators/auth.validator')
const userService = require('../services/user.service');

route.post(
    '/register',
    validator.auth,
    (req, res) => {
        userService
            .saveUser(req.body.username, req.body.password)
            .then(result => res.status(200).send(result))
            .catch(error => {
                console.log(error);
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
            .then(result => res.status(200).send(result))
            .catch(error => {
                console.log(error);
                res.status(401).send(error);
            })
});

route.get('/test-login', (req, res) => {
    
})



module.exports = route;