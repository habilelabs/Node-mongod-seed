const passport = require('../../config/passport');
const Status = require('../../config/Status');
const Constants = require('../../config/messages');

class permissionService {
    loggedIn(req, res, next) {
        passport.authenticate('jwt', {session: false}, (err, user, info) => {
            if (err && err.code && err.code !== 0) {
                res.send(err);
                return;
            } else if (!user) {
                if (info && info.name === 'TokenExpiredError') {
                    res.send(new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_EXPIRE, "Expired at " + info.expiredAt));
                } else {
                    res.send(new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_PAYLOAD_ERROR, err ? err.data : undefined));
                }
                return;
            }
            const token = passport.getToken(req);

            return passport.decodeToken(token).then((decodedToken) => {
                if (!decodedToken.user) {
                    res.send(new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_PAYLOAD_ERROR, decodedToken));
                    return;
                }

                req.token = {
                    user: user,
                    lastValid: decodedToken.lastValid,
                    expires: new Date(decodedToken.exp * 1000)
                };

                next();

            }).catch((error) => {
                res.send(new Status(Status.AUTH_FAILED, Constants.MESSAGES.AUTH.TOKEN_EXPIRE, error));
                return;
            });
        })(req, res, next);
    }

    isAdmin(req, res, next) {
        const user = req.token.user;
        if (user.role && user.role !== Constants.ROLES.ADMIN) {
            res.send(new Status(Status.PERM_DENIED, Constants.MESSAGES.AUTH.PERM_DENIED));
            return;
        }
        next();
    }
}

module.exports = new permissionService();
