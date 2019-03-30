const router = require('express').Router();
const passportService = require('../../config/passport_config');
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const jwt = require('jsonwebtoken');

const requireLogin = passport.authenticate('local', { session: false });

router.post('/register', 
	authController.registerNewUser
);

router.post('/login', 
	requireLogin, 
	authController.login
);

router.get('/user', 
	authController.requireAuth,
	authController.getUserInfo
);

module.exports = router;
