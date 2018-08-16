'use-strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: set a global source for string data
const STRINGS = {
	default_unknown: 'Unknown',
	default_noDescription: 'No description provided'
};

const ArtistSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, default: STRINGS.default_unknown },
	albums: [ { type: Schema.Types.ObjectId, ref: 'Album' } ],
	description: { type: String, default: STRINGS.default_noDescription }
});

// ArtistSchema.statics.getArtistName = function(id) {
// 	return this.findById(id, 'name')
// 	.populate('artist')
// 	.exec((err, artist) => {
// 		console.log('### Populate artist feild:', artist)
// 		return artist;
// 	});
// }

module.exports = mongoose.model(
	'Artist',
	ArtistSchema
);