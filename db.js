const mongo = require('mongoose');
mongo.connect(
    'mongodb://localhost:27017/chat', 
    { 
        useNewUrlParser: true,
        useCreateIndex: true, 
    }
);
const db = mongo.connection;

db.on('error', console.error.bind(console, 'MongoDB error'));
module.exports = db;