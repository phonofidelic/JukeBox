const router = require('express').Router();
const passport = require('passport');
const	trackController = require('../controllers/track.controller');
const upload = require('../../config/storage_config');

const requireAuth = passport.authenticate('jwt', { session: false });
// TODO: set max count for file uploads:
// upload.array('audioFiles', < max count >)
router.post('/', 
	requireAuth, 
	upload.array('audioFiles'), 
	trackController.handlePostTracks
);

router.put('/:trackId', 
	requireAuth, 
	trackController.editTrack
);

router.delete('/:trackId', 
	requireAuth, 
	trackController.removeTrack
);

module.exports = router;