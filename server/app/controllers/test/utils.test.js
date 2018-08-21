'use-strict';
const expect = require('chai').expect;
const chaiAsPromised = require("chai-as-promised");
const chai = require('chai');
const utils = require('../utils');
const Artist = require('../../models/artist.model');

chai.should();
chai.use(chaiAsPromised);

describe('utils', () => {
	describe('checkArtist', () => {
		const metaData = {
			common: {
				artist: 'Black Flag'
			}
		};

		const userId = '5b39abf37744c81d7c39bb74';

		it('should return a Promise', () => {
			const checkArtistResult = utils.checkArtist(metaData, Artist, userId);
			expect(checkArtistResult.then).to.be.a('Function')
			expect(checkArtistResult.catch).to.be.a('Function')
		});

		it('should resolve with an Artist document', function() {
			// this.timeout(10000);
			const checkArtistResult = utils.checkArtist(metaData, Artist, userId);

			const testPromise = (input) => new Promise((resolve, reject) => {
				input === 'pass' ? resolve(input) : reject(input);
			})

			const returnedArtist = {
		    "_id" : "5b692147225ff4a162fd40e1",
		    "name" : "Black Flag",
		    "albums" : [ 
	        {
	          "title" : "The First Four Years",
	          "_id" : "5b692147225ff4a162fd40e2"
	        }
		    ],
		    "description" : "No description provided",
		    "userId" : "5b39abf37744c81d7c39bb74",
		    "__v" : 1
			};

			return utils.checkArtist(metaData, Artist, userId)
			.then(result => {
				console.log('### checkArtistResult, result:', result)	
				expect(result).toEqual(returnedArtist);
				// return done()
			})
			.catch(err => {
				console.log('### checkArtistResult, err:', err)	
				// return done(err)
			})
			// // done()
			
			// return testPromise('pass').should.eventually.equal('pass');
			// return utils.checkArtist(metaData, Artist, userId).should.eventually.equal(returnedArtist);

			// return testPromise('pass').then(result => {
			// 	expect(result).to.equal('pass')
			// })

			const p = Promise.resolve(returnedArtist)
			return expect(p).to.become(returnedArtist)
		});
	});
});
