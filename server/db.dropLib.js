const DB_CONNECTION = process.env.DB_CONNECTION;
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Track = require('./app/models/track.model');
const Artist = require('./app/models/artist.model');
const Album = require('./app/models/album.model');
const utils = require('./app/controllers/utils');

const audioPath = process.env.FS_AUDIO;
const imagePath = process.env.FS_IMAGE;

const assetDirs = [audioPath, imagePath];

function emptyDirs(dirs) {
	console.log('*** dirs:', dirs)
	dirs.forEach(dir => {
		fs.readdir(dir, (err, files) => {
			if (err) throw err;

			for (let file of files) {
				fs.unlink(path.join(dir, file), err => {
					if (err) throw  err;
					console.log(`deleted file "${file}`)
				});
			}
		});
	});
};

console.log('### DB_CONNECTION:', DB_CONNECTION);
// Configure db
mongoose.connect(DB_CONNECTION);
const db = mongoose.connection;

async function dropLib() {
	await Track.remove({}, err =>{
		if (err) console.log('Could not remove Track docs:', err);
		return console.log('Track docs removed');
	});

	await Artist.remove({}, err =>{
		if (err) console.log('Could not remove Artist docs:', err);
		return console.log('Artist docs removed');
	});

	await Album.remove({}, err =>{
		if (err) console.log('Could not remove Album docs:', err);
		return console.log('Album docs removed');
	});

	emptyDirs(assetDirs);
	return 0;
}
dropLib();