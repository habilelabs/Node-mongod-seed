var Q = require('q');
var userDbService = require('./user-db.service.js');
var bcrypt = require('bcryptjs');
var message = require('../../../config/messages.js');
var _ = require('lodash');
module.exports = {
    login: function (username, password) {
        var deferred = Q.defer();
        userDbService.getUserByEmail(username,true).then(function (user) {
            if (!user) {
                deferred.reject('User not Found');
            }
            else if (user && username === user.email && bcrypt.compareSync(password, user.password)) {
                if (!user.lastValid) {
                    user.lastValid = new Date();
                    user.save();
                }
                deferred.resolve(user);
            } else {
                deferred.reject('password do not match');
            }
        }).catch(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    },
    logout: function (user) {
        return userDbService.updateLastValid(user._id);
    },
    setTokenData: function(decodedToken,user,token){
        var deferred = Q.defer();
        var expires = decodedToken.exp * 1000;
        var tokenData = {
            user : {
                _id: user._id,
                email: user.email,
                role: user.role,
                name: user.name
            },
            token: token,
            expires: new Date(expires).toISOString()
        };

        deferred.resolve(tokenData);

        return deferred.promise;
    },
    getUserFromId: function (userId) {
        var deferred = Q.defer();
        userDbService.getUserById(userId).then(function (user) {
            if (user) {
                deferred.resolve(user);
            } else {
                deferred.reject({'message':message.MESSAGES.USER.GET.ERROR_NO_USER + userId});
            }
        }).catch(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

};
