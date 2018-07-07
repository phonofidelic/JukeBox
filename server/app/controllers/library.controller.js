const Track = require('../models/track.model');
const Artist = require('../models/artist.model');
const Album = require('../models/album.model');

module.exports.getTracks = (req, res, next) => {
	Track.find({ 'userId': reg.get('userId') })
	.sort({ title: 1 })
	.exec((err, tracks) => {
		if (err) return next(err);
		res.json({ message: 'Tracks loaded', tracks: tracks });
	});
};

module.exports.loadLibrary = (req, res, next) => {
	let library = {};
	Promise.all([
		new Promise((resolve, reject) => {
			Track.find({ 'userId': req.get('userId') })
			.sort({ title: 1 })
			.exec((err, tracks) => {
				if (err) return next(err);
				resolve(tracks)
			})
		}),
		Artist.find({ 'userId': req.get('userId') })
		.sort({ name: 1 })
		.exec((err, artists) => {
			if (err) return next(err);
			return artists;
		}),
		Album.find({ 'userId': req.get('userId') })
		.sort({ title: 1 })
		.exec((err, tracks) => {
			if (err) return next(err);
			return tracks;
		})
	]).then((library) => {
		res.json({ message: 'Library loaded', library: library });
	}).catch(err => {
		next(err);
	});
};
