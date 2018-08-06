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

// Add multiple tracks
module.exports.postTracks = (req, res, next) => {
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
						console.log('\n### values:', values);
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
							console.log('\n### Saving new Track document, newTrack:', newTrack);

							// Update Artist and Album docs with new track info

							// Check if uploading track's album exists in Artist doc
							Artist.findOne({ name: newTrack.artist.name, albums: { $elemMatch: { title: newTrack.album.title } } }, (err, artist) => {
								if (err) return next(err);
								console.log('\n### Checking for new Artist data...');
								if (artist) {
									return console.log('\n### Uploading track\'s Album data already in Artist doc');
								} else {
									console.log('\n### Uploading track\'s Album data not found in Artist doc');
									Artist.findById(newTrack.artist._id, (err, artist) => {
										if (err) return next(err);
										console.log('\n### Updating Artist doc with new Album data...');
										artist.albums.push(newTrack.album);
										artist.save();
									});
								}
							});

							// Check if uploading track's artist exists in Album doc
							Album.findOne({ title: newTrack.album.title, 'artist.name': newTrack.artist.name }, (err, album) => {
								if (err) return next(err);
								console.log('\n### Checking for new Album data...');
								if (album) {
									return console.log('\n### Uploading track\'s Artist data already in Album doc');
								} else {
									console.log('\n### Uploading track\'s Artist data not found in Album doc');
									Album.findById(newTrack.album._id, (err, album) => {
										if (err) return next(err);
										console.log('\n### Updating Album doc with new Artist data...');
										album.artist = newTrack.artist;
										album.save();
									});
								}
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
};

// Edit a track
module.exports.editTrack = (req, res, next) => {
	const trackId = req.params.trackId;
	// TODO: check and only change updated feilds
	// Make sure req.body matches Track model
	freshData = req.body;
	Track.findByIdAndUpdate(trackId, freshData, {new: true}, (err, updatedTrack) => {
		if (err) return next(err);
		console.log('PUT /tracks/:trackId response:\n', updatedTrack);
		res.json({ message: 'Track updated', data: updatedTrack });
	});
};

// Delete a track
// DELETE /tracks/:trackId
module.exports.removeTrack = (req, res, next) => {
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
};
