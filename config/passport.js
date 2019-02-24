const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const UserService = require('../services/user.service');

passport.use(new LocalStrategy((username, password, done) => {
    UserService.validateUser(username, password)
    .then(user => done(null, user))
    .catch(error => done(null))
}));

module.exports = passport;