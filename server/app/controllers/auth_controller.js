const User = require('../models').UserModel;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../config');

const generateToken = user => {
	return jwt.sign(user, config.JWT_SECRET, {
		expiresIn: 3600
	});
};

const setUserInfo = user => {
	return {
		_id: user._id,
		email: user.email
	}
}

exports.registerNewUser = (req, res, next) => {
	console.log('registerNewUser:', req.body)
	const { email, password } = req.body;
	// TODO: Validate registration data before writing to DB

	User.findOne({email: email}, (err, existingUser) => {
		if (err) return next(err);
		if (existingUser) return res.status(422).send({error: 'Sorry, that email address is already in use'});

		const user = new User({
			email: email,
			password: password
		});
		user.save((err, user) => {
			if (err) return next(err);
			res.json({
				message: 'new user registered',
				token: `fake_token_${Date.now()}`,
				user: setUserInfo(user)
			});
		});
	});	
}

exports.login = (req, res, next) => {
	console.log('login:', req.body)
	const { email, password } = req.body;
	let userInfo = setUserInfo(req.user);
	console.log('userInfo:', userInfo)

	res.json({
		token: 'JWT ' + generateToken(userInfo),
		user: userInfo
	});
}
