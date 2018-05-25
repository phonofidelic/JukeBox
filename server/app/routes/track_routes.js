const router = require('express').Router();
const Track = require('../models').TrackModel;
const	config = require('../../config');
const	trackController = require('../controllers').track;

// module.exports = (app, db) => {
// 	app.get('/tracks', trackController.getTracks);
// 	app.get('/tracks/:trackId', trackController.getTrack);
// 	// app.post('/tracks', trackController.upload.single('selectedFile'), trackController.postTrack);
// 	app.post('/tracks', trackController.upload.array('audioFiles'), trackController.postTracks);
// 	app.put('/tracks/:trackId', trackController.editTrack);
// 	app.delete('/tracks/:trackId', trackController.removeTrack);
// }

	router.get('/', trackController.getTracks);
	router.get('/:trackId', trackController.getTrack);
	// router.post('/', trackController.upload.single('selectedFile'), trackController.postTrack);
	router.post('/', trackController.upload.array('audioFiles'), trackController.postTracks);
	router.put('/:trackId', trackController.editTrack);
	router.delete('/:trackId', trackController.removeTrack);

	module.exports = router;