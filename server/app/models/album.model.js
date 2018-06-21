const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	title: { type: String, default: 'Unknown' },
	artist: { 
		id: { type: Schema.types.ObjectId },
		name: { type: String, default: 'Unknown'}
	},
	label: { 
		id: { type: Schema.types.ObjectId },
		name: { type: String, default: 'Unknown'}
	},
	year: { type: Number },
	genre: [ String ],
	artwork: [ String ] // array of img src strings
});

module.exports = mongoose.model(
	'Album',
	AlbumSchema
);