
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../app/models').UserModel;
const config = require('./index');

const localOptions = { usernameField: 'email' };
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader(),
	secretOrKey: '1JFlYjRtx7IUm8l0d6aT',
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
	User.findById(payload._id, function(err, user) {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false)
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);