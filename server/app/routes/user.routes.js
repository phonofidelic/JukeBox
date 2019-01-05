const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/gdrive/authURL', userController.getGDriveAuthURL);
// router.post('/gdrive/seccode', userController.postGDSecCode);
router.get('/gdrive/authcode', userController.gdOauthcallback);

module.exports = router;