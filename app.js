const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const db = require('./db');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


routes(app, db);

app.listen(3001,() => {
    console.log('entered');
});