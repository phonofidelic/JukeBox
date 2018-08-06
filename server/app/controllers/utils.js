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
			console.error('readFile error', err);
			reject(err);
		};
		resolve({ format: image[0].format, src:imgPath });
	});
});

module.exports.checkTrack = (metaData, file, Track, userId) => new Promise((resolve, reject) => {
	Track.findOne({ title: metaData.common.title })
	.then(track => {
		resolve(track);
	})
	.catch(err => reject(err));
});

module.exports.checkArtist = (metaData, Artist, userId) => new Promise((resolve, reject) => {
	Artist.findOne({ name: metaData.common.artist })
	.then((artist) => {
		console.log('\n### @checkArtist, artist:', artist);
		if (!artist) {
			console.log('\n### Artist not found in DB, creating new document...');
			const newArtist = new Artist({
				userId: userId,
				name: metaData.common.artist
			});
			newArtist.save((err, savedArtist) => {
				if (err) return console.error('\n### Could not save Artist doc:', err);
				console.log('\n### New Artist saved, savedArtist:', savedArtist);
				resolve(savedArtist);
			});
		} else {
			console.log('\n### Artist found in db, updating track document...');
			resolve(artist);
		}
	})
	.catch(err => {
		reject(err);
	});
});

module.exports.checkAlbum = (metaData, Album, userId) => new Promise((resolve, reject) => {
	Album.findOne({ title: metaData.common.album })
	.then(album => {
		console.log('\n### @checkAlbum, album:', album);
		if (!album) {
			console.log('\n### Album not found in DB, creating new document...');

			// Save album art 
			saveImage(metaData.common.picture)
			.then(image => {
				console.log('### Saving new Album, image:', image)
				const newAlbum = new Album({
					userId: userId,
					title: metaData.common.album,
					artist: metaData.common.artist,
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
	.sort({ title: 1})
	.then((tracks) => {
		resolve(tracks);
	})
	.catch(err => {
		reject(err);
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
})

module.exports.saveImage = saveImage;
