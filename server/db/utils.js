const DB_CONNECTION = 'mongodb://localhost:27017/jukeTest';
const mongoose = require('mongoose');
const User = require('../app/models/user.model');

console.log('### DB_CONNECTION:', DB_CONNECTION);
// Configure db
mongoose.connect(DB_CONNECTION);
const db = mongoose.connection;

module.exports.removeUserByEmail = email => {
	return User.findOneAndRemove({email: email}, (err, removedUser) => {
		if (err) return console.error('Could not remove User by email:\n', err);
		return console.log(`removed user with email ${email}:\n`, removedUser)
	});
};