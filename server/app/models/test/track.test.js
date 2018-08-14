'use-strict';
const Track = require('../track.model');
const expect = require('chai').expect;

// TODO: set a global source for string data
const STRINGS = {
	default_unknown: 'Unknown',
	default_noDescription: 'No description provided'
};

let testTrack;
let testUserId;
let testArtistId;
let testAlbumId;

describe('Track model', function() {
	describe('validation', function() {
		beforeEach(function() {
			testTrack = new Track({});
		});

		it('sould require a userId', function(done) {
			testTrack.validate(function(err) {
				expect(err.errors.userId).to.exist;
				done();
			});
		});

		it('should require an artistId', function(done) {
			testTrack.validate(function(err) {
				expect(err.errors.artistId).to.exist;
				done();
			});
		});

		it('should require an albumId', function(done) {
			testTrack.validate(function(err) {
				expect(err.errors.albumId).to.exist;
				done();
			});
		});

		it('should require a file.path', function(done) {
			testTrack.validate(function(err) {
				expect(err.errors['file.path']).to.exist;
				done();
			});
		});
	});

	describe('default values', function() {
		beforeEach(function() {
			testUserId = '5b39abf37744c81d7c39bb74';
			testArtistId = '5b714602e0345812a0e28cb8';
			testAlbumId = '5b714602e0345812a0e28cb9';
			testTrack = new Track({
				userId: testUserId,
				artistId: testArtistId,
				albumId: testAlbumId
			});
		});

		it(`should include a name of '${STRINGS.default_unknown}'`, function(done) {
			expect(testTrack.title).to.equal(STRINGS.default_unknown);
			done();
		});
	});
});
