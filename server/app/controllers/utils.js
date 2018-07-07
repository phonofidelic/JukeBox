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
	Artist.findOne({ name: metaData.common.artist })
	.then((artist) => {
		console.log('\n### @checkArtist, artist:', artist);
		if (!artist) {
			const newArtist = new Artist({
				userId: userId,
				name: metaData.common.artist
			});
			newArtist.save();
			console.log('### new artist saved, newArtist:', newArtist);
			resolve(newArtist);
		}
		resolve(artist);
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
			const newAlbum = new Album({
				userId: userId,
				title: metaData.common.album,
				artist: metaData.common.artist
			});
			newAlbum.save();
			console.log('### new album saved, newAlbum:', newAlbum);
			resolve(newAlbum);
		}
		resolve(album);
	})
	.catch(err => {
		reject(err);
	});
});
