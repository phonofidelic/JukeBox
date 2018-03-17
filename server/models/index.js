const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackModel = mongoose.model(
	'Track', 
	Schema({
		name: String,
		fsName: { type: String, required: true },
		file: {
			path: { type: String, required: true },
			originalname: String,
			mimetype: String,
			size: Number
		}
	})
);

// TODO...
const AlbumModel = mongoose.model(
	'Album',
	Schema({
		name: { type: String, required: true },
		year: Number,
		artist: String,
		tracks: Array
	})
);

module.exports = {
	TrackModel: TrackModel
}