const apiCodes = require('../../../config/api-codes.js');
const message = require('../../../config/messages.js');
const UserDbService = require('./user-db.service.js');
const UserService = require('./user.service.js');
const mongoose = require('mongoose');
const LoginService = require('./login.service');
const passport = require('../../../config/passport');

class userController {

    /**
     * @api {post} /api/v1/users Create A new User
     * @apiVersion 0.0.1
     * @apiName Create A new User
     * @apiGroup Users
     *
     *@apiHeader (Headers) {String} Authorization JWT token
     *
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjowMzowMy4zODBaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgwOTgzLCJleHAiOjE0OTA2ODE1ODN9.kQucJ-xeuMxEv-X-p72BW_0EewH6M3Jh4ByfHYg9hCI"
     *     }
     *
     * @apiParam {Object} name contains firstNAme and lastName of User.
     * @apiParam {String} email User Email.
     * @apiParam {String} password User Password.
     * @apiParam {String} role User Role.
     *
     *
     @apiParamExample Param-Example:
     {
        "email":"rohit@habilelabs.io",
     "password":"rohit@123",
     "role":"admin",
     "name" : {
	            "firstName":"rohit",
	            "lastName":"katiyar"
                }
     }
     * @apiSuccess {String} message Successfully saved
     * @apiSuccess {Object} data Created User data
     *
     @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     {
  "message": "successfully created",
  "data": {
        "email": "rohit@habilelabs.io",
     "password": null,
     "_id": "58d9f9e8c94fb70cf87b3c9e",
     "updated": {
            "on": 1490680288433
            },
     "created": {
            "by": "58d52d8f68e305004c0d56ae",
            "on": 1490680288433
            },
     "role": "admin",
     "name": {
        "firstName": "rohit",
        "lastName": "katiyar"
                }
     }
     }
     */
     async createUser(req, res) {
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

        try {
           const user =  await  UserDbService.create(userObj);
            if (user.password) {
                user.password = null;
            }

            return res.status(apiCodes.SUCCESS).send({
                message: message.CREATION_SUCCESS
            });
        }
        catch(err) {
            return res.status(apiCodes.INTERNAL_ERROR).send({
                message: message.ERROR_IN_CREATING_USER,
                err: err
            });
        }

    };


    /**
     * @api {get} /api/v1/users'---' Get All Users
     * @apiVersion 0.0.1
     * @apiName Get All Users
     * @apiGroup Users
     *
     *@apiHeader (Headers) {String} Authorization JWT token
     *
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjowMzowMy4zODBaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgwOTgzLCJleHAiOjE0OTA2ODE1ODN9.kQucJ-xeuMxEv-X-p72BW_0EewH6M3Jh4ByfHYg9hCI"
     *     }
     *
     *
     * @apiSuccess {Array} data All User details
     *
     @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     {
       "data": [
         {
           "_id": "58d9193c5fa664244c866c1a",
           "email": "rohit@habilelabs.io",
     "updated": {
        "by": "58d52d8f68e305004c0d56ae",
        "on": 1490622785341
      },
     "created": {
        "by": "58d52d8f68e305004c0d56ae",
        "on": 1490622684612
      },
     "role": "user",
     "name": {
        "firstName": "rohit"
      }
     },
     {
       "email": "rohit_1@habilelabs.io",
     "_id": "58d9195d5fa664244c866c26",
     "updated": {
        "on": 1490622684612
      },
     "created": {
        "by": "58d52d8f68e305004c0d56ae",
        "on": 1490622684612
      },
     "role": "admin",
     "name": {
        "firstName": "rohit"
      }
     }
     ]
     }
     */
     async getUsers(req, res) {
         try {
            const users = await UserDbService.getAll({});
             return res.status(apiCodes.SUCCESS).send({
                 data: users
             });
         }
         catch(err) {
             return res.status(apiCodes.INTERNAL_ERROR).send({
                 message: message.ERROR_IN_GETTING_USERS,
                 err: err
             });
         }
    };

    /**
     * @api {delete} /api/v1/users/:userId Delete a User By userId
     * @apiVersion 0.0.1
     * @apiName Delete a User By userId
     * @apiGroup Users
     *
     *@apiHeader (Headers) {String} Authorization JWT token
     *
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjowMzowMy4zODBaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgwOTgzLCJleHAiOjE0OTA2ODE1ODN9.kQucJ-xeuMxEv-X-p72BW_0EewH6M3Jh4ByfHYg9hCI"
     *     }
     *
     * @apiSuccess {String} message success Message
     *
     @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     {
            "message":"Successfully Deleted"
     }
     */
     async deleteUser(req, res) {
         const userObj = {_id: mongoose.Types.ObjectId(req.params.userId)};
         try {
             const user = await UserDbService.removeUser(userObj);
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
         }
         catch(err) {
             return res.status(apiCodes.INTERNAL_ERROR).send({
                 message: message.ERROR_IN_GETTING_USER,
                 err: err
             });
         }
    };


    /**
     * @api {put} /api/v1/users/:userId Update a Particular User
     * @apiVersion 0.0.1
     * @apiName Update a Particular User
     * @apiGroup Users
     *
     *
     *@apiHeader (Headers) {String} Authorization JWT token
     *
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjowMzowMy4zODBaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgwOTgzLCJleHAiOjE0OTA2ODE1ODN9.kQucJ-xeuMxEv-X-p72BW_0EewH6M3Jh4ByfHYg9hCI"
     *     }
     *
     * @apiParam {Object} name contains firstNAme and lastName of User.
     * @apiParam {String} email User Email.
     * @apiParam {String} password User Password.
     * @apiParam {String} role User Role.
     *
     *
     @apiParamExample Param-Example:
     {
        "email":"rohit@habilelabs.io",
     "password":"rohit@123",
     "role":"admin",
     "name" : {
	            "firstName":"rohit",
	            "lastName":"katiyar"
                }
     }
     *
     * @apiSuccess {String} message User updated Successfully
     *
     @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     {
    "message": "User updated Successfully"
    }
     */
     async updateUser(req, res) {
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

        try {
            await UserService.updateUser(userFindObj, userObj);
            return res.status(apiCodes.SUCCESS).send({
                message: message.USER_UPDATED
            });
        }
        catch(err) {
            return res.status(apiCodes.INTERNAL_ERROR).send({
                message:message.MESSAGES.USER.UPDATE.ERROR,
                err: err
            });
        }
    };

    /**
     * @api {POST} /api/v1/user/login User Login
     * @apiVersion 0.0.1
     * @apiName User Login
     * @apiGroup Users
     *
     * @apiParam {String} email User Email.
     * @apiParam {String} password User Password.
     *
     *
     @apiParamExample Param-Example:
     {
        "email":"rohit@habilelabs.io",
     "password":"rohit@123",
     }
     *
     * @apiSuccess {String} token User token
     * @apiSuccess {Object} user User object conatins email and role
     * @apiSuccess {String} expires Time to expire a token
     *
     @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     {
     "user": {
       "email": "rohit@habilelabs.io",
     "role": "admin"
     },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNThkNTJkOGY2OGUzMDUwMDRjMGQ1NmFlIiwibGFzdFZhbGlkIjoiMjAxNy0wMy0yOFQwNjoyNDoyNi4wODFaIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNDkwNjgyMjY2LCJleHAiOjE0OTA2ODI4NjZ9.UA0WedOkD6yywEd16a5iVZTPQanNa4ZtUWx5roP89Vg",
     "expires": "2017-03-28T06:34:26.000Z"
     }
     */
     async userLogin(req, res) {
         const email = req.body.email;
         const password = req.body.password;
        if (!email && !password) {
            return res.status(apiCodes.BAD_REQUEST).send({
                message: message.EMAIL_AND_PASSWORD_NOT_PROVIDED
            });
        }

        try {
            const user = await LoginService.login(email, password);
            const token = passport.generateToken(user);
            const decodedToken = await passport.decodeToken(token);
            const tokenData = LoginService.setTokenData(decodedToken, user, token);
            // send response with success
            return res.status(apiCodes.SUCCESS).send(tokenData);
        }
        catch(err) {
            // error handling
            // TODO: All types of login errors will be handled here
            if (err === 'decode_error') {
                return res.status(apiCodes.BAD_REQUEST).send({
                    message: message.ERROR_IN_DECODING_TOKEN,
                    err: error
                });
            } else {
                return res.status(apiCodes.UNAUTHORIZED).send({
                    message: message.EMAIL_AND_PASSWORD_NOT_MATCHED
                });
            }
        }

    };

     async userLogout(req, res) {
         try {
             await LoginService.logout(req.token.user);
             res.send(message.MESSAGES.AUTH.TOKEN_INVALID);
         }
         catch(err) {
             res.status(apiCodes.UNAUTHORIZED).send({
                 'message': message.MESSAGES.USER.LOGOUT.ERROR,
                 err: err
             });
         }
    };
}

module.exports = new userController();


