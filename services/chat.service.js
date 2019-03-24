const Convo = require('../db/models/convo.model')
const Message = require('../db/models/message.model');
const UserModel = require('../db/models/user.model');
const mongoose = require('mongoose');

const _this = {
    createConversation: (...users) => {
        if (users.length <= 1) {
            throw new Error({message: "Cannot save conversation"})
        }

        return new Convo({
            _id: new mongoose.Types.ObjectId(),
            members: users.map(u => u._id),
            createdBy: new mongoose.Types.ObjectId(users[0]._id)
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
                .populate('createdBy')
                .populate('members')
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
                .populate('createdBy')
                .exec()
                .then(convo => {
                    convo === null ?
                        reject({message: "Conversation not found"}) :
                        resolve(convo)
                }).catch(error => reject(error));
        });
    },
    addMessage: (conversation_id, user, message) => {
        return new Promise((resolve, reject) => {
            new Message({
                _id: new mongoose.Types.ObjectId(),
                convoId: conversation_id,
                message: message,
                createdBy: user._id
            })
            .save()
            .then(msg => {
                msg === null ?
                    reject({message: "Cannot add message"}) :
                    resolve(msg);
            })
            .catch(error => reject(error));
        });
    },
    getMessage: (message_id) => {
        return new Promise((resolve, reject) => {
            Message.findById(message_id)
                .populate('createdBy', ['username'])
                .exec()
                .then(msg => {
                    msg === null ?
                        reject({message: "Cannot add message"}) :
                        resolve(msg)
                })
                .catch(error => reject(error));
        });
    }
}

module.exports = _this;