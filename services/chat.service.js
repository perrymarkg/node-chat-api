const Convo = require('../db/models/convo.model')
const Message = require('../db/models/message.model');
const mongoose = require('mongoose');

const _this = {
    createConversation: (...users) => {
        if (users.length <= 1) {
            throw new Error({message: "Cannot save conversation"})
        }

        return new Convo({
            _id: new mongoose.Types.ObjectId(),
            members: users.map(u => u._id),
            createdBy: users[0]._id
        });
    },
    saveConversation: (...users) => {
        return new Promise((resolve, reject) => {
            _this.createConversation(...users)
            .save()
            .then(convo => resolve(convo))
            .catch(error => reject(error))
        })
    },
    getUserConversations: (...users) => {
        const find = users.length > 1 ?
            {"members": users.map(u => u._id)} : 
            {"members": {'$in': [users[0]._id]}};

        
        return new Promise((resolve, reject) => {
            Convo.find(find)
                .then(convos => {
                    convos === null ?
                        reject({message: "Conversation not found"}) :
                        resolve(convos);
                }).catch(error => reject(error))
        });
    },
    getConverSation: (id) => {
        return new Promise((resolve, reject) => {
            Convo.findById(id)
                .then(convo => {
                    convo === null ?
                        reject({message: "Conversation not found"}) :
                        resolve(convo)
                }).catch(error => reject(error));
        });
    }
}

module.exports = _this;