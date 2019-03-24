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
        
        done();
    });

    afterAll(() => {
        idb.disconnect();
    });

    beforeEach(async() => {

        User1 = await new User({
            _id: new mongoose.Types.ObjectId(),
            email: 'mail1@google.com',
            username: 'dumm1',
            password: 'samplepassword'
        }).save()

        User2 = await new User({
            _id: new mongoose.Types.ObjectId(),
            email: 'mail2@google.com',
            username: 'dummy2',
            password: 'samplepassword'
        }).save();

        sampleConvo = new Convo({
            _id: new mongoose.Types.ObjectId(),
            members: [User1._id, User2._id],
            createdBy: User1._id
        });
        
    });

    afterEach(async() => {
        await idb.dropAll();
    });

    it("Should have created users for testing", async() => {

        const users = await User.find({}).exec()
        expect(users.length).toBe(2);
    });

    it("Should create and save 1 to 1 conversation", async() => {

        const convo = await ChatService.saveConversation(User1, User2)
        
        const expectedConvo = new Convo({
            _id: new mongoose.Types.ObjectId(),
            members: [User1._id, User2._id],
            createdBy: User1._id
        });
        
        expect(convo instanceof Convo).toBe(true);
        expect(JSON.stringify(convo.members)).toEqual(JSON.stringify(expectedConvo.members));
        expect(convo.createdBy).toBe(User1._id);
    });

    it("Should retrieve user conversations", async() => {
        await sampleConvo.save();
        const result = await ChatService.getUserConversations(User1, User2);
        expect(result.length).toBe(1);
        expect(result[0].members.length).toBe(2);
        expect(result[0].members[0] instanceof User).toBe(true);
    });

    it("Should not save conversation for one member", async() => {
        let result;
        try {
            result = await ChatService.saveConversation(User1)
        } catch (e) {
            result = e;
        }
        expect(result instanceof Error).toBe(true);
    });

    it("should retrieve a conversation", async() => {

        const convo = await sampleConvo.save();
        const result = await ChatService.getConverSation(convo._id)
        
        expect(result instanceof Convo).toBe(true);
        expect(result._id).toEqual(convo._id);
        expect(result.createdBy instanceof User).toBe(true);
    });

    it("should add a conversation", async() => {

        await sampleConvo.save();
        const message = 'Hello there';
        const msg = await ChatService.addMessage(sampleConvo.id, User1, message)

        expect(msg instanceof Message).toBe(true);
        expect(msg.message).toEqual(message);
        expect(msg.createdBy).toEqual(User1._id);

    });

    it("it should retrive a conversation", async() => {

        const convo = await sampleConvo.save()

        const message = 'Hello there';
        const msg = await ChatService.addMessage(convo.id, User1, message)

        const msg_result = await ChatService.getMessage(msg._id);
        console.log(msg_result);
        expect(msg_result instanceof Message).toBe(true);
        expect(msg_result.createdBy instanceof User).toBe(true)
       
    })

});