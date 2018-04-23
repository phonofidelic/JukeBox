const Track = require('../models').TrackModel,
			config = require('../../config'),
			trackController = require('../controllers').track;

module.exports = (app, db) => {
	app.get('/tracks', trackController.getTracks);
	app.get('/tracks/:trackId', trackController.getTrack);
	// app.post('/tracks', trackController.upload.single('selectedFile'), trackController.postTrack);
	app.post('/tracks', trackController.upload.array('audioFiles'), trackController.postTrack);
	app.put('/tracks/:trackId', trackController.editTrack);
	app.delete('/tracks/:trackId', trackController.removeTrack);
}

