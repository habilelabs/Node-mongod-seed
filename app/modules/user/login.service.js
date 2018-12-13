const userDbService = require('./user-db.service.js');
const bcrypt = require('bcryptjs');
const message = require('../../../config/messages.js');

class loginService {
    login(username, password) {
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

    logout(user) {
        return userDbService.updateLastValid(user._id);
    }

    setTokenData(decodedToken,user,token) {
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

    async getUserFromId(userId) {
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

module.exports = new loginService();
