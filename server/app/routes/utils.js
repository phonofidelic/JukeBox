const jwt = require('jsonwebtoken');

// TODO: Create DB or momory store (Redis?)
let refreshTokens = {};

const refreshToken = (req, res, next) => {
	const userId = req.userId;
	const refreshToken = req.cookies.RT;
	
	console.log('\n*** refreshTokens:', refreshTokens)
	console.log('\n*** refreshToken, userId:', userId)
	console.log('*** refreshToken, refreshToken:', refreshToken)

	// Check refresh token store
	if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == userId)) {
		console.log('\n*** VALID REFRESH ***')
		const token = generateToken({_id: userId});

		delete refreshTokens[refreshToken];
		const newRefreshToken = uuidv4();
		refreshTokens[newRefreshToken] = userId;
		console.log('\n refreshTokens after refresh:', refreshTokens);

		res.cookie('JWT', token, { httpOnly: true, secure: process.env.PRODUCTION });
		res.cookie('RT', newRefreshToken, { httpOnly: true, secure: process.env.PRODUCTION });
		return next();
	} else {
		console.log('\n*** NOPE ***')
		// TODO: Redirect to login?
		res.status(401).json({ message: 'Sign-in required' });
	}
}

const handleExpiredToken = (req, res, next) => {
	console.log('*** TOKEN EXPIRED ***');
	const expiredToken = req.expiredToken;
	jwt.verify(expiredToken, process.env.JWT_SECRET, { ignoreExpiration: true }, (err, decodedExpired) => {
		if (err) return next(err);
		req.userId = decodedExpired._id;
		delete req.expiredToken;
		return refreshToken(req, res, next);
	});
};

module.exports.requireAuth = (req, res, next) => {
	const token = req.cookies.JWT;
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err && err.name === 'TokenExpiredError') {
			req.expiredToken = token;
			return err.name === 'TokenExpiredError' ? handleExpiredToken(req, res, next) : next(err);
		}
		console.log('*** decoded:', decoded)
		req.userId = decoded._id;
		return next();
	});
};
