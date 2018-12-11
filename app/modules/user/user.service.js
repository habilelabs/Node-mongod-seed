const _ = require('lodash');
const UserDbService = require('../user/user-db.service.js');

class userService {
    updateUser(userFindObj, userObj) {
        return UserDbService.updateUser(userFindObj, userObj);
    }
}
module.exports = new userService();
