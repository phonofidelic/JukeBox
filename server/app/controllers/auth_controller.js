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
			let userInfo = setUserInfo(user);

			res.json({
				message: 'new user registered',
				token: generateToken(userInfo),
				user: userInfo
			});
		});
	});	
}

exports.login = (req, res, next) => {
	// console.log('login:', req.body)
	const { email, password } = req.body;
	const userInfo = setUserInfo(req.user);
	console.log('userInfo:', userInfo)

	res.json({
		message: 'Login successfull',
		token: generateToken(userInfo),
		user: userInfo
	});
}

exports.getUserInfo = (req, res, next) => {
	console.log('getUserInfo', req.get('userId'))
	const user = User.findOne({_id: req.get('userId')}, (err, user) => {
		if (err) return next(err);
		return user;
	});
	user.select('email _id');
	user.exec((err, user) => {
		if (err) return next(err);
		res.json({
			message: 'User info retrieved',
			user: user
		});
	});
}
