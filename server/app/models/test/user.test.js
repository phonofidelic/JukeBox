'use-strict';
const User = require('../user.model');
const expect = require('chai').expect;

// TODO: set a global source for string data
const STRINGS = {
	default_unknown: 'Unknown',
	default_noDescription: 'No description provided'
};

let testUser;

describe('User model', function() {
	describe('validation', function() {
		testUser = new User({});

		it('should require an email', function(done) {
			testUser.validate(err => {
				expect(err.errors.email).to.exist;
				done();
			});
		});

		it('should require a password', function(done) {
			testUser.validate(err => {
				expect(err.errors.password).to.exist;
				done();
			});
		});
	});
});