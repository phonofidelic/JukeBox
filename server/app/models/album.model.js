const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, default: 'Unknown' },
	artist: { 
		id: { type: Schema.Types.ObjectId },
		name: { type: String, default: 'Unknown'}
	},
	label: { 
		id: { type: Schema.Types.ObjectId },
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