// require('dotenv').config();
const DB_CONNECTION = process.env.DB_CONNECTION;
const mongoose = require('mongoose');
const Track = require('./app/models/track.model');
const Artist = require('./app/models/artist.model');
const Album = require('./app/models/album.model');
const utils = require('./app/controllers/utils');

console.log('### DB_CONNECTION:', DB_CONNECTION);
// Configure db
mongoose.connect(DB_CONNECTION);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.on('open', () => console.log('DB connection successfull!'));

Track.find()
.exec((err, tracks) => {
	if (err) {
		console.error(err);
		db.close();
	};

	// console.log(tracks);
	tracks.forEach(track => {
		console.log('### typeof track.artist', typeof track.artist)
		// TODO: Check that is not already updated to new format
		// if (typeof track.artist === 'string' || typeof track.album === 'string') {
		// 	return console.log(`### ${track.title} is already updated`)
		// }
		// if (typeof track.artist !== 'string') return console.log('track.artist is not a string:', track.artist);

		const metaData = {
			common: {
				artist: track.artist,
				album: track.album
			}
		}

		console.log('### metaData:', metaData);

		Promise.all([
			utils.checkArtist(metaData, Artist, track.userId),
			utils.checkAlbum(metaData, Album, track.userId)
		])
		.then(values => {
			console.log('\n### values:', values);

			// Update track with new Artist and Album values
			track.update({
				artist: values[0],
				album: values[1]
			},
			(err, track) => {
				if (err) {
					console.error(err);
				}
				console.log('### Updated track with new values:', track);
			});
			db.close();
		})
		.catch(err => {
			console.error(err);
			db.close();
		})
	})
});

