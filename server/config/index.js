const db = {
	url: 'mongodb://localhost:27017/jukeTest'
};

module.exports = {
	port: process.env.PORT || 3001,
	db: db,
	fileLocation_audio: './uploads/audio',
	fileLocation_images: './uploads/images',
	JWT_SECRET: '1JFlYjRtx7IUm8l0d6aT'	// Where did this come from???????
};