const db = {
	url: 'mongodb://localhost:27017/jukeTest'
};

module.exports = {
	port: process.env.PORT || 3001,
	db: db,
	fileLocation: './uploads'
};