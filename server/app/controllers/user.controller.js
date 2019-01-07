const util = require('util');
const User = require('../models/user.model');
const {google} = require('googleapis');
const inspectConfig = {colors: true, depth: null};

const STRINGS = {
	gdAuthConfirmationTitle: 'Google Drive authorization confirmation',
	gdAuthConfirmationMessage: 'Jukebox has been authorized to store audio files on your Google Drive account.'
};

const GD_LIB_FOLDER = '_Jukebox_library';

let oauth2Client;

const createLibFolder = async (oauth2Client, next) => {
	/***
	 *	returns:
	 *	{ 
	 *		kind: String,
	 *		id: String,
	 *		name: String,
	 *		mimeType: String
	 *	}
	 */
	const drive = google.drive({
		version: 'v3',
		auth: oauth2Client
	});
	const checkFolderRes = await drive.files.list({
		q: `name="${GD_LIB_FOLDER}"`
	});
	
	// Check if audio library folder already exists
	if (checkFolderRes.data.files.length > 0) return checkFolderRes.data.files[0];
	
	console.log('*** CREATING NEW FOLDER ***')
	const res = await drive.files.create({
	  requestBody: {
	    name: GD_LIB_FOLDER,
	    mimeType: 'application/vnd.google-apps.folder'
	  },
	  media: {
	    mimeType: 'application/vnd.google-apps.folder'
	  }
	});
	return res;
};

// GET /gdrive/authURL
module.exports.getGDriveAuthURL = (req, res, next) => {
	const userId = req.get('userId');
	console.log('getGDriveAuthURL, userId:', userId);

	oauth2Client = new google.auth.OAuth2(
		process.env.G_CLIENT_ID,
		process.env.G_CLIENT_SECRET,
		process.env.G_REDIRECT_URI+`?userId=${userId}`
	);

	const authURL = oauth2Client.generateAuthUrl({
		scope: 'https://www.googleapis.com/auth/drive.file'
	})
	res.status(200).json({
		message: 'Successfully grnerated authURL', authURL: authURL
	});
};

// GET /gdrive/authcode
module.exports.gdOauthcallback = async (req, res, next) => {	
	const { code, userId } = req.query;
	const { tokens } = await oauth2Client.getToken(code);
	oauth2Client.setCredentials(tokens);

	console.log('gdAuth token:', util.inspect(tokens, inspectConfig));
	// Save tokens to User doc in DB
	await User.findByIdAndUpdate(userId, { gdTokenData: tokens }, { new: true }, (err, updatedUserData) => {
		// TODO: if err, respond with error page
		if (err) return next(err);
		console.log('Successfully updated users Google Drive token data:', updatedUserData);
	});

	// Create 'Jukebox library' folder in users Drive account
	const gdFolder = await createLibFolder(oauth2Client, next);
	console.log('createLibFolder, gdFolder:', util.inspect(gdFolder, inspectConfig))

	res.status(200).render('gdAuthConfirmation', 
		{
			title: STRINGS.gdAuthConfirmationTitle, 
			message: STRINGS.gdAuthConfirmationMessage 
		}
	);
};

module.exports.test_gdAuthConfirmationPage = (req, res, next) => {
	res.status(200).render('gdAuthConfirmation', 
		{
			title: STRINGS.gdAuthConfirmationTitle, 
			message: STRINGS.gdAuthConfirmationMessage 
		}
	);
};
