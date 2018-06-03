const router = require('express').Router();
const Track = require('../models').TrackModel;
const passport = require('passport');
const	trackController = require('../controllers').track;
const upload = require('../../config/storage_config');

const requireAuth = passport.authenticate('jwt', { session: false });

// TODO: add middleware to protect routs by checking JWT token
router.get('/', requireAuth, trackController.getTracks);
router.get('/:trackId', requireAuth, trackController.getTrack);
// router.post('/', requireAuth, trackController.upload.single('selectedFile'), trackController.postTrack);
router.post('/', requireAuth, upload.array('audioFiles'), trackController.postTracks);
router.put('/:trackId', requireAuth, trackController.editTrack);
router.delete('/:trackId', requireAuth, trackController.removeTrack);

module.exports = router;