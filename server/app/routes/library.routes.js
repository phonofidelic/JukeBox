const router = require('express').Router();
const passport = require('passport');
const	libraryController = require('../controllers/library.controller');
const authController = require('../controllers/auth.controller');
const upload = require('../../config/storage_config');

router.get('/', 
	// authController.requireAuth, 
	libraryController.loadLibrary
);

router.get('/artists/:artistId', 
	authController.requireAuth, 
	libraryController.getArtist
);

router.get('/albums/:albumId', 
	authController.requireAuth, 
	libraryController.getAlbum
);

module.exports = router;