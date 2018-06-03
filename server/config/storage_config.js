const path = require('path');
const multer = require('multer');

module.exports.storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.FS_AUDIO);
	},
	filename: (req, file, cb) => {
		// Set file system name in request object
		newName = `${uuidv4()}${path.extname(file.originalname)}`;
		cb(null, newName);
	}
});