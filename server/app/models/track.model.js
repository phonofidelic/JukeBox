const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artist = require('./artist.model');
const Album = require('./album.model');

const TrackSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, default: 'Unknown' },
	artist: {
		_id: { type: Schema.Types.ObjectId, required: true },
		name: { type: String, default: 'Unknown' }
	},
	album: {
		_id: { type: Schema.Types.ObjectId, required: true },
		title: { type: String, default: 'Unknown' }
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

TrackSchema.pre('validate', function(next) {
	// console.log('### FROM PRE VALIDATE ###')
	// console.log('this:', this)
	next();
	
	// Look for matching artist
	// Artist.findOne({ name: })
	// If one is found, add it's id to tracks artist.id field
	// Otherwise, create a new artist document
});

module.exports = mongoose.model(
	'Track',
	TrackSchema
);