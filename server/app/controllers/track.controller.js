const fs = require('fs');
const mm = require('music-metadata');
const isFile = require('is-file');
const path = require('path');
const util = require('util');
// const Track = require('../models').TrackModel;
const Track = require('../models/track.model');
const Artist = require('../models/artist.model');
const Album = require('../models/album.model');
const utils = require('./utils');
const storage = require('../../config/storage_config');
const inspectConfig = {colors: true, depth: null};

const STRINGS = {
	user_registration_success: 'new user registered',
	user_login_success: 'Login successfull',
	user_data_querry_success: 'User info retrieved',
	tracks_post_success: 'Tracks saved'
};

// module.exports.checkDiscogsData = (req, res, next) => {
// 	console.log('### checkDiscogsData, req.body:', req.body)
// 	next();
// }

// Add multiple tracks
module.exports.postTracks = (req, res, next) => {
	// console.log('postTracks, req.body:', req.body)
	// console.log('postTracks, req.files:', req.files)

	const userId = req.get('userId');
	// let savedTracks = [];

	// req.files.forEach(file => {
	// 	// Check that file is not a directiry
	// 	if (!isFile(file.path)) return next(new Error(`### ${file} is not a file`));

	// 	mm.parseFile(file.path, { native: true })
	// 	.then(metaData => {
	// 		console.log('### Handleing parsed meta-data...');
	// 		// console.log('### metaData:', metaData);

	// 		// TODO: If file.importDiscogsData, get metadata from Discogs instead of mm.parseFile?
	// 		// 			 Needs to run in mm.parseFile then() to have access to metadata which will be used in Discogs search
	// 		/***
	// 		 *	If request object contains a key of the current file's originalname with value set to true,
	// 		 *	then search Discogs for meta-data.
	// 		 */
	// 		if(req.body[file.originalname]) {
	// 			console.log('### importDiscogsData, file:', file)
	// 			// TODO: initiate Discogs search
	// 			console.log('### importDiscogsData, metaData.common.title:', metaData.common.title)
	// 			const token = process.env.DISCOGS_TOKEN;
				
	// 			utils.searchDiscogs_album(metaData.common.album, token)
	// 			.then(response => {
	// 				console.log('### searchDiscogs, response:', response.data.results[0]);
	// 			})
	// 			.catch(err => console.error('### searchDiscogs error:', err));
	// 		}

	// 		// Check if track already exists in library
	// 		Track.findOne({ title: metaData.common.title })
	// 		.exec((err, track) => {
	// 			if (err) return next(err);

	// 			if (!track) {
	// 				console.log('\n### No track found in DB, creating new track...')

	// 				// Check for existing Artist and Album info
	// 				return Promise.all([
	// 					utils.checkArtist(metaData, Artist, userId), 
	// 					utils.checkAlbum(metaData, Album, userId)
	// 				])
	// 				.then(values => {
	// 					console.log('\n### values:', values);
	// 					// Save track with parsed meta-data and 
	// 					// values passed from utility methods
	// 					const newTrack = new Track({
	// 						userId: userId,
	// 						title: metaData.common.title,
	// 						artist: values[0],
	// 						album: values[1],
	// 						image: values[1].artwork[0],
	// 						genre: metaData.common.genre,
	// 						order: metaData.common.track,
	// 						format: metaData.format,
	// 						file: {
	// 							originalname: file.originalname,
	// 							path: file.path,
	// 							size: file.size,
	// 							mimetype: file.mimetype
	// 						}
	// 					});
	// 					newTrack.save((err, savedTrack) => {
	// 						if (err) return next(err);
	// 						console.log('\n### Saving new Track document, savedTrack:', savedTrack);

	// 						// Update Artist and Album docs with new track info

	// 						// Check if uploading track's album exists in Artist doc
	// 						Artist.findOneWithAlbumId(savedTrack.album._id)
	// 						.then(artist => {
	// 							if (artist) return console.log('\n### Uploading track\'s Album data already in Artist doc');
	// 							Artist.findById(savedTrack.artist)
	// 							.then(artist => {
	// 								artist.updateWithNewAlbumData(savedTrack.album._id);
	// 							})
	// 							.catch(err => next(err));
	// 						})
	// 						.catch(err => next(err));

	// 						// Check if uploading track's artist exists in Album doc
	// 						Album.findOne({ _id: savedTrack.album, artist: savedTrack.artist }, (err, album) => {
	// 							if (err) return next(err);
	// 							console.log('\n### Checking for new Album data...');
	// 							if (album) {
	// 								return console.log('\n### Uploading track\'s Artist data already in Album doc');
	// 							} else {
	// 								console.log('\n### Uploading track\'s Artist data not found in Album doc');
	// 								Album.findById(savedTrack.album._id, (err, album) => {
	// 									if (err) return next(err);
	// 									console.log('\n### Updating Album doc with new Artist data...');
	// 									album.artist = savedTrack.artist;
	// 									album.save();
	// 								});
	// 							}
	// 						});

	// 						savedTracks.push(savedTrack);
	// 					});
	// 				})
	// 				.catch(err => {
	// 					console.error(err);
	// 					return next(err);
	// 				});
	// 			}

	// 			// TODO: If a match is found, ask the user if they want to:
	// 			// 			 1) overwrite the existing track,
	// 			// 			 2) discard the current track being added,
	// 			// 			 3) save a new version of this track.
	// 			//
	// 			//			 For now, delete the saved audio file of the current file object
	// 			fs.unlink(file.path, (err) => {
	// 				if (err) return next(err);
	// 				console.log('### Deleted '+ file.path);
	// 			});
	// 			// TODO: add message object to saved tracks
	// 			return console.log('### Track already saved');
	// 		});
	// 	})
	// 	.catch(err => {
	// 		console.error('Could not parse file:', err.message);
	// 		return next(err);
	// 	})
	// });
	
	console.log('req.body:', req.body)
	const savedTracks = utils.handlePostTracks(req.files, req.body, userId);
	res.json({message: STRINGS.tracks_post_success, tracks: savedTracks });
};

module.exports.handlePostTracks = async function(req, res, next) {
	console.log('*** handlePostTracks ***')
	const userId = req.get('userId');
	const discogsImports = req.body;
	const mmConfig = { 
		duration: true
	};

	// Map files returning an array of saved Track documents
	const savedTracks = req.files.map((file) => {
		console.log('\nfile:', util.inspect(file, inspectConfig));
		console.log('\ndiscogsImport:', discogsImports[file.originalname]);

		// Get metadata for the current file
		mm.parseFile(file.path, mmConfig)
		.then(metadata => {
			console.log('\nmetadata:', util.inspect(metadata, inspectConfig));
			let trackData = {};

			// Check if track is already in DB
			const matchParams = {
				userId: userId,
				'file.originalname': file.originalname
			};
			Track.findOne(matchParams, (err, matchedTrack) => {
				if (err) return next(err);
				console.log('\nmatched track:', matchedTrack);
				if (matchedTrack) {
					console.log(`Match found for "${file.originalname}`)
					// If a match is found, continue with next map iteration
				} else {
					if (discogsImports[file.originalname]) {
						// Import data from Discogs
						utils.searchDiscogs_album(metadata.common.album, process.env.DISCOGS_TOKEN)
						.then(response => {
							console.log('\ndiscogs response.data:', util.inspect(response.data.results[0], inspectConfig))
						})
						.catch(err => console.log(err));
						// trackData = {
						// 	...track,
						// 	discogs: 
						// }
					}
				}
			});

			

			return metadata
		})
		.catch(err => console.error(err));

		// let metadata = Promise.resolve(parseMetadata(file.path))

		// console.log('\nmetadata:', util.inspect(metadata, {colors: true, depth: null}));

		return file; // return saved Track document
	});

	res.json({message: STRINGS.tracks_post_success, tracks: savedTracks });
}

// Edit a track
module.exports.editTrack = (req, res, next) => {
	const trackId = req.params.trackId;
	// TODO: check and only change updated feilds
	// Make sure req.body matches Track model
	freshData = req.body;
	Track.findByIdAndUpdate(trackId, freshData, {new: true}, (err, updatedTrack) => {
		if (err) return next(err);
		console.log('PUT /tracks/:trackId response:\n', updatedTrack);
		// TODO: change to: res.json({ message: 'Track removed', updatedTrack: updatedTrack });
		res.json({ message: 'Track updated', data: updatedTrack });
	});
};

// Delete a track
// DELETE /tracks/:trackId
module.exports.removeTrack = (req, res, next) => {
	const trackId = req.params.trackId;
	Track.findByIdAndRemove(trackId, (err, removedTrack) => {
		if (err) return next(err);
		// Delete audio file in uploads/audio
		fs.unlink(removedTrack.file.path, (err) => {
			if (err) return next(err);
			console.log(`\n### Deleted audio file ${removedTrack.file.path}`);
		});

		// If an image file exists, delete it from uploads/images
		if (removedTrack.image.src && removedTrack.image.src !== 'defaultImage') {
			fs.unlink(removedTrack.image.src, (err) => {
				if (err) return next(err);
				console.log(`\n### Deleted image file ${removedTrack.image.src}`);
			});
		}

		// TODO: change to: res.json({ message: 'Track removed', removedTrack: removedTrack });
		res.json({ message: 'Track removed', data: removedTrack });
	});
	// TODO: Delete track in file system, otherwise there will be lots of
	// 			 files with no reference in the DB
};
