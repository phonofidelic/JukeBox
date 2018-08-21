const request = require('supertest');
const app = require('./index');
const jwt = require('jsonwebtoken');

const generateToken = user => {
	return jwt.sign(user, process.env.JWT_SECRET, {
		expiresIn: '5h'	// TODO: Set expiration time in env variable
	});
};

const setUserInfo = user => {
	return {
		_id: user._id,
		email: user.email
	};
};

const loginDetails = {
	email: 'test@test.test',
	password: 'test1234'
};

const createAuthenticatedRequest = (loginDetails, done) => {
	var authenticatedRequest = request.agent();
  authenticatedRequest
  .post('http://localhost:3000/login')
  .send(loginDetails)
  .end(function(error, response) {
    if (error) {
    	throw error;
    } 
    done(authenticatedRequest);
  });
}

const token = generateToken(loginDetails);

describe('library routes', () => {
	describe('GET library/', () => {
		// beforeAll(function() {
		// 	// Login test user
		// })
		it('loads the users library', (done) => {
			request(app)
			.get('/library')
			.set({'JWT': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'})
			.then(res => {
				console.log('### res:', res)
				done()
			})
			.catch(err => {
				console.error('### err:', err)
				done(err)
			})
		})
	})
})