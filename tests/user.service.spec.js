const UserService = require('../services/user.service');
const UserModel = require('../db/models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {MongoMemoryServer} = require('mongodb-memory-server');
const opts = { useNewUrlParser: true, useCreateIndex: true,}

describe("User Tests", () => {

    let User;

    beforeAll(async (done) => {
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = 70000;
        mongoServer = new MongoMemoryServer();
        mongoServer
            .getConnectionString()
            .then((mongoUri) => {
                return mongoose.connect(mongoUri, opts);
            })
            .then(async() => {
                User = await UserService
                .saveUser('perry@mail.com', 'dummy', 'samplepassword')
                .then(result => result)
                .catch(error => error);

                done();
            });

        
    });

    afterAll(() => {
        mongoose.disconnect();
        mongoServer.stop();
    });

    it("Should create a user", async() => {
        expect(User instanceof UserModel).toBe(true)
    });

    it("Should return a user model", async() => {
        
        const result = await UserService
        .findUserBy('dummy')
        .then(result => result)
        .catch(error => error);
        
        expect(result instanceof UserModel).toBe(true)
        expect(result.username).toBe('dummy');
    });

    it("Should validate a password", async() => {

        const result = await UserService
            .validatePassword(User, 'samplepassword')
            .then(result => result)
            .catch(error => error)

        expect(result instanceof UserModel).toBe(true)
        expect(result.username).toBe('dummy');
    });

    it("Should not validate an invalid password", async() => {

        const result = await UserService
            .validatePassword(User, 'samplepasswords')
            .then(result => result)
            .catch(error => error)

        expect(result instanceof UserModel).toBe(false)

    });

    it("Should validate by username and password", async() => {
        
        spyOn(UserService, 'findUserBy').and.callThrough();
        spyOn(UserService, 'validatePassword').and.callThrough();

        const result = await UserService
            .validateUser('dummy', 'samplepassword')
            .then(result => result)
            .catch(error => error);

        expect(result instanceof UserModel).toBe(true)
        expect(UserService.findUserBy).toHaveBeenCalled();
        expect(UserService.validatePassword).toHaveBeenCalled();
    });

    


});