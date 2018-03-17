const Track = require('../models').TrackModel,
			config = require('../config');

const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');

// Configure strorage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.fileLocation);
	},
	filename: (req, file, cb) => {
		// Set file system name in request object
		newName = `${uuidv4()}${path.extname(file.originalname)}`;
		cb(null, newName);
	}
});
// Ctreate multer instance that will be used to upload/save the file
const upload = multer({ storage });

module.exports = (app, db) => {
	// Get all tracks
	app.get('/tracks', (req, res, next) => {
		// res.send('hellooooo');
		Track.find({})
		// .select('name fsName')
		.exec((err, tracks) => {
			if (err) return next(err);
			res.json(tracks);
			next();
		})
	});

	// Get a specified track
	app.get('/tracks/:trackId', (req, res, next) => {
		const trackId = req.params.trackId;
		Track.findById(trackId)
		.select('name file')
		.exec((err, track) => {
			if (err) return next(err);
			res.json(track);
		})
	});

	// Add a track
	app.post('/tracks', upload.single('selectedFile'), (req, res) => {
		console.log('post /tracks, req.file:', req.file)
		// TODO: validate data before creating new track
		const track = new Track({
			name: req.body.trackName,
			file: {
				originalname: req.file.originalname,
				path: req.file.path,
				size: req.file.size,
				mimetype: req.file.mimetype
			}
		});
		db.collection('tracks').insertOne(track)
		.then(result => {
			console.log('track inserted')
			res.json({ 'message': '1 track added' });
		})
		.catch(err => {
			console.error('could not insert track:', err);
			res.json({ 'error': `Could not add track: ${err}` });
		});
	});

	// Edit a track
	app.put('/tracks/:trackId', (req, res, next) => {
		const trackId = req.params.trackId;
		// TODO: check and only change updated feilds
		// Make sure req.body matches Track model
		const freshData = req.body;
		Track.findByIdAndUpdate(trackId, freshData, (err, result) => {
			if (err) return next(err);
			console.log('update result:', result);
			res.json({ 'message': 'Track updated', result })
		});
	});

	// Delete a track
	app.delete('/tracks/:trackId', (req, res, next) => {
		const trackId = req.params.trackId;
		Track.findByIdAndRemove(trackId, (err, result) => {
			if (err) return next(err);
			console.log('Track removed:', result);
			res.json({'message': 'Track removed', 'body': result})
		});
	});
}

