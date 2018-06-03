const fs = require('fs');
const uuidv4 = require('uuid/v4');

// TODO: Handle image sizes and save multiple images for sm/md/lg
// TODO, BUG: Handle broken images - some images show up as broken image links in ui
const parseImageData = (image) => new Promise((resolve, reject) => {
	const imgPath = `${process.env.FS_IMAGE}/${uuidv4()}.${image[0].format}`;

	fs.writeFile(imgPath, image[0].data, (err) => {
		if (err) {
			console.error('readFile error', err);
			reject(err);
		};
		resolve({ format: image[0].format, src:imgPath });
	});
});

module.exports = {
	parseImageData
}