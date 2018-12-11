var Q = require('q');
var message = require('../../../config/messages.js');
var _ = require('lodash');
var envConfiguration = require('../../../config/env-config');
var envConfig = envConfiguration.getENV();
var UserDbService = require('../user/user-db.service.js');

module.exports = {

    /**
     * Service to update user
     */
    updateUser: function (userFindObj, userObj) {
        return UserDbService.updateUser(userFindObj, userObj);
    }

};
