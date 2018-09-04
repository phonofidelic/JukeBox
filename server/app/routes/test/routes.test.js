const fs = require('fs');
const request = require('supertest');
const app = require('../../index');
const User = require('../../models/user.model');
const Track = require('../../models/track.model');
const Artist = require('../../models/artist.model');
const Album = require('../../models/album.model');

const STRINGS = {
	user_registration_success: 'new user registered',
	user_login_success: 'Login successfull',
	user_data_querry_success: 'User info retrieved',
	tracks_post_success: 'Tracks saved'
};

const LOGIN_DETAILS = {
	"email": "test@test.com",
	"password": "test1234"
};

const testUserAgent = request.agent(app);

/**
 * Clear all data from test database and delete 
 * any files created  from previous test runs.
 */
const clearTestData = async (models) => {
	const { User, Track, Artist, Album } = models;
	let audioFiles = [];

	// Delete all documents in test DB
	await User.remove({}).exec();
	await Track.remove({}).exec();
	await Artist.remove({}).exec();
	await Album.remove({}).exec();

	// Delete all saved test files
	fs.readdir('./uploads/testFiles', (err, files) => {
		if (err) throw err;
		// console.log('### clearTestData, files:', files)
		files.forEach(file => {
			fs.unlink(`./uploads/testFiles/${file}`, err => {
				if (err) throw err;
				console.log('### clearTestData, deleted test file')
			});
		});
	});

	console.log('\n\### track.routes.test > clear test DB documents before test');
};

const createTestUser = async (User) => {
	const testUser = await testUserAgent
	.post('/auth/register')
	.send(LOGIN_DETAILS)
	.then(response => {
		console.log('### reg user response.body:', response.body);
	})
	.catch(err => consoel.log('### reg user err:', err));
};

describe('Routes:', () => {
	beforeAll (() => {
		clearTestData({ User, Track, Artist, Album });
	});

	describe('POST /auth/register', () => {
		// Set up expectation
		const registrationResponseBody = expect.objectContaining({
			message: STRINGS.user_registration_success,
			token: expect.any(String), //TODO: Be more specific 
			user: expect.objectContaining({
				_id: expect.any(String),
				email: LOGIN_DETAILS.email
			})
		});

		it('should register a new user', done => {
			testUserAgent
			.post('/auth/register')
			.send(LOGIN_DETAILS)
			.expect(200)
			.end((err, response) => {
				if (err) done(err);
				// console.log('\n### /auth/register, response.body:', response.body);
				expect(response.body).toEqual(registrationResponseBody);
				done();
			});
		});
	});

	describe('POST /auth/login', () => {
		// Set up expectation
		const loginResponseBody = expect.objectContaining({
			message: STRINGS.user_login_success,
			token: expect.any(String), //TODO: Be more specific
			user: expect.objectContaining({
				_id: expect.any(String),
				email: LOGIN_DETAILS.email
			})
		});

		it('should successfully log in a user with valid credentials and begin a session', function(done) {
			testUserAgent
			.post('/auth/login')
			.send(LOGIN_DETAILS)
			.expect(200)
			.end((err, response) => {
				if (err) done(err);
				// console.log('\n### /auth/login, response.body:', response.body);
				expect(response.body).toEqual(loginResponseBody)
				done();
			});
		});
	});

	describe('GET /auth/user', () => {
		// Set up expectation
		const userQuerryResponseBody = {
			message: STRINGS.user_data_querry_success,
			user: expect.objectContaining({
				_id: expect.any(String),
				email: LOGIN_DETAILS.email
			})
		};

		let token;
		let userId;

		beforeEach(done => {
			testUserAgent
			.post('/auth/login')
			.send(LOGIN_DETAILS)
			.end((err, response) => {
				if (err) done(err);
				token = response.body.token;
				userId = response.body.user._id;
				done();
			});
		});

		it('should return account info of the logged in user', done => {
			testUserAgent
			.get('/auth/user')
			.set('token', token)
			.set('userId', userId)
			.expect(200)
			.end((err, response) => {
				if (err) done(err);
				// console.log('\n### /auth/user, response.body:', response.body)
				expect(response.body).toEqual(userQuerryResponseBody);
				done();
			});
		});
	});

	describe('POST /tracks/', () => {
		const postTracksResponseBody = {
			message: STRINGS.tracks_post_success,
			tracks: []
		};

		let token;
		let userId;

		beforeEach(done => {
			testUserAgent
			.post('/auth/login')
			.send(LOGIN_DETAILS)
			.end((err, response) => {
				if (err) done(err);
				token = response.body.token;
				userId = response.body.user._id;
				done();
			});
		});

		it('should return an array of saved Track documents', () => {
			return testUserAgent
			.post('/tracks/')
			.set('token', token)
			.set('userId', userId)
			.attach('audioFiles', '../mock_assets/The Keggs- To FInd Out.mp3')
			.then(response => {
				console.log('### POST /tracks/ respoonse.body:', response.body)
			})
			.catch(err => {
				console.error('### POST /tracks/ err:', err);
			});
		});
	});

	// describe('DELETE /tracks/:trackId', () => {
	// 	const deleteTrackResponseBody = {};

	// 	let token;
	// 	let userId;

	// 	beforeEach(done => {
	// 		testUserAgent
	// 		.post('/auth/login')
	// 		.send(LOGIN_DETAILS)
	// 		.end((err, response) => {
	// 			if (err) done(err);
	// 			token = response.body.token;
	// 			userId = response.body.user._id;
	// 			done();
	// 		});
	// 	});

	// 	it('should delete a specified track', () => {
	// 		testUserAgent
	// 		.delete('/tracks/')
	// 	})
	// });
});

