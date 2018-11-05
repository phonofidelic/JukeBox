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
const { mapSeries } = require('p-iteration');

const inspectConfig = {colors: true, depth: null};

const STRINGS = {
	user_registration_success: 'new user registered',
	user_login_success: 'Login successfull',
	user_data_querry_success: 'User info retrieved',
	tracks_post_success: 'Tracks saved'
};

module.exports.handlePostTracks = async (req, res, next) => {
	console.log('*** handlePostTracks ***')
	const userId = req.get('userId');
	const discogsImports = req.body;
	const mmConfig = { 
		duration: true
	};

	console.log('\n*** discogsImports:', discogsImports);
	/***
	 *	Using p-iteration library's mapSeries to execute map callback consecutively
	 * 	for each file in req.files, returning an array of saved Track documents.
	 *	https://github.com/toniov/p-iteration
	 */	
	const savedTracks = await mapSeries(req.files, async (file) => {
		console.log('\nfile:', util.inspect(file, inspectConfig));
		console.log('\ndiscogsImport:', discogsImports[file.originalname]);

		const importDiscogs = discogsImports[file.originalname] === 'true' ? true : false;
		
		let metadata
		try {
			metadata = await mm.parseFile(file.path, mmConfig);
			console.log('\nmetadata:', util.inspect(metadata, inspectConfig));
			if (!metadata) return next(Error('Bajskorv'))
		} catch(e) {
			return next(e);
		}

		

		/***
		 *	Check if track is already in DB by matching original file name
		 */
		const matchParams = {
			userId: userId,
			'file.originalname': file.originalname
		};
		const matchedTrack = await Track.findOne(matchParams);
		if (matchedTrack) {
			console.log(`Match found for "${file.originalname}"`);
			return matchedTrack;
		}

		/***
		 *	Check DB for existing Artist and Album doc
		 */
		const artistData = await utils.checkArtist(metadata, Artist, userId, importDiscogs);
		const albumData = await utils.checkAlbum(metadata, Album, userId, importDiscogs);
		console.log('\n artistData:', util.inspect(artistData, inspectConfig));
		console.log('\n albumData:', util.inspect(albumData, inspectConfig));

		const newTrack = await Track({
			title: metadata.common.title,
			artist: artistData,
			album: albumData,
			image: await utils.getTrackImage(Album, albumData),
			// image: albumData.artwork[0],
			userId: userId,	
			format: metadata.format,
			file: file,
			order: metadata.common.track,
			disk: metadata.common.disk,
			genre: albumData.genre,
			year: albumData.year
		}).save();
		console.log('\nnewTrack:', util.inspect(newTrack));

		/***
		 *	Update Artist and Album docks with new track data
		 */
		await Artist.findOneAndUpdate(artistData._id, {$push: {albums: albumData._id}});
		await Album.findOneAndUpdate(albumData._id, {artist: artistData._id});

		return newTrack;
	});

	// console.log('\nsavedTracks:', savedTracks)
	res.json({message: STRINGS.tracks_post_success, tracks: savedTracks });
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
