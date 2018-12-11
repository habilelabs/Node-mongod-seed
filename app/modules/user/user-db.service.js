//db layer for users model
var User = require('./user.model');
var bcrypt = require('bcryptjs');
var Q = require('q');
module.exports = {

    /**
     * Service for create user.
     */
    create: function (userData) {
        var user = new User(userData);
        return user.save();
    },
    getAll: function (userObj) {
        return User.find(userObj, {__v: 0,password:0});
    },
    removeUser:function (userObj) {
        return User.remove(userObj);
    },
    generatePassword: function (password) {
        return bcrypt.hashSync(password, 8);
    },
    getUserByEmail: function (email) {
        var deferred = Q.defer();
        var userObj = {email: email};

        User.findOne(userObj).exec(function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    },

    updateLastValid: function(id) {
        var deferred = Q.defer();
        User.findByIdAndUpdate(id, { 'lastValid': new Date() }, { new: true }, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    },

    updateUser:function(userFindObj, userObj){
        // Whenever updating information about a user, update last valid to logout all other sessions.
        userObj.lastValid = new Date();

        return User.findOneAndUpdate(userFindObj, {
            $set: userObj
        }, {
            new: true,
            multi: true,
            w: 1
        });
    },
    getUserById: function (id) {
        var deferred = Q.defer();
        User.findOne({ _id: id}).exec(function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

};