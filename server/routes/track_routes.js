const Track = require('../models').TrackModel

// Get all tracks
module.exports = (app, db) => {
	app.get('/tracks', (req, res, next) => {
		// res.send('hellooooo');
		Track.find({})
		.select('name fsName')
		.exec((err, tracks) => {
			if (err) return next(err);
			res.json(tracks);
			next();
		})
	});
}