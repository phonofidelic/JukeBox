const router = require('express').Router();
const gdriveController = require('../controllers/gdrive.controller');
const authController = require('../controllers/auth.controller');

router.get(
  '/authURL',
  authController.requireAuth,
  gdriveController.getGDriveAuthURL
);
router.get(
  '/authcode/:userId',
  // authController.requireAuth,
  gdriveController.gdOauthcallback
);

module.exports = router;
