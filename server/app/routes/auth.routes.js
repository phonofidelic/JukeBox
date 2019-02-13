const router = require('express').Router();
const passportService = require('../../config/passport_config');
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const jwt = require('jsonwebtoken');
// const utils = require('./utils')

const requireLogin = passport.authenticate('local', { session: false });
// const requireAuth = passport.authenticate('jwt', { session: false });

// const requireAuth = (req, res, next) => {
// 	passport.authenticate('jwt', { session: false }, (err, user, info) => {
// 		if (err) {
// 			console.log('\n*** JWT auth error:', err);
// 			return next(err);
// 		}
// 		if (info && info.name === 'TokenExpiredError') {
// 			console.log('*** TOKEN EXPIRED ***')
// 			// return next(info)
// 			authController.refreshToken(req, res, next);
// 		} else {
// 			console.log('\n*** JWT auth success!', user)
// 			return next(null, user);
// 		}
// 	})(req, res, next);
// }

const handleExpiredToken = (req, res, next) => {
	console.log('*** TOKEN EXPIRED ***');
	const expiredToken = req.expiredToken;
	jwt.verify(expiredToken, process.env.JWT_SECRET, { ignoreExpiration: true }, (err, decodedExpired) => {
		if (err) return next(err);
		req.userId = decodedExpired._id;
		delete req.expiredToken;
		return authController.refreshToken(req, res, next);
	});
};

const requireAuth = (req, res, next) => {
	const token = req.cookies.JWT;
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err && err.name === 'TokenExpiredError') {
			req.expiredToken = token;
			return err.name === 'TokenExpiredError' ? handleExpiredToken(req, res, next) : next(err);
		}
		console.log('*** decoded:', decoded)
		req.userId = decoded._id;
		return next();
	});
};

router.post('/register', 
	authController.registerNewUser
);

router.post('/login', 
	requireLogin, 
	authController.login
);

// router.get('/token',
// 	requireAuth,
// 	authController.refreshToken
// );

router.get('/user', 
	requireAuth,
	authController.getUserInfo
);

module.exports = router;
