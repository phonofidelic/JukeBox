const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

// const TrackModel = mongoose.model(
// 	'Track', 
// 	Schema({
// 		name: String,
// 		file: {
// 			path: { type: String, required: true },
// 			originalname: String,
// 			mimetype: String,
// 			size: Number
// 		}
// 	})
// );

const TrackModel = mongoose.model(
	'Track',
	Schema({
		title: { type: String, default: 'Unknown' },
		artist: { type: String, default: 'Unknown' },
		album: { type: String, default: 'Unknown' },
		genre: [ String ],
		order: {
			no: { type: Number, default: 0 },
			of: { type: Number, default: 0 }
		},
		image: {
			format: String,
			src: String
		},
		format: Mixed,
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