const chat = (app) => {
    app.post('/login', (req, res) => {
        console.log(req.body.username);
        res.send({"auth":"auth"});
    });
}

module.exports = chat;