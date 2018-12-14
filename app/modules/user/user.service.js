const _ = require('lodash');
const userDbService = require('../user/user-db.service');

class userService {
    /**
     * Update a particular user
     * @param userFindObj
     * @param userObj
     * @returns {*}
     */
    static updateUser(userFindObj, userObj) {
        return userDbService.updateUser(userFindObj, userObj);
    }
}
module.exports = userService;
