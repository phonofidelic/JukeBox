const mm = require('music-metadata');
const isFile = require('is-file');
const path = require('path');
const Track = require('../models').TrackModel;
const fs = require('fs');
const utils = require('./utils');
const storage = require('../../config/storage_config');

// Get all tracks
const getTracks = (req, res, next) => {
	Track.find({'userId': req.get('userId')})
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
	console.log('postTracks')

	let savedTracks = [];

	req.files.forEach(file => {
		// Check that file is not a directiry
		if (!isFile(file.path)) return;
		mm.parseFile(file.path, { native: true })
		.then(metaData => {
			if (metaData.common.picture) {
				utils.parseImageData(metaData.common.picture).then(imageData => {
					console.log('Saving track with image data:', imageData)
					const track = new Track({
						userId: req.get('userId'),
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
						// return savedTrack;
						console.log('Track saved')
						savedTracks.push(savedTrack);
					});
				}).catch(err => console.error('Could not parse image data:', err))
			} else {
				console.log('No image data found for track, saving with default image')
				const track = new Track({
					userId: req.get('userId'),
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
					// return savedTrack;
					console.log('Track saved')
					savedTracks.push(savedTrack);
				});
			}	
		})
		.catch(err => console.error('Could not parse file:', err.message))
	});
	res.json({message: 'Tracks saved', tracks: savedTracks })
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
		console.log('DELETE /tracks/:trackId track path:\n', removedTrack.file.path);
		// Delete audio file in uploads/audio
		fs.unlink(removedTrack.file.path, (err) => {
			if (err) return next(err);
			console.log(`Deleted audio file ${removedTrack.file.path}`);
		});

		// If an imnage file exists,
		// delete it from uploads/images
		if (removedTrack.image.src) {
			fs.unlink(removedTrack.image.src, (err) => {
				if (err) return next(err);
				console.log(`Deleted image file ${removedTrack.image.src}`);
			});
		}

		res.json({ message: 'Track removed', data: removedTrack });
	});
	// TODO: Delete track in file system, otherwise there will be lots of
	// 			 files with no reference in the DB
}

module.exports = {
	getTracks,
	getTrack,
	postTrack,
	postTracks,
	editTrack,
	removeTrack
}