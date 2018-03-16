const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackModel = mongoose.model(
	'Track', 
	Schema({
		name: String,
		location: String,
		fsName: String
	})
);

module.exports = {
	TrackModel: TrackModel
}