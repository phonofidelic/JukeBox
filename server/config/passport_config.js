const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../app/models/user.model');

const localOptions = { usernameField: 'email' };
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('token'),
	secretOrKey: process.env.JWT_SECRET,
};

const localLogin = new LocalStrategy(
	localOptions, 
	(email, password, done) => {
		// console.log('### email:', email)
		// console.log('### password:', password)
		User.findOne({ email }, (err, user) => {
			if (err) {
				// console.error('### User.findOne, error:', err)
				return done(err);
			}
			if (!user) {
				// console.log('### User.findOne, not found')
				return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
			}

			user.comparePassword(password, (err, isMatch) => {
				if (err) {
					// console.error('### comparePassword error:', err)
					return done(err);
				}
				if (!isMatch) {
					// console.log('### comparePassword, no match')
					return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
				}
				// console.log('### comparePassword, user:', user)
				return done(null, user);
			});
		});
	}
);

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// console.log('JwtStrategy, payload:', payload)
	User.findById(payload._id, function(err, user) {
		if (err) { 
			// console.error('Could not find user:', err);
			return done(err, false); 
		}

		if (user) {
			done(null, user);
		} else {
			// console.log('No user...');
			done(null, false);
		}
	});
});

passport.use(localLogin);
passport.use(jwtLogin);
