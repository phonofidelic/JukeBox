const fs = require('fs');
const uuidv4 = require('uuid/v4');

// TODO: Handle image sizes and save multiple images for sm/md/lg
// TODO, BUG: Handle broken images - some images show up as broken image links in ui
const saveImage = (image) => new Promise((resolve, reject) => {
	if (!image) {
		resolve({ format: 'png', src: 'defaultImage' });
	}
	// Create a unique name for the image file and append to pathe for track image location
	const imgPath = `${process.env.FS_IMAGE}/${uuidv4()}.${image[0].format}`;

	fs.writeFile(imgPath, image[0].data, (err) => {
		if (err) {
			console.error('writeFile error:', err);
			reject(err);
		};
		resolve({ format: image[0].format, src:imgPath });
	});
});

const findArtistByName = (artistName, Artist) => new Promise((resolve, reject) => {
	Artist.findOne({ name: artistName }, (err, artist) => {
		if (err) reject(err);
		resolve(artist);
	});
});

// TODO: delete if unused
module.exports.checkTrack = (metaData, file, Track, userId) => new Promise((resolve, reject) => {
	Track.findOne({ title: metaData.common.title })
	.then(track => {
		resolve(track);
	})
	.catch(err => reject(err));
});

// BUG: Should return an Artist objectId?
module.exports.checkArtist = (metaData, Artist, userId) => {
	console.log('### Checking Artist collection for existing document...');
	return Artist.findOne({ name: metaData.common.artist })
	.then(artist => {
		// console.log('\n### @checkArtist, artist:', artist);

		if (!artist) {
			console.log('\n### Artist not found in DB, creating new document...');
			return new Artist({
				userId: userId,
				name: metaData.common.artist
			})
			.save();
		}
		console.log('\n### Artist found in db');
		return artist;
	})
	.catch(err =>{
		return new new Error(err);
	});
};

// BUG: Should return an Album objectId?
module.exports.checkAlbum = (metaData, Album, userId) => new Promise((resolve, reject) => {
	console.log('### Checking Album collection for existing document...');
	Album.findOne({ title: metaData.common.album })
	.then(album => {
		// console.log('\n### @checkAlbum, album:', album);
		if (!album) {
			console.log('\n### Album not found in DB, creating new document...');

			// Save album art 
			saveImage(metaData.common.picture)
			.then(image => {
				console.log('### Saving new Album, image:', image)
				const newAlbum = new Album({
					userId: userId,
					title: metaData.common.album,
					// artist: metaData.common.artist,
					artwork: [image]
				});

				newAlbum.save((err, savedAlbum) => {
					if (err) return console.error('\n### Could not save Album doc:', err);
					console.log('\n### New album saved, savedAlbum:', savedAlbum);
					resolve(savedAlbum);	
				});
			})
			.catch(err => {
				console.error('\n### Could not save image:', err);
			});
		} else {
			console.log('\n### Album found in db, updating track document...');

			// If uploading track has embeded album art...
			// Check Album doc artwork field
			// If artork field is empty of if first item is a default image...
			if (metaData.common.picture && (album.artwork.length < 1 || album.artwork[0].src === 'defaultImage')) {
				console.log('\n### Saving new album art...')
				saveImage(metaData.common.picture)
				.then(image => {
					album.artwork.unshift(image);
					album.save((err, savedAlbum) => {
						if (err) return console.log('\n### Could not update album art:', err);
						console.log('\n### Album updated with new album art');
						resolve(savedAlbum);
					});
				})
				.catch(err => {
					console.error('\n### Could not save image:', err);
				});
			}
			resolve(album);
		}
	})
	.catch(err => {
		reject(err);
	});
});

module.exports.loadTracks = (Track, userId) => new Promise((resolve, reject) => {
	Track.find({ userId: userId })
	// .populate('artist album')
	.populate({ path: 'artist', select: 'name' })
	.populate({ path: 'album', select: 'title' })
	.sort({ title: 1})
	.exec((err, tracks) => {
		if (err) reject(err);
		resolve(tracks);
	});
});

module.exports.loadArtists = (Artist, userId) => new Promise((resolve, reject) => {
	Artist.find({ userId: userId })
	.sort({ name: 1})
	.then((artists) => {
		resolve(artists);
	})
	.catch(err => {
		reject(err);
	});
});

module.exports.loadAlbums = (Album, userId) =>  new Promise((resolve, reject) => {
	Album.find({ userId: userId })
	.sort({ title: 1})
	.then((albums) => {
		resolve(albums);
	})
	.catch(err => {
		reject(err);
	});
});
