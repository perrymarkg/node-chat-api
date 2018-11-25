const chat = require('./chat');
const user = require('./user');
const routes = (app, db) => {
    chat(app);
    user(app, db);
}

module.exports = routes;