const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;
const routes = require('./routes/auth.route');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true});
mongoose.connection.on('error', (r) => {
    console.log(r);
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log('LISTENING on port' + PORT);
});