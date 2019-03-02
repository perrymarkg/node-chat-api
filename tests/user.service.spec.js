const UserService = require('../services/user.service');
const UserModel = require('../db/models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

describe("User Tests", () => {

    let User;
    beforeEach(async() => {
        
        User = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            email: 'mail@google.com',
            username: 'dummy',
            password: 'samplepassword'
        });

        spyOn(mongoose.Query.prototype, "exec")
            .and
            .returnValue(Promise.resolve(User));
        
        User.password = await bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(User.password, salt))
            .then(hashed => hashed)
            .catch(error => error);
    })

    it("Should return a user model", async() => {
        
        const result = await UserService
        .findUserBy('dummy', 'samplepassword')
        .then(result => result)
        .catch(error => error);
        
        expect(result).toEqual(User);
    });

    it("Should validate a password", async() => {

        const result = await UserService
            .validatePassword(User, 'samplepassword')
            .then(result => result)
            .catch(error => error)

        expect(result).toEqual(User);
    });

    it("Should not validate an invalid password", async() => {

        const result = await UserService
            .validatePassword(User, 'samplepasswords')
            .then(result => result)
            .catch(error => error)

        expect(result).not.toEqual(User);

    });

    it("Should validate by username and password", async() => {
        
        const result = await UserService
            .validateUser('dummy', 'samplepassword')
            .then(result => result)
            .catch(error => error);

        expect(result).toEqual(User);
        
    })


});