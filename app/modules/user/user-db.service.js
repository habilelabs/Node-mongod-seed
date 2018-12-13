//db layer for users model
const User = require('./user.model');
const bcrypt = require('bcryptjs');

class userDbService {
    create(userData) {
        const user = new User(userData);
        return user.save();
    }

    getAll(userObj) {
        return User.find(userObj, {__v: 0,password:0});
    }

    removeUser(userObj) {
        return User.remove(userObj);
    }

    generatePassword(password) {
        return bcrypt.hashSync(password, 8);
    }

    getUserByEmail(email) {
        const userObj = {email: email};
        return User.findOne(userObj);
    }

    updateLastValid(id) {
        return User.findByIdAndUpdate(id, { 'lastValid': new Date() }, { new: true });
    }

    updateUser(userFindObj, userObj){
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
    getUserById(id) {
        return User.findOne({ _id: id});
    }
}

module.exports = new userDbService();