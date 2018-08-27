'use-strict';
// const expect = require('chai').expect;
const mongoose = require('mongoose');
const Artist = require('../artist.model');

// TODO: set a global source for string data
const STRINGS = {
	default_unknown: 'Unknown',
	default_noDescription: 'No description provided'
};

let testArtist;
let testUserId;
let testAlbumId;
let testFoundWithAlbumId;

describe('Artist model', function() {
	describe('validation', function() {
		beforeEach(function() {
			testArtist = new Artist({});
		});

		it('should require a userId', function(done) {
			testArtist.validate(function(err) {
				expect(err.errors.userId).toEqual(expect.anything());
				done();
			});
		});		
	});

	describe('default values', function() {
		beforeEach(function() {
			testUserId = '5b39abf37744c81d7c39bb74'; // TODO: Don't hardcode, set up test user creation/registration to obtain a valid user id
			testArtist = new Artist({userId: testUserId});
		});

		it(`should include a name of '${STRINGS.default_unknown}'`, function(done) {
			expect(testArtist.name).toEqual(STRINGS.default_unknown);
			done();
		});

		it(`should include a description of '${STRINGS.default_noDescription}'`, function(done) {
			expect(testArtist.description).toEqual(STRINGS.default_noDescription);
			done();
		});
	});
});