const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
// const passport = require('passport');

const generateToken = user => {
	return jwt.sign(user, process.env.JWT_SECRET, {
		expiresIn: '5h'	// TODO: Set expiration time in env variable
	});
};

const setUserInfo = user => {
	return {
		_id: user._id,
		email: user.email
	};
};

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
		user.save((err, savedUser) => {
			if (err) return next(err);
			let userInfo = setUserInfo(savedUser);
			

			res.json({
				message: 'new user registered',
				token: generateToken(userInfo),
				user: userInfo
			});
		});
	});	
}

exports.login = (req, res, next) => {
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
	// console.log('### getUserInfo, setUserInfo(req.user)', setUserInfo(req.user))
	const user = setUserInfo(req.user);
	if (!user._id) return next(new Error('Coulld not set user info.'));

	res.json({
		message: 'User info retrieved',
		user: setUserInfo(req.user)
	});
}

// TODO: Signout/unauth user
