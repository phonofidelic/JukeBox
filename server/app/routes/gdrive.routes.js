const router = require('express').Router();
const gdriveController = require('../controllers/gdrive.controller');

router.get('/authURL', gdriveController.getGDriveAuthURL);
router.get('/authcode', gdriveController.gdOauthcallback);
// router.get('/gdrive/test', userController.test_gdAuthConfirmationPage)

module.exports = router;