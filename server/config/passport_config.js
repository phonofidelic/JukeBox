
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../app/models').UserModel;
const config = require('./index');

const localOptions = { usernameField: 'email' };
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('token'),
	secretOrKey: config.JWT_SECRET,
};

const localLogin = new LocalStrategy(
	localOptions, 
	(email, password, done) => {
		User.findOne({ email }, (err, user) => {
			if (err) return done(err);
			if (!user) return done(null, false, { error: 'Your login details could not be verified. Please try again.' });

			user.comparePassword(password, (err, isMatch) => {
				if (err) return done(err);
				if (!isMatch) return done(null, false, { error: 'Your login details could not be verified. Please try again.' })
				return done(null, user);
			});
		});
	}
);

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	console.log('JwtStrategy, payload:', payload)
	User.findById(payload._id, function(err, user) {
		if (err) { 
			console.error('Could not find user:', err);
			return done(err, false); 
		}

		if (user) {
			done(null, user);
		} else {
			console.log('No user...')
			done(null, false)
		}
	});
});

passport.use(localLogin);
passport.use(jwtLogin);
