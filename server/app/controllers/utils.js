const fs = require('fs');
const uuidv4 = require('uuid/v4');

// TODO: Handle image sizes and save multiple images for sm/md/lg
// TODO, BUG: Handle broken images - some images show up as broken image links in ui
module.exports.saveImage = (image) => new Promise((resolve, reject) => {
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

module.exports.checkArtist = (metaData, Artist, userId) => new Promise((resolve, reject) => {
	console.
	log('\n############## metaData.common.artist:', metaData.common.artist);
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
			const newAlbum = new Album({
				userId: userId,
				title: metaData.common.album,
				artist: metaData.common.artist
			});
			newAlbum.save((err, savedAlbum) => {
				console.log('\n### New album saved, savedAlbum:', savedAlbum);
				resolve(savedAlbum);	
			});
		} else {
			console.log('\n### Album found in db, updating track document...');
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
