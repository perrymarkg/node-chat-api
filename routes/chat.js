const chat = (app) => {
    app.post('/login', (res, req) => {
        return res.send('test');
    });
}

module.exports = chat;