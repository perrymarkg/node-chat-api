const UserService = require('../services/user.service');

const user = (app, db) => {
    app.post('/register', (req, res) => {
        
        const userService = new UserService();
        userService
            .save(req.body.username, req.body.password)
            .then( result => {
                console.log(result)
                res.status(200).send(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(parseError(err));
            });
        
        //console.log(req.body.username, req.body.password);
    });
}

function parseError(err)
{
    let error = {"status": "error", "messages": {}}
    if (err.errors)
    {
        for(let k in err.errors)
        {
            error.messages[k] = err.errors[k].message
        }
        return error;
    }

    error.messages = err;
    return error;
}

module.exports = user;