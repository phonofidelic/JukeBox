const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STRINGS = {
	default_unknown: 'Unknown',
	default_noDescription: 'No description provided'
}

const AlbumSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, default: STRINGS.default_unknown },
	artist: Schema.Types.Mixed,
	label: Schema.Types.Mixed,
	year: { type: Number },
	genre: [ String ],
	artwork: [ String ], // array of img src strings
	description: { type: String, default: STRINGS.default_noDescription }
});

module.exports = mongoose.model(
	'Album',
	AlbumSchema
);