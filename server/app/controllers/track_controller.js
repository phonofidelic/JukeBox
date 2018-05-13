const multer = require('multer'),
		  uuidv4 = require('uuid/v4'),
		  mm = require('music-metadata'),
		  isFile = require('is-file'),
			path = require('path'),
			Track = require('../models').TrackModel,
			config = require('../../config'),
			fs = require('fs'),
			utils = require('./utils');



// Configure strorage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.fileLocation_audio);
	},
	filename: (req, file, cb) => {
		// Set file system name in request object
		newName = `${uuidv4()}${path.extname(file.originalname)}`;
		cb(null, newName);
	}
});
// Ctreate multer instance that will be used to upload/save the file
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' })

// Get all tracks
const getTracks = (req, res, next) => {
	Track.find({})
	// .select('name file')
	.sort({title: 1})
	.exec((err, tracks) => {
		if (err) return next(err);
		// console.log('GET /tracks response:\n', tracks);
		res.json({message: 'Received tracks', tracks: tracks });
	});
}

// Get a specified track
const getTrack = (req, res, next) => {
	const trackId = req.params.trackId;
	Track.findById(trackId)
	// .select('name file')	
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

// Add multiple tracks
const postTracks = (req, res, next) => {
	console.log('postTracks, req.files', req.files)

	req.files.forEach(file => {
		// Check that file is not a directiry
		if (!isFile(file.path)) return;
		mm.parseFile(file.path, { native: true })
		.then(metaData => {
			if (metaData.common.picture) {
				utils.parseImageData(metaData.common.picture).then(imageData => {
					console.log('Saving track with image data:', imageData)
					const track = new Track({
						title: metaData.common.title,
						artist: metaData.common.artist,
						album: metaData.common.album,
						genre: metaData.common.genre,
						image: imageData,
						order: metaData.common.track,
						format: metaData.format,
						file: {
							originalname: file.originalname,
							path: file.path,
							size: file.size,
							mimetype: file.mimetype
						}
					});
					track.save((err, savedTrack) => {
						if (err) {
							console.error('postTrack error:', err);
							return next(err);
						};
					});
				}).catch(err => console.error('Could not parse image data:', err))
			} else {
				console.log('No image data found for track, saving with default image')
				const track = new Track({
					title: metaData.common.title,
					artist: metaData.common.artist,
					album: metaData.common.album,
					genre: metaData.common.genre,
					image: {format: 'png', src: 'defaultImage'},
					order: metaData.common.track,
					format: metaData.format,
					file: {
						originalname: file.originalname,
						path: file.path,
						size: file.size,
						mimetype: file.mimetype
					}
				});
				track.save((err, savedTrack) => {
					if (err) {
						console.error('postTrack error:', err);
						return next(err);
					};
				});
			}	
		})
		.catch(err => console.error('Could not parse file:', err.message))
	});

// console.log('POST /tracks response:\n', tracksToSave);
// res.json({message: 'Track saved', data: tracksToSave });


	
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
// DELETE /tracks/:trackId
const removeTrack = (req, res, next) => {
	const trackId = req.params.trackId;
	Track.findByIdAndRemove(trackId, (err, removedTrack) => {
		if (err) return next(err);
		// console.log('DELETE /tracks/:trackId response:\n', removedTrack);
		res.json({ message: 'Track removed', data: removedTrack });
	});
	// TODO: Delete track in file system, otherwise there will be lots of
	// 			 files with no reference in the DB
}

module.exports = {
	upload,
	getTracks,
	getTrack,
	postTrack,
	postTracks,
	editTrack,
	removeTrack
}