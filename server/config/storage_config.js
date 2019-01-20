const path = require('path');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.FS_AUDIO); // TODO: change destination to tmp directory?
	},
	filename: (req, file, cb) => {
		// Set file system name in request object
		newName = `${uuidv4()}${path.extname(file.originalname)}`;
		cb(null, newName);
	}
});

module.exports = multer({ storage });