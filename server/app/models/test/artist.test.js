'use-strict';
const Artist = require('../artist.model');
const expect = require('chai').expect;

// TODO: set a global source for string data
const STRINGS = {
	default_unknown: 'Unknown',
	default_noDescription: 'No description provided'
};

let artistTest;
let testUserId;

describe('Artist model', function() {
	describe('validation', function() {
		beforeEach(function() {
			artistTest = new Artist({});
		});

		it('should require a userId', function(done) {
			artistTest.validate(function(err) {
				// console.log('### err:', err.errors.userId)
				expect(err.errors.userId).to.exist;
				done();
			});
		});		
	});

	describe('default values', function() {
		beforeEach(function() {
			testUserId = '5b39abf37744c81d7c39bb74';
			artistTest = new Artist({userId: testUserId});
		});

		it(`should include a name of '${STRINGS.default_unknown}'`, function(done) {
			// artistTest = new Artist({userId: testUserId});

			expect(artistTest.name).to.equal(STRINGS.default_unknown);
			done();
		});

		it(`should include a description of '${STRINGS.default_noDescription}'`, function(done) {
			// artistTest = new Artist({userId: testUserId});

			expect(artistTest.description).to.equal(STRINGS.default_noDescription);
			done();
		});
	});
});