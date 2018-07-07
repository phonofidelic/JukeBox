const router = require('express').Router();
const passport = require('passport');
const	libraryController = require('../controllers/library.controller');
const upload = require('../../config/storage_config');

const requireAuth = passport.authenticate('jwt', { session: false });

// TODO: add middleware to protect routs by checking JWT token
// router.get('/tracks', requireAuth, trackController.getTracks);
// router.get('/tracks/:trackId', requireAuth, trackController.getTrack);
// router.post('/tracks', requireAuth, upload.array('audioFiles'), trackController.postTracks);
// router.put('/tracks/:trackId', requireAuth, trackController.editTrack);
// router.delete('/tracks/:trackId', requireAuth, trackController.removeTrack);

router.get('/', libraryController.loadLibrary)

module.exports = router;