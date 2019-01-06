const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/gdrive/authURL', userController.getGDriveAuthURL);
router.get('/gdrive/authcode', userController.gdOauthcallback);
router.get('/gdrive/test', userController.test_gdAuthConfirmationPage)

module.exports = router;