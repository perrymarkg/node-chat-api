const route = require('express').Router();

route.get('/chat', (req, res) =>{
    return res.status(200).send({'testing': 'tests'});
});

module.exports = route;