const router = require('express').Router();
const streamController = require('../controllers/stream.controller');
const { requireAuth } = require('../controllers/auth.controller');

router.get('/:gdId', requireAuth, streamController.getStream);

module.exports = router;
