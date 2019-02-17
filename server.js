const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log('LISTENING on port' + PORT);
});