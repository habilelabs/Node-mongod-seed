//db layer for users model
const User = require('./user.model');
const bcrypt = require('bcryptjs');

class userDbService {
    /**
     * Create user
     * @param userData
     * @returns {*}
     */
    static create(userData) {
        const user = new User(userData);
        return user.save();
    }

    /**
     * Get all users
     * @param userObj
     * @returns {*}
     */
    static getAll(userObj) {
        return User.find(userObj, {__v: 0,password:0});
    }

    /**
     * delete user
     * @param userObj
     * @returns {*}
     */
    static removeUser(userObj) {
        return User.remove(userObj);
    }

    /**
     * generate password using bcrypt hash
     * @param password
     * @returns {string|string}
     */
    static generatePassword(password) {
        return bcrypt.hashSync(password, 8);
    }

    /**
     * Get user data by email
     * @param email
     * @returns {*}
     */
    static getUserByEmail(email) {
        const userObj = {email: email};
        return User.findOne(userObj);
    }

    /**
     * Update last valid for user
     * @param id
     * @returns {*}
     */
    static updateLastValid(id) {
        return User.findByIdAndUpdate(id, { 'lastValid': new Date() }, { new: true });
    }

    /**
     * Update user data
     * @param userFindObj
     * @param userObj
     * @returns {*}
     */
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

    /**
     * Get user data by id
     * @param id
     * @returns {*}
     */
    static getUserById(id) {
        return User.findOne({ _id: id});
    }
}

module.exports =  userDbService;