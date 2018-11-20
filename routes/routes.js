const chat = require('./chat');
const routes = (app) => {
    chat(app);
}

module.exports = routes;