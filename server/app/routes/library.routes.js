const router = require('express').Router();
const passport = require('passport');
const	libraryController = require('../controllers/library.controller');
const upload = require('../../config/storage_config');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, libraryController.loadLibrary);
router.get('/artists/:artistId', requireAuth, libraryController.getArtist);
router.get('/albums/:albumId', requireAuth, libraryController.getAlbum);

module.exports = router;