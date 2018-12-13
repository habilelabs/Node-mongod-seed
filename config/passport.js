const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const loginWebService = require('../app/modules/user/login.service');
const Status = require('./Status');
const Constants = require('./messages');

passport.use(new LocalStrategy(
  (username, password, done) => {
    loginWebService.login(username, password).then((response) => {
      return done(null, response.data);
    }).catch((error) => {
      return done(error);
    });
  }
));

const jwtOptions = {
  secretOrKey: 'pooh5eiy6oonoa7aiDeeniexieJe3ahr1OhaeRohcie7Sha3chio7ooph7ooShai'
};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();

passport.use(new JwtStrategy(jwtOptions,
  (jwt_payload, done) => {
    if (!jwt_payload.user) {
        const status = new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_PAYLOAD_ERROR);
      return done(status);
    }

    loginWebService.getUserFromId(jwt_payload.user).then((user) => {
        const payloadValid = new Date(jwt_payload.lastValid);

      if (user.lastValid && payloadValid >= user.lastValid) {
        return done(null, user);
      } else {
          const status = new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.LOGGED_OUT, Constants.MESSAGES.AUTH.LOGGED_OUT_ERROR);
        return done(status);
      }
    }).catch((error) => {
        const status = new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_PAYLOAD_ERROR, error);
      return done(status);
    });
  }
));

passport.generateToken = (user) => {
    const payload = {
    user: user._id,
    lastValid: user.lastValid ? user.lastValid : new Date(0)

  };

    const token = jwt.sign(payload, jwtOptions.secretOrKey, {
    expiresIn: "100 minutes"
  });

  return token;
};

passport.getToken = (req) => {
    const jwtFromRequest = ExtractJwt.fromAuthHeader();
  return jwtFromRequest(req);
};

passport.decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtOptions.secretOrKey, (err, decoded) => {
            if (err) {
                reject('decode_error');
            } else {
                resolve(decoded);
            }
        });
    });
};


module.exports = passport;
