const router = require('express').Router();
const User = require('../models').UserModel;
const config = require('../../config');
const passportService = require('../../config/passport_config');
const passport = require('passport');
const authController = require('../controllers/auth_controller');

const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/register', authController.registerNewUser);
router.post('/login', requireLogin, authController.login);
router.get('/user', requireAuth, authController.getUserInfo);
// TODO: manage response data (res.config.data looks like: 
// "{"email":"test@test.test","password":"test1234"}")

module.exports = router;