const UserService = require('../services/user.service');
const UserModel = require('../db/models/user.model');

const idb = require('./in-memory-db');

describe("User Tests", () => {

    let User;

    beforeAll(async (done) => {
        await idb.init();
        done();
    });

    afterAll(() => {
        idb.disconnect();
    });

    beforeEach(async() => {
        User = await UserService
            .saveUser('perry@mail.com', 'dummy', 'samplepassword')
            .then(result => result)
            .catch(error => error);
    });

    afterEach(async() => {
        await idb.dropAll();
    })

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