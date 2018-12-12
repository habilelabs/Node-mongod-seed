'use strict';
const permissions = require('../../utilities/permission.service');
const userController = require('./user.controller');
module.exports =  (app) => {

    /**
     * Users Api Routes
     */
    app.route('/api/v1/users')
        .get(permissions.loggedIn, userController.getUsers)
        .post(userController.createUser);

    app.route('/api/v1/users/:userId')
        .delete(permissions.loggedIn, permissions.isAdmin, userController.deleteUser)
        .put(permissions.loggedIn, userController.updateUser);

    app.route('/api/v1/user/login')
        .post(userController.userLogin);

    app.route('/api/v1/user/logout')
        .get(permissions.loggedIn, userController.userLogout);
};
