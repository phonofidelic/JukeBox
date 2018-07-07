const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STRINGS = {
	default_unknown: 'Unknown',
	default_noDescription: 'No description provided'
}

const ArtistSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, default: STRINGS.default_unknown },
	albums: [ Schema.Types.Mixed ],
	description: { type: String, default: STRINGS.default_noDescription }
});

module.exports = mongoose.model(
	'Artist',
	ArtistSchema
);