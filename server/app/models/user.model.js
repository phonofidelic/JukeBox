const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const STRINGS = {
	email_validation_msg: 'Please enter a valid email address'
}

// Validation adapted from https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax/18022766#18022766
const UserSchema = new Schema({
	email: { 
		type: String, 
		required: 'A valid email address is required',
		lowercase: true,
		unique: true,
		// TODO: What's difference between validate and match?
		validate: [
			(email) => emailRegex.test(email),
			STRINGS.email_validation_msg
		],
		match: [emailRegex, STRINGS.email_validation_msg]
	},
	password: { type: String, required: true },
});

// Encrypt password before saving to DB
UserSchema.pre('save', function(next) {
	let user = this;
	SALT_FACTOR = 5;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) {
			console.error('comparePassword error:', err)
			return cb(err);
		}
		cb(null, isMatch);
	});
};

module.exports = mongoose.model(
	'User',
	UserSchema
);