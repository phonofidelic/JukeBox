const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, default: 'Unknown' },
	artist: {
		id: { type: Schema.Types.ObjectId, required: true },
		name: { type: String, default: 'Unknown' }
	},
	album: {
		id: { type: Schema.Types.ObjectId, required: true },
		name: { type: String, default: 'Unknown' }
	},
	genre: [ String ],
	order: {
		no: { type: Number, default: 0 },
		of: { type: Number, default: 0 }
	},
	image: {
		format: String,
		src: String
	},
	format: Schema.Types.Mixed,
	file: {
		path: { type: String, required: true },
		originalname: String,
		mimetype: String,
		size: Number
	}
});

module.exports = mongoose.model(
	'Track',
	TrackSchema
);