const fs = require('fs');
const util = require('util');
const uuidv4 = require('uuid/v4');
const mm = require('music-metadata');
const axios = require('axios');
const inspectConfig = {colors: true, depth: null};

const DISCOGS_BASE_URL = 'https://api.discogs.com/';

// TODO: Handle image sizes and save multiple images for sm/md/lg
const saveImage = (image) => new Promise((resolve, reject) => {
	// If no embedded image is found for the file, save default image.
	// 'defaultImage' string tells client to render Album icon.
	if (!image) {
		resolve({ format: 'png', src: 'defaultImage' });
	}

	// TODO: check for an existing image in DB. Check by shared Album id?

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

// Utility function that returns the format of the provided Discogs image url
const getDiscogsImgFormat = (imgUrl) => {
	const formatIndex = imgUrl.indexOf('format');
	const openParenIndex = formatIndex+6;
	const closeParenIndex = imgUrl.indexOf(')', openParenIndex);
	return imgUrl.substring(openParenIndex+1, closeParenIndex);
}

const getArtistImage = async (discogsData) => {
	if (!discogsData) return { format: 'png', src: 'defaultImage' };
	const format = getDiscogsImgFormat(discogsData.cover_image);
	const imgPath = `${process.env.FS_IMAGE}/${uuidv4()}.${format}`;
	let response;
	try {
		response = await axios({
			method: 'GET',
			responseType: 'stream',
			url: discogsData.cover_image
		});
	} catch(err) {
		// console.error('\ngetArtistImage, Discogs request error:', err);
		return { format: 'png', src: 'defaultImage' }
	}
	response.data.pipe(fs.createWriteStream(imgPath));
	return await new Promise((resolve, reject) => {
		response.data.on('end', () => {
			// console.log('*** new image saved ***');
			resolve({ format: format, src: imgPath });
		});
		response.data.on('error', () => {
			reject(new Error('Could not save new Artist image file'));
		});
	});
};

const getAlbumImage = async (embededImages, discogsData) => {
	let artwork = [];
	if (!embededImages && !discogsData) return { format: 'png', src: 'defaultImage' };
	if (discogsData) {
		const format = getDiscogsImgFormat(discogsData.cover_image);
		const imgPath = `${process.env.FS_IMAGE}/${uuidv4()}.${format}`;
		const response = await axios({
			method: 'GET',
			responseType: 'stream',
			url: discogsData.cover_image
		});
		response.data.pipe(fs.createWriteStream(imgPath));
		await new Promise((resolve, reject) => {
			response.data.on('end', () => {
				// console.log('*** new Album image saved ***');
				resolve({ format: format, src: imgPath });
			});
			response.data.on('end', () => {
				reject(new Error('Could not save new Album image file'));
			});
		})
		.then(image => {
			artwork.push(image); // TODO: create Image model and use it here
		})
		.catch(err => console.log(err));
	}
	if (embededImages) {
		// console.log('*** embededImages:', embededImages)
		for (let i = 0; i < embededImages.length; i++) {
			const imgPath = `${process.env.FS_IMAGE}/${uuidv4()}.${embededImages[i].format}`;
			fs.writeFile(imgPath, embededImages[i].data, (err) => {
				if (err) {
					console.error('writeFile error:', err);
					return new Error('Could not save new Album image file')
				};
				artwork.push({ format: embededImages[i].format, src:imgPath });
			});	
		}
	}
	// console.log('*** getAlbumImage, artwork:', artwork)
	return artwork;
};

// TODO: delete if unused
module.exports.checkTrack = (metaData, file, Track, userId) => new Promise((resolve, reject) => {
	Track.findOne({ title: metaData.common.title })
	.then(track => {
		resolve(track);
	})
	.catch(err => reject(err));
});

// BUG: Should return an Artist objectId?
module.exports.checkArtist = async (metadata, Artist, userId, importDiscogs) => {
	let artistDoc;
	try {
		existingArtistDoc = await Artist.findOne({ name: metadata.common.artist });
		console.log('\n### Checking Artist collection for existing document...');
		if (existingArtistDoc) {
			console.log('\n### Artist found in db');
			return existingArtistDoc;
		}
		console.log('\n### Artist not found in DB, creating new document...');

		let discogsData;
		if (importDiscogs) {
			discogsData = await requestDiscogsData(metadata.common, 'artist');
			// console.log('\nDiscogs artist data:', util.inspect(discogsData, inspectConfig));
		}

		return await new Artist({
			userId: userId,
			name: metadata.common.artist,
			artwork: await getArtistImage(discogsData)
		}).save();
	} catch(err) {
		return new Error(err);
	}
};

module.exports.checkAlbum = async (metadata, Album, userId, importDiscogs) => {
	let albumDoc;
	let genre = metadata.common.genre || [];
	let year = metadata.common.year || null;
	try {
		exsistingAlbumDoc = await Album.findOne({ title: metadata.common.album });
		if (exsistingAlbumDoc) {
			console.log('\n### Album found in db');
			return exsistingAlbumDoc;
		}	
		console.log('\n### Album not found in DB, creating new document...');

		let discogsData;
		if (importDiscogs) {
			discogsData = await requestDiscogsData(metadata.common, 'album');
			// console.log('\nDiscogs album data:', util.inspect(discogsData, inspectConfig));
			if(discogsData) {
				genre = [...discogsData.style, ...genre];
				year = discogsData.year || year;
			}
		}

		return await new Album({
			userId: userId,
			title: metadata.common.album,
			genre: genre,
			year: year,
			artwork: await getAlbumImage(metadata.common.picture, discogsData)
		}).save();
	} catch(err) {
		return new Error(err);
	}
}

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

module.exports.getTrackImage = async (Album, albumData) => {
	let trackImage
	try {
		let albumDoc = await Album.findById(albumData._id);
		// console.log('*** albumDoc:', albumDoc)
		trackImage = albumDoc.artwork[0];
	} catch(err) {
		console.error(err);
		trackImage = { format: 'png', src: 'defaultImage' };
	}
	// console.log('\n*** trackImage:', trackImage)
	return trackImage;
}

const requestDiscogsData = async (metadataCommon, querryType) => {
	const albumQueryString = `?q=${metadataCommon.artist}&release_title=${metadataCommon.album}&type=release`;
	const artistQueryString = `?q=${metadataCommon.artist}&type=artist`;
	const querryTypes = {
		album: albumQueryString,
		artist: artistQueryString
	}
	let discogsResponse;
	try {
		discogsResponse = await axios.get(`${DISCOGS_BASE_URL}database/search${querryTypes[querryType]}&token=${process.env.DISCOGS_TOKEN}`);
		// Return first result found
		return discogsResponse.data.results[0];
	} catch(e) {
		throw new Error(e)
		return e;
	}
};

