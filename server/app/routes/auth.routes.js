const router = require('express').Router();
const passportService = require('../../config/passport_config');
const passport = require('passport');
const authController = require('../controllers/auth.controller');

const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });
// const requireAuth = (req, res, next) => passport.authenticate('jwt', (err, user, info) => {
// 	if (err) return next(err);
// 	console.log('### requireAuth, user:', user);
// 	if (user) {
// 		res.json({
// 			message: 'User is not authenticated',
// 			authenticated: false
// 		});
// 	}
// 	return next(user);
// });

router.post('/register', authController.registerNewUser);
router.post('/login', requireLogin, authController.login);
router.get('/user', requireAuth, authController.getUserInfo);

module.exports = router;