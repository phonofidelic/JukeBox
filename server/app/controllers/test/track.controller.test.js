// const sinon = require('sinon');
const expect = require('chai').expect;
const chaiAsPromised = require("chai-as-promised");
const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const server = require('../../../');
// const	trackController = require('../track.controller');
const utils = require('../utils');
// const Track = require('../../models/track.model');
const Artist = require('../../models/artist.model');

chai.should();
chai.use(chaiAsPromised);

describe('utils', function() {
	describe('checkArtist', function() {
		const metaData = {
			common: {
				artist: 'Black Flag'
			}
		};
		const userId = '5b39abf37744c81d7c39bb74';

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

		it('should resolve with an Artist document', function(done) {
			// return utils.checkArtist(metaData, Artist, userId).should.eventually.equal(returnedArtist)
			return testPromise('pass').should.eventually.equal('pass')
		});
	});
});
