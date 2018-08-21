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
				// console.log('### err:', err.errors.userId)
				expect(err.errors.userId).toEqual(expect.anything());
				done();
			});
		});		
	});

	describe('default values', function() {
		beforeEach(function() {
			testUserId = '5b39abf37744c81d7c39bb74';
			testArtist = new Artist({userId: testUserId});
		});

		it(`should include a name of '${STRINGS.default_unknown}'`, function(done) {
			// testArtist = new Artist({userId: testUserId});

			expect(testArtist.name).toEqual(STRINGS.default_unknown);
			done();
		});

		it(`should include a description of '${STRINGS.default_noDescription}'`, function(done) {
			// testArtist = new Artist({userId: testUserId});

			expect(testArtist.description).toEqual(STRINGS.default_noDescription);
			done();
		});
	});

	// describe('methods', function() {
	// 	// beforeAll(() => {
 //  //       // mongoose.connect(process.env.DB_CONNECTION);
 //  //   });

 //  //   afterAll((done) => {
 //  //       // mongoose.disconnect(done);
 //  //   });

	// 	describe('findOneWithAlbumId', function() {
	// 		beforeEach(function() {
	// 			testAlbumId = '5b777bd517508d2c56c33312';
	// 			testUserId = '5b39abf37744c81d7c39bb74';
	// 			testArtist = new Artist({userId: testUserId});
	// 		});

	// 		it('returns an error if no match is found', function() {				
	// 			return Artist.findOneWithAlbumId(testAlbumId)
	// 			.then(artist => {
	// 				// console.log('### artist:', artist)
	// 				expect(artist.albums[0]).toEqual(testAlbumId)
	// 			})
	// 			.catch(err => {
	// 				console.log('### err:', err)
	// 				// expect(err).to.throw()
	// 			})
	// 			// return expect(Artist.findOneWithAlbumId(testAlbumId)).resolves.toEqual(testAlbumId)
	// 		});
	// 	})
	// })
});