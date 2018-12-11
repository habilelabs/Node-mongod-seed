const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const server = express();
const passport = require('passport');
const env = require('process').env;
const envConfig = require('../config/env-config').getENV();
//configure middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
//start promise to mongoose and connect
mongoose.Promise = global.Promise;
mongoose.connect(envConfig.db_url, { useNewUrlParser: true });
server.use(passport.initialize());


if(process.env.NODE_ENV === 'local') {
    mongoose.set('debug', true);
}

// load all models
const moduleFiles = fs.readdirSync(__dirname + '/modules');
for (let i = 0; i < moduleFiles.length; i++) {
    loadModule(moduleFiles[i], "model");
}

// load routes
for (let j = 0; j < moduleFiles.length; j++) {
    loadModule(moduleFiles[j], "route");
}
/**
 * Function load a module. This function walk to a module folder and load modeles, routes and controllers to express app.
 * @param module
 * @param type
 */
function loadModule (module, type) {
    const moduleLocation = __dirname + '/modules/' + module;
    const moduleFile = fs.readdirSync(moduleLocation);
    moduleFile.forEach(function loadFile(file) {
        const fileName = file.split('.');
        if (fileName && fileName.length > 0) {
            const fileType = fileName[1];
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

const port = env.PORT || 9001;
server.listen( port, function() {
    console.log('Express server listening on port '+port);
} );
module.exports = server;