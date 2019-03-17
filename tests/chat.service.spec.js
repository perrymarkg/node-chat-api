const Convo = require('../db/models/convo.model');
const Message = require('../db/models/message.model');
const User = require('../db/models/user.model');
const ChatService = require('../services/chat.service');
const mongoose = require('mongoose');
const idb = require('./in-memory-db');

describe("Chat Service tests", () => {

    let User1;
    let User2;
    let sampleConvo;

    beforeAll(async (done) => {
        
        await idb.init();
        User1 = await new User({
            _id: new mongoose.Types.ObjectId(),
            email: 'mail1@google.com',
            username: 'dumm1',
            password: 'samplepassword'
        }).save();

        User2 = await new User({
            _id: new mongoose.Types.ObjectId(),
            email: 'mail2@google.com',
            username: 'dummy2',
            password: 'samplepassword'
        }).save();
        done();
    });

    afterAll(() => {
        idb.disconnect();
    });

    beforeEach(async() => {

        sampleConvo = new Convo({
            _id: new mongoose.Types.ObjectId(),
            members: [User1._id, User2._id],
            createdBy: User1._id
        });
        
    });

    afterEach(async() => {
        await idb.dropAll();
    })

    it("Should create and save 1 to 1 conversation", () => {

        const convo = ChatService
            .createConversation(User1, User2)
        
        const expectedConvo = new Convo({
            _id: new mongoose.Types.ObjectId(),
            members: [User1._id, User2._id],
            createdBy: User1._id
        });
        //console.log(expectedConvo);
        //console.log(convo.members, expectedConvo.members);
        expect(convo instanceof Convo).toBe(true);
        expect(convo.members[0]).toEqual(expectedConvo.members[0]);
        expect(convo.members[1]).toEqual(expectedConvo.members[1]);
        expect(convo.createdBy).toEqual(expectedConvo.createdBy);

       ChatService
            .saveConversation(User1, User2)
            .then(result => {
                expect(result instanceof Convo).toBe(true);
                expect(result.members[0]).toEqual(expectedConvo.members[0]);
                expect(result.members[1]).toEqual(expectedConvo.members[1]);
                expect(result.createdBy).toEqual(expectedConvo.createdBy);
            });

    });

    it("Should retrieve user conversations", async() => {
        const result = await ChatService
            .getUserConversations(User1, User2)
            .then(conversations => conversations)
            .catch(error => error);

        expect(result.length).toBe(1);
    });

    it("Should not save conversation for one member", async() => {
        const  result = await ChatService
            .saveConversation(User1)
            .then(result => result)
            .catch(error => error);

        expect(result instanceof Error).toBe(true);
    });

    it("should retrive a conversation", async() => {

        let id = new mongoose.Types.ObjectId();
        const test = await new Convo({
            _id: id,
            members: [User1._id, User2._id],
            createdBy: User1._id
        }).save().then(result => result);

        const result = await ChatService
            .getConverSation(id)
            .then(conversation => conversation)
            .catch(error => error)
        
        expect(result instanceof Convo).toBe(true);
        expect(result._id).toEqual(id);
    });

});