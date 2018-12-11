var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var loginWebService = require('../app/modules/user/login.service');
var Q = require('q');
var Status = require('./Status');
var Constants = require('./messages');

passport.use(new LocalStrategy(
  function(username, password, done) {
    loginWebService.login(username, password).then(function(response) {
      return done(null, response.data);
    }).catch(function(error) {
      return done(error);
    });
  }
));

var jwtOptions = {
  secretOrKey: 'pooh5eiy6oonoa7aiDeeniexieJe3ahr1OhaeRohcie7Sha3chio7ooph7ooShai'
};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();

passport.use(new JwtStrategy(jwtOptions,
  function(jwt_payload, done) {
    if (!jwt_payload.user) {
      var status = new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_PAYLOAD_ERROR);
      return done(status);
    }

    loginWebService.getUserFromId(jwt_payload.user).then(function(user) {
      var payloadValid = new Date(jwt_payload.lastValid);

      if (user.lastValid && payloadValid >= user.lastValid) {
        return done(null, user);
      } else {
        var status = new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.LOGGED_OUT, Constants.MESSAGES.AUTH.LOGGED_OUT_ERROR);
        return done(status);
      }
    }).catch(function(error) {
      var status = new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_PAYLOAD_ERROR, error);
      return done(status);
    });
  }
));

passport.generateToken = function(user) {
  var payload = {
    user: user._id,
    lastValid: user.lastValid ? user.lastValid : new Date(0)

  };

  var token = jwt.sign(payload, jwtOptions.secretOrKey, {
    expiresIn: "100 minutes"
  });

  return token;
};

passport.getToken = function(req) {
  var jwtFromRequest = ExtractJwt.fromAuthHeader();
  return jwtFromRequest(req);
};

passport.decodeToken = function(token) {
  var deferred = Q.defer();

  jwt.verify(token, jwtOptions.secretOrKey, function(err, decoded) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(decoded);
    }
  });

  return deferred.promise;
};


module.exports = passport;
