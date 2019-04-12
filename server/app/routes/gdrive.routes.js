const router = require('express').Router();
const gdriveController = require('../controllers/gdrive.controller');
const authController = require('../controllers/auth.controller');

router.get('/authURL', gdriveController.getGDriveAuthURL);
router.get('/authcode', authController.requireAuth, gdriveController.gdOauthcallback);

module.exports = router;