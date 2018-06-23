const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, default: 'Unknown' },
	albums: [ Schema.Types.ObjectId ],
	description: { type: String, default: 'No description provided' }
});

module.exports = mongoose.model(
	'Artist',
	ArtistSchema
);