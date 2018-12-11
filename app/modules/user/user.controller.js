var apiCodes = require('../../../config/api-codes.js');
var message = require('../../../config/messages.js');
var UserDbService = require('./user-db.service.js');
var UserService = require('./user.service.js');
var mongoose = require('mongoose');
var LoginService = require('./login.service');
var _ = require('lodash');
var passport = require('../../../config/passport');

// Exports Method
module.exports = function (app) {

    app.createUser = function (req, res) {
        var origin = req.get('origin');
        if (!req.body.password) {
            req.body.password = '12345678';
        }
        req.body.password = UserDbService.generatePassword(req.body.password);
        var email = req.body.email;
        var password = req.body.password;

        //check if email found
        if (!email) {
            return res.status(apiCodes.INTERNAL_ERROR).send({
                message: message.EMAIL_COMPULSORY
            });
        }
        //check if password is found
        if (!password) {
            return res.status(apiCodes.INTERNAL_ERROR).send({
                message: message.PASSWORD_COMPULSORY
            });
        }

        var userObj = req.body;

        UserDbService.create(userObj).then(function (user) {
            if (user.password) {
                user.password = null;
            }

            return res.status(apiCodes.SUCCESS).send({
                message: message.CREATION_SUCCESS
            });
        })
            .catch(function (err) {
                return res.status(apiCodes.INTERNAL_ERROR).send({
                    message: message.ERROR_IN_CREATING_USER,
                    err: err
                });
            });
    };


    app.getUsers = function (req, res) {
        var query = {};
        UserDbService.getAll(query)
            .then(function (users) {
                return res.status(apiCodes.SUCCESS).send({
                    data: users
                });
            })
            .catch(function (err) {
                return res.status(apiCodes.INTERNAL_ERROR).send({
                    message: message.ERROR_IN_GETTING_USERS,
                    err: err
                });
            });
    };


    app.deleteUser = function (req, res) {
        var userObj = {_id: mongoose.Types.ObjectId(req.params.userId)};
        UserDbService.removeUser(userObj)
            .then(function (user) {
                if (!user) {
                    return res.status(apiCodes.NOT_FOUND).send({
                        message: message.USER_NOT_AVAILABLE_WITH_THIS_EMAIL
                    });
                }
                else {
                    return res.status(apiCodes.SUCCESS).send({
                        message: message.DELETION_SUCCESS
                    });

                }
            })
            .catch(function (err) {
                return res.status(apiCodes.INTERNAL_ERROR).send({
                    message: message.ERROR_IN_GETTING_USER,
                    err: err
                });
            });
    };


    app.updateUser = function (req, res) {
        var userObj = req.body;
        if (userObj._id) {
            delete userObj._id;
        }
        userObj.updated = {
            by: req.token.user._id,
            on: Date.now()
        };
        var userFindObj = {};
        if (req.params.userId) {
            userFindObj = {
                _id: req.params.userId
            };
        }
        UserService.updateUser(userFindObj, userObj)
            .then(function (newUser) {
                return res.status(apiCodes.SUCCESS).send({
                    message: message.USER_UPDATED
                });
            })
            .catch(function (err) {
                return res.status(apiCodes.INTERNAL_ERROR).send({
                    message:message.MESSAGES.USER.UPDATE.ERROR,
                    err: err
                });
            });
    };

    app.userLogin = function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        if (!email && !password) {
            return res.status(apiCodes.BAD_REQUEST).send({
                message: message.EMAIL_AND_PASSWORD_NOT_PROVIDED
            });
        }
        LoginService.login(email, password).then(function (user) {
            var token = passport.generateToken(user);
            passport.decodeToken(token).then(function (decodedToken) {
                LoginService.setTokenData(decodedToken, user, token).then(function (tokenData) {
                    return res.status(apiCodes.SUCCESS).send(tokenData);
                });
            }).catch(function (error) {
                return res.status(apiCodes.BAD_REQUEST).send({
                    message: message.ERROR_IN_DECODING_TOKEN,
                    err: error
                });
            });
        }).catch(function (error) {
            return res.status(apiCodes.UNAUTHORIZED).send({
                message: message.EMAIL_AND_PASSWORD_NOT_MATCHED
            });
        });

    };

    app.userLogout = function (req, res) {
        LoginService.logout(req.token.user).then(function (result) {
            res.send(message.MESSAGES.AUTH.TOKEN_INVALID);
        }).catch(function (error) {
            res.status(apiCodes.UNAUTHORIZED).send({
                'message': message.MESSAGES.USER.LOGOUT.ERROR,
                err: error
            });
        });
    };

};