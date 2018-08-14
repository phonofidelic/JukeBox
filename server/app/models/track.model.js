const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artist = require('./artist.model');
const Album = require('./album.model');

const TrackSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, default: 'Unknown' },
	artistId: { type: Schema.Types.ObjectId, required: true, ref: 'Artist' },
	albumId: { type: Schema.Types.ObjectId, required: true, ref: 'Album' },
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