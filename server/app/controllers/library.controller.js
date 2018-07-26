const Track = require('../models/track.model');
const Artist = require('../models/artist.model');
const Album = require('../models/album.model');
const utils = require('./utils');

module.exports.getTracks = (req, res, next) => {
	Track.find({ 'userId': reg.get('userId') })
	.sort({ title: 1 })
	.exec((err, tracks) => {
		if (err) return next(err);
		res.json({ message: 'Tracks loaded', tracks: tracks });
	});
};

module.exports.loadLibrary = (req, res, next) => {
	const userId = req.get('userId');
	let library = {};
	Promise.all([
		utils.loadTracks(Track, userId),
		utils.loadArtists(Artist, userId),
		utils.loadAlbums(Album, userId)
	])
	.then((library) => {
		// console.log('### loadLibrary, library:', library)
		res.json({ message: 'Library loaded', library: library });
	}).catch(err => {
		next(err);
	});
};

module.exports.getArtists = (req, res, next) => {
	Artist.find({})
	.sort({ name: 1 })
	.exec((err, artists) => {
		if (err) return next(err);
		res.json({ message: 'Artists loaded', artists: artists });
	});
};

module.exports.getArtist = (req, res, next) => {
	const userId = req.get('userId');

	Artist.findById(req.params.artistId)
	.then(artist => {
		console.log('### getArtist, artist:', artist);
		res.json({ message: 'Artist details loaded', artist: artist });
	})
	.catch(err => {
		next(err);
	});
};
