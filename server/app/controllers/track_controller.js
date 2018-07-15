const mm = require('music-metadata');
const isFile = require('is-file');
const path = require('path');
// const Track = require('../models').TrackModel;
const Track = require('../models/track.model');
const Artist = require('../models/artist.model');
const Album = require('../models/album.model');
const fs = require('fs');
const utils = require('./utils');
const storage = require('../../config/storage_config');

// Get all tracks
const getTracks = (req, res, next) => {
	Track.find({'userId': req.get('userId')})
	// .select('name file')
	.sort({ artist: 1, album: 1, 'order.no': 1})
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
	console.log('postTracks, req.files:', req.files)

	const userId = req.get('userId');
	let savedTracks = [];

	req.files.forEach(file => {
		// Check that file is not a directiry
		if (!isFile(file.path)) return;
		mm.parseFile(file.path, { native: true })
		.then(metaData => {
			console.log('### Handleing parsed meta-data...');
			// console.log('### metaData:', metaData);

			// Check if track already exists in library
			Track.findOne({ title: metaData.common.title })
			.exec((err, track) => {
				if (err) return next(err);

				if (!track) {
					console.log('\n### No track found in DB, creating new track...')
					// Check for existing Artist and Album info
					// Check for embeded image
					return Promise.all([
						utils.saveImage(metaData.common.picture),
						utils.checkArtist(metaData, Artist, userId), 
						utils.checkAlbum(metaData, Album, userId)
					])
					.then(values => {
						console.log('### values:', values);
						// Save track with parsed meta-data and 
						// values passed from utility methods
						const newTrack = new Track({
							userId: userId,
							title: metaData.common.title,
							image: values[0],
							artist: values[1],
							album: values[2],
							genre: metaData.common.genre,
							order: metaData.common.track,
							format: metaData.format,
							file: {
								originalname: file.originalname,
								path: file.path,
								size: file.size,
								mimetype: file.mimetype
							}
						});
						newTrack.save((err, newTrack) => {
							// Update Artist and Album docs with new track info
							Artist.findById(newTrack.artist._id, (err, artist) => {
								if (err) return next(err);
								if (!artist) return console.log('\n### No artist found, ');
								console.log('\n### Updating album data on artist')
								artist.albums.push(newTrack.album);
								artist.save();
							});

							Album.findById(newTrack.album._id, (err, album) => {
								if (err) return next(err);
								if (!album) return console.log('\n### No album found');
								console.log('\n### Updating artist data on album')
								album.artist = newTrack.artist;
								album.save();
							});
							savedTracks.push(newTrack);
						});
					})
					.catch(err => {
						console.error(err);
						return next(err);
					});
				}

				// TODO: If a match is found, ask the user if they want to:
				// 			 1) overwrite the existing track,
				// 			 2) discard the current track being added,
				// 			 3) save a new version of this track.
				//
				//			 For now, delete the saved audio file of the current file object
				fs.unlink(file.path, (err) => {
					if (err) return next(err);
					console.log('### Deleted '+ file.path);
				});

				return console.log('### Track already saved');
			});
		})
		.catch(err => {
			console.error('Could not parse file:', err.message);
			return next(err);
		})
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
