'use strict';
var permissions = require('../../utilities/permission.service');

module.exports = function (app) {

    /**
     * Users Api Routes
     */
    app.route('/api/v1/users')
        .get(permissions.loggedIn, app.getUsers)
        .post(app.createUser);

    app.route('/api/v1/users/:userId')
        .delete(permissions.loggedIn, permissions.isAdmin, app.deleteUser)
        .put(permissions.loggedIn, app.updateUser);

    app.route('/api/v1/user/login')
        .post(app.userLogin);

    app.route('/api/v1/user/logout')
        .get(permissions.loggedIn, app.userLogout);
};
