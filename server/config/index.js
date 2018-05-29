require('dotenv').config();
module.exports = {
	port: process.env.PORT || 3001,
	db: process.env.MONGODB_URI || 'mongodb://localhost:27017/jukeTest',
	fileLocation_audio: './uploads/audio',
	fileLocation_images: './uploads/images',
	JWT_SECRET: process.env.JWT_SECRET	// Where did this come from???????
};