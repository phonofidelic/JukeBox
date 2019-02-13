const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../app/models/user.model');
const jwt = require('jsonwebtoken');

const localOptions = { usernameField: 'email' };
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('token'),
	secretOrKey: process.env.JWT_SECRET,
	// TODO: issuer: proccess.env.JWT_ISSUER
	// TODO: audience: proccess.env.JWT_AUDIENCE
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
		User.findOne({ email }, (err, user) => {
			if (err) return done(err);
			if (!user) return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
			user.comparePassword(password, (err, isMatch) => {
				if (err) return done(err);
				if (!isMatch) return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
				return done(null, user);
			});
		});
	}
);

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	console.log('\n*** JwtStrategy, payload:', payload)
	User.findById(payload._id, '_id email', (err, user) => {
		if (err) return done(err, false); 
		if (user) return done(null, user);
		return done(null, false);
	});
});

passport.use(localLogin);
passport.use(jwtLogin);
