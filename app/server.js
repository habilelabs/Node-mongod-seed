var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var server = express();
var passport = require('passport');
var env = require('process').env;
var envConfig = require('../config/env-config').getENV();
//configure middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
//start promise to mongoose and connect
mongoose.Promise = global.Promise;
mongoose.connect(envConfig.db_url);
server.use(passport.initialize());


if(process.env.NODE_ENV === 'local') {
    mongoose.set('debug', true);
}

// load all models
var moduleFiles = fs.readdirSync(__dirname + '/modules');
for (var i = 0; i < moduleFiles.length; i++) {
    loadModule(moduleFiles[i], "model");
}
//load all controllers
for (var j = 0; j < moduleFiles.length; j++) {
    loadModule(moduleFiles[j], "controller");
}

// load routes
for (var j = 0; j < moduleFiles.length; j++) {
    loadModule(moduleFiles[j], "route");
}
/**
 * Function load a module. This function walk to a module folder and load modeles, routes and controllers to express app.
 * @param module
 */
function loadModule (module, type) {
    var moduleLocation = __dirname + '/modules/' + module;
    var moduleFile = fs.readdirSync(moduleLocation);
    moduleFile.forEach(function loadFile(file) {
        var fileName = file.split('.');
        if (fileName && fileName.length > 0) {
            var fileType = fileName[1];
            if (fileType === type && type ==='model') {
                // it is a model.
                return require(moduleLocation + '/' + file);
            }
            else if (fileType === type) {
                // it is a controller
                return (require(moduleLocation + '/' + file))(server);
            }
            //ignore rest other files

        }
    });
}

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' === req.method) {
        res.send(204);
    }
    else {
        next();
    }
});

// register moogoose callbacks
//On successful connection
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + envConfig.db_url);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

var port = env.PORT || 9001;
server.listen( port, function() {
    console.log('Express server listening on port '+port);
} );
module.exports = server;