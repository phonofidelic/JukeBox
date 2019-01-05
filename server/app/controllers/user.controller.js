const util = require('util');
const User = require('../models/user.model');
const {google} = require('googleapis');
const inspectConfig = {colors: true, depth: null};

let oauth2Client;

// POST /gdrive/authURL
module.exports.getGDriveAuthURL = (req, res, next) => {
	// const userId = req.get('userId');
	console.log('getGDriveAuthURL, userId:', req.body.userId);

	oauth2Client = new google.auth.OAuth2(
		process.env.G_CLIENT_ID,
		process.env.G_CLIENT_SECRET,
		process.env.G_REDIRECT_URI+`?userId=${req.body.userId}`
	);

	const authURL = oauth2Client.generateAuthUrl({
		scope: 'https://www.googleapis.com/auth/drive.file'
	})
	res.status(200).json({message: 'Successfully grnerated authURL', authURL: authURL});
};

// // POST /gdrive/seccode
// module.exports.postGDSecCode = (req, res, next) => {
// 	const { GDSecCode } = req.body;
// 	console.log('postGDAuthCode, GDSecCode:', GDSecCode);
// 	res.status(200).json({message: `Server response, GDSecCode: ${GDSecCode}`});
// };

// GET /gdrive/authcode
module.exports.gdOauthcallback = async (req, res, next) => {
	console.log('gdOauthcallback:', req.query);
	
	const { code, userId } = req.query;

	const { tokens } = await oauth2Client.getToken(code);
	oauth2Client.setCredentials(tokens);

	console.log('gdAuth token:', util.inspect(tokens, inspectConfig));
	// TODO: save tokens to User doc in DB

	// TODO: respond with success/failure message
	// res.status(200).render('gdConfirmation', {message: 'Server response: gdOauthcallback'})
	res.status(200).json({message: 'auth code recieved', ...req.query})
};
