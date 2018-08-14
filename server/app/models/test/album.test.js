'use-strict';
const expect = require('chai').expect;
const Album = require('../album.model');

// TODO: set a global source for string data
const STRINGS = {
	default_unknown: 'Unknown',
	default_noDescription: 'No description provided'
};

let albumTest;
let testUserId;

describe('Album model', function() {
	describe('validation', function() {
		beforeEach(function() {
			testAlbum = new Album({});
		})

		it('sould require a userId', function(done) {
			testAlbum.validate(function(err) {
				expect(err.errors.userId).to.exist;
				done();
			});
		});
	});

	describe('default values', function() {
		beforeEach(function() {
			testUserId = '5b39abf37744c81d7c39bb74';
			albumTest = new Album({ userId: testUserId });
		});

		it(`should include a title of '${STRINGS.default_unknown}'`, function(done) {
			expect(albumTest.title).to.equal(STRINGS.default_unknown);
			done();
		});

		it(`should include a description of '${STRINGS.default_noDescription}'`, function(done) {
			expect(albumTest.description).to.equal(STRINGS.default_noDescription);
			done();
		});
	});
});