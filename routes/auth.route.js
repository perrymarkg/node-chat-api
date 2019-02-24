const route = require('express').Router();
const validator = require('./validators/auth.validator')
const userService = require('../services/user.service');
const passport = require('../config/passport');

route.post(
    '/register',
    validator.auth,
    (req, res) => {
        userService
            .saveUser(req.body.email, req.body.username, req.body.password)
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
    passport.authenticate('local', {session: false}),
    (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).send(req.user)
        } else {
            res.status(401).send('Invalid user');
        }
});

route.post('/test-login', 
    passport.authenticate('local', {session:false}),
    (req, res) => {
        console.log(req.user);
})



module.exports = route;