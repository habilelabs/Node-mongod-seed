//db layer for users model
const User = require('./user.model');
const bcrypt = require('bcryptjs');
const Q = require('q');

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
        const deferred = Q.defer();
        const userObj = {email: email};

        User.findOne(userObj).exec((err, user) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    updateLastValid(id) {
        const deferred = Q.defer();
        User.findByIdAndUpdate(id, { 'lastValid': new Date() }, { new: true }, (err, user) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
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
        const deferred = Q.defer();
        User.findOne({ _id: id}).exec( (err, user) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
}

module.exports = new userDbService();