const userDbService = require('./user-db.service.js');
const bcrypt = require('bcryptjs');
const message = require('../../../config/messages.js');

class loginService {
    /**
     * Login function
     * @param username
     * @param password
     * @returns {Promise}
     */
    static login(username, password) {
        return new Promise((resolve, reject) => {
            userDbService.getUserByEmail(username).then((user) => {
                if (!user) {
                    reject('User not Found');
                }
                else if (user && username === user.email && bcrypt.compareSync(password, user.password)) {
                    if (!user.lastValid) {
                        user.lastValid = new Date();
                        user.save();
                    }
                    resolve(user);
                } else {
                    reject('password do not match');
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

    /**
     * Logout function
     * @param user
     * @returns {*}
     */
    static logout(user) {
        return userDbService.updateLastValid(user._id);
    }

    /**
     * Set token data after the user is logged in
     * @param decodedToken
     * @param user
     * @param token
     * @returns {{user: {_id, email: (*|email|{type, required, index}|{type, required, unique}), role: (*|role|{type}), name}, token: *, expires: string}}
     */
    static setTokenData(decodedToken,user,token) {
        const expires = decodedToken.exp * 1000;
        const tokenData = {
            user : {
                _id: user._id,
                email: user.email,
                role: user.role,
                name: user.name
            },
            token: token,
            expires: new Date(expires).toISOString()
        };

        return tokenData;
    }

    /**
     * Get user data from user id
     * @param userId
     * @returns {Promise}
     */
    static async getUserFromId(userId) {
       try {
            const user = await userDbService.getUserById(userId);
            if (user) {
                return new Promise(resolve => resolve(user));
            } else {
                return new Promise(reject => reject({'message':message.MESSAGES.USER.GET.ERROR_NO_USER + userId}));
            }
        }
        catch(err) {
            return new Promise(reject => reject(err));
        }
    }
}

module.exports = loginService;
