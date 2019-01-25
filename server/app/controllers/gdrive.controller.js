const fs = require('fs');
const util = require('util');
const User = require('../models/user.model');
const {google} = require('googleapis');
const inspectConfig = {colors: true, depth: null};
const Datauri = require('datauri');
const datauri = new Datauri();

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
	});
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

	// Create 'Jukebox library' folder in users Drive account
	const gdFolder = await createLibFolder(oauth2Client, next);
	console.log('createLibFolder, gdFolder:', util.inspect(gdFolder, inspectConfig))

	// Save tokens to User doc in DB
	await User.findByIdAndUpdate(userId, {
		gDrive: { 
			gdTokenData: tokens,
			gdFolder: gdFolder
		} 
	}, { new: true }, (err, updatedUserData) => {
		// TODO: if err, respond with error page
		if (err) return next(err);
		console.log('Successfully updated users Google Drive token data:', updatedUserData);
	});

	res.status(200).render('gdAuthConfirmation', 
		{
			title: STRINGS.gdAuthConfirmationTitle, 
			message: STRINGS.gdAuthConfirmationMessage 
		}
	);
};

module.exports.getStream = async (req, res, next) => {
	// res.set('content-type', 'audio/mp3');
 //  res.set('accept-ranges', 'bytes');
	// console.log('@getStream, req.params', req.params)
	const { gdId } = req.params;
	const userId = req.get('userId')
	const mimetype = req.get('mimetype')
	const ext = req.get('ext')

	// TODO: Abstract to storage service
	const gdUser = await User.findById(userId, 'gDrive');
	oauth2Client = new google.auth.OAuth2(
		process.env.G_CLIENT_ID,
		process.env.G_CLIENT_SECRET,
	);
	oauth2Client.setCredentials(gdUser.gDrive.gdTokenData);
	const drive = await google.drive({
		version: 'v3',
		auth: oauth2Client
	});

	console.log(`*** gdId: ${gdId}, mimetype: ${mimetype}, ext: ${ext}`);

	// Check if file is already in tmp
	fs.readdir(process.env.TMP, async (err, files) => {
		if (err) throw err;
		const isCashed = files.indexOf(`${gdId}.${ext}`) >= 0 ? true : false;
		if (isCashed) {
			console.log('\n*** stream from cache')
			res.status(200).json({ message: 'Stream created', src: `${process.env.TMP}/${gdId}.${ext}` });
		} else {
			console.log('\n*** download to cache and stream')
			const dest = fs.createWriteStream(`${process.env.TMP}/${gdId}.${ext}`);
			// TODO: Abstract to storage service that can handle multiple sources and rename gdRes -> streamRes?
			const gdRes = await drive.files.get({
			  fileId: gdId,
			  mimeType: mimetype,
			  parents: [gdUser.gDrive.gdFolder.id],
			  alt: 'media',
			}, {responseType: 'stream'});

			// res.writeHead(200, {'Content-Type': 'audio/mpeg'});
		  gdRes.data
		  .on('data', (chunk) => {
		  	// console.log(chunk)
		  	// res.write(chunk)
		  })
		  .on('end', () => {
		  	console.log('*** done');
		  	// res.end()
		  	res.status(200).json({ message: 'Stream created', src: dest.path });
		  	// datauri.encode(dest.path);
		  })
		  .on('error', (err) => next(err))
		  .pipe(dest);
		}
	});
}

