const _ = require('lodash');
const userDbService = require('../user/user-db.service');

class userService {
    static updateUser(userFindObj, userObj) {
        return userDbService.updateUser(userFindObj, userObj);
    }
}
module.exports = userService;
