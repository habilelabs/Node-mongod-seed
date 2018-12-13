//db layer for users model
const User = require('./user.model');
const bcrypt = require('bcryptjs');

class userDbService {
    static create(userData) {
        const user = new User(userData);
        return user.save();
    }

    static getAll(userObj) {
        return User.find(userObj, {__v: 0,password:0});
    }

    static removeUser(userObj) {
        return User.remove(userObj);
    }

    static generatePassword(password) {
        return bcrypt.hashSync(password, 8);
    }

    static getUserByEmail(email) {
        const userObj = {email: email};
        return User.findOne(userObj);
    }

    static updateLastValid(id) {
        return User.findByIdAndUpdate(id, { 'lastValid': new Date() }, { new: true });
    }

    static updateUser(userFindObj, userObj){
        // Whenever updating information about a user, update last valid to logout all other sessions.
        userObj.lastValid = new Date();

        return User.findOneAndUpdate(userFindObj, {
            $set: userObj
        }, {
            new: true,
            multi: true,
            w: 1
        });
    }
    static getUserById(id) {
        return User.findOne({ _id: id});
    }
}

module.exports =  userDbService;