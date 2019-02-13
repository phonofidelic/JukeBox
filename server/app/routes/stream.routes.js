const router = require('express').Router();
const streamController = require('../controllers/stream.controller');

router.get('/:gdId', streamController.getStream);

module.exports = router;