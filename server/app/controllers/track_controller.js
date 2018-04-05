const multer = require('multer'),
		  uuidv4 = require('uuid/v4'),
			path = require('path'),
			Track = require('../models').TrackModel,
			config = require('../../config');

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

// Get all tracks
const getTracks = (req, res, next) => {
	Track.find({})
	// .select('name file')
	.exec((err, tracks) => {
		if (err) return next(err);
		// console.log('GET /tracks response:\n', tracks);
		res.json({message: 'Received tracks', data: tracks });
	});
}

// Get a specified track
const getTrack = (req, res, next) => {
	const trackId = req.params.trackId;
	Track.findById(trackId)
	.select('name file')	
	.exec((err, track) => {
		if (err) return next(err);
		console.log('GET /track/:trackId response:\n', track);
		res.json({ mesasge: 'Received track', data: track });
	});
}

// Add a track
const postTrack = (req, res, next) => {
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
	track.save((err, savedTrack) => {
		if (err) {
			console.error('postTrack error:', err);
			return next(err);
		};
		console.log('POST /tracks response:\n', savedTrack);
		res.json({message: 'Track saved', data: savedTrack });
	});
}

// Edit a track
const editTrack = (req, res, next) => {
	const trackId = req.params.trackId;
	// TODO: check and only change updated feilds
	// Make sure req.body matches Track model
	freshData = req.body;
	Track.findByIdAndUpdate(trackId, freshData, {new: true}, (err, updatedTrack) => {
		if (err) return next(err);
		console.log('PUT /tracks/:trackId response:\n', updatedTrack);
		res.json({ message: 'Track updated', data: updatedTrack });
	});
}

// Delete a track
const removeTrack = (req, res, next) => {
	const trackId = req.params.trackId;
	Track.findByIdAndRemove(trackId, (err, removedTrack) => {
		if (err) return next(err);
		console.log('DELETE /tracks/:trackId response:\n', removedTrack);
		res.json({ message: 'Track removed', data: removedTrack });
	});
}

module.exports = {
	upload,
	getTracks,
	getTrack,
	postTrack,
	editTrack,
	removeTrack
}