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
	description: { type: String, default: STRINGS.default_noDescription },
	artwork: [ { type: Schema.Types.Mixed } ]
});

ArtistSchema.statics.findOneWithAlbumId = function(albumId) {
	return this.findOne({ albums: albumId }).exec();
};

// Update Artist soc with new Album data
ArtistSchema.methods.updateWithNewAlbumData = function(albumId) {
	this.albums.push(albumId);
	this.save().then(artist => {
		console.log(`\n### Artist updated with new albumId, artist: ${artist}`)
	}).catch(err => {
		console.error('\n### Could not update artist with new albumId:', err)
	});
};

module.exports = mongoose.model(
	'Artist',
	ArtistSchema
);