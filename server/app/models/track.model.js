const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artist = require('./artist.model');
const Album = require('./album.model');

const TrackSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, default: 'Unknown' },
	artist: { type: Schema.Types.ObjectId, required: true, ref: 'Artist' },
	album: { type: Schema.Types.ObjectId, required: true, ref: 'Album' },
	genre: [ String ],
	year: Number,
	order: {
		no: { type: Number, default: 0 },
		of: { type: Number, default: 0 }
	},
	disk: {
		no: { type: Number, default: 0 },
		of: { type: Number, default: 0 }
	},
	image: {
		format: { type: String, required: true },
		src: { type: String, required: true }
	},
	format: Schema.Types.Mixed,
	file: {
		path: { type: String, required: true },
		originalname: String,
		mimetype: String,
		size: Number
	}
});

TrackSchema.statics.findMatching = function(match) {
	Track.findOne(match)
	.exec((err, track) => {
		if (err) return new Error(err);
		return track;
	});
};

module.exports = mongoose.model(
	'Track',
	TrackSchema
);