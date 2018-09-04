'use-strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: set a global source for string data
const STRINGS = {
	default_unknown: 'Unknown',
	default_noDescription: 'No description provided'
};

const AlbumSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, default: STRINGS.default_unknown },
	artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
	label: Schema.Types.Mixed,
	year: { type: Number },
	genre: [ String ],
	artwork: [ { format: String, src: String } ],
	description: { type: String, default: STRINGS.default_noDescription }
});

module.exports = mongoose.model(
	'Album',
	AlbumSchema
);