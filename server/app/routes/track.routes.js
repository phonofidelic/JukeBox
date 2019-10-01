const router = require('express').Router();
const passport = require('passport');
const trackController = require('../controllers/track.controller');
const authController = require('../controllers/auth.controller');
const upload = require('../../config/storage_config');

router.get('/upload', authController.requireAuth, trackController.getSignedUrl);

// TODO: set max count for file uploads:
// upload.array('audioFiles', < max count >)
router.post(
  '/',
  authController.requireAuth,
  upload.array('audioFiles'),
  trackController.handlePostTracks
);

router.put('/:trackId', authController.requireAuth, trackController.editTrack);

router.delete(
  '/:trackId',
  authController.requireAuth,
  trackController.removeTrack
);

module.exports = router;
