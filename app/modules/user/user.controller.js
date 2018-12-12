const apiCodes = require('../../../config/api-codes.js');
const message = require('../../../config/messages.js');
const UserDbService = require('./user-db.service.js');
const UserService = require('./user.service.js');
const mongoose = require('mongoose');
const LoginService = require('./login.service');
const passport = require('../../../config/passport');

class userController {

     createUser(req, res) {
        if (!req.body.password) {
            req.body.password = '12345678';
        }
        req.body.password = UserDbService.generatePassword(req.body.password);
         const email = req.body.email;
         const password = req.body.password;

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

         const userObj = req.body;

        UserDbService.create(userObj).then((user) => {
            if (user.password) {
                user.password = null;
            }

            return res.status(apiCodes.SUCCESS).send({
                message: message.CREATION_SUCCESS
            });
        })
            .catch((err) => {
                return res.status(apiCodes.INTERNAL_ERROR).send({
                    message: message.ERROR_IN_CREATING_USER,
                    err: err
                });
            });
    };

     getUsers(req, res) {
         const query = {};
        UserDbService.getAll(query)
            .then((users) => {
                return res.status(apiCodes.SUCCESS).send({
                    data: users
                });
            })
            .catch((err) => {
                return res.status(apiCodes.INTERNAL_ERROR).send({
                    message: message.ERROR_IN_GETTING_USERS,
                    err: err
                });
            });
    };


     deleteUser(req, res) {
         const userObj = {_id: mongoose.Types.ObjectId(req.params.userId)};
        UserDbService.removeUser(userObj)
            .then((user) => {
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
            .catch((err) => {
                return res.status(apiCodes.INTERNAL_ERROR).send({
                    message: message.ERROR_IN_GETTING_USER,
                    err: err
                });
            });
    };


     updateUser(req, res) {
         const userObj = req.body;
        if (userObj._id) {
            delete userObj._id;
        }
        userObj.updated = {
            by: req.token.user._id,
            on: Date.now()
        };
         let userFindObj = {};
        if (req.params.userId) {
            userFindObj = {
                _id: req.params.userId
            };
        }
        UserService.updateUser(userFindObj, userObj)
            .then((newUser) => {
                return res.status(apiCodes.SUCCESS).send({
                    message: message.USER_UPDATED
                });
            })
            .catch((err) => {
                return res.status(apiCodes.INTERNAL_ERROR).send({
                    message:message.MESSAGES.USER.UPDATE.ERROR,
                    err: err
                });
            });
    };

     userLogin(req, res) {
         const email = req.body.email;
         const password = req.body.password;
        if (!email && !password) {
            return res.status(apiCodes.BAD_REQUEST).send({
                message: message.EMAIL_AND_PASSWORD_NOT_PROVIDED
            });
        }
        LoginService.login(email, password).then((user) => {
            const token = passport.generateToken(user);
            passport.decodeToken(token).then((decodedToken) => {
                LoginService.setTokenData(decodedToken, user, token).then((tokenData) => {
                    return res.status(apiCodes.SUCCESS).send(tokenData);
                });
            }).catch((error) => {
                return res.status(apiCodes.BAD_REQUEST).send({
                    message: message.ERROR_IN_DECODING_TOKEN,
                    err: error
                });
            });
        }).catch((error) => {
            return res.status(apiCodes.UNAUTHORIZED).send({
                message: message.EMAIL_AND_PASSWORD_NOT_MATCHED
            });
        });

    };

     userLogout(req, res) {
        LoginService.logout(req.token.user).then((result) =>{
            res.send(message.MESSAGES.AUTH.TOKEN_INVALID);
        }).catch((error) => {
            res.status(apiCodes.UNAUTHORIZED).send({
                'message': message.MESSAGES.USER.LOGOUT.ERROR,
                err: error
            });
        });
    };
}

module.exports = new userController();


