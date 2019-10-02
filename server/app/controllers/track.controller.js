const fs = require('fs');
const mm = require('music-metadata');
const isFile = require('is-file');
const path = require('path');
const util = require('util');
const User = require('../models/user.model');
const Track = require('../models/track.model');
const Artist = require('../models/artist.model');
const Album = require('../models/album.model');
const utils = require('./utils');
const { mapSeries } = require('p-iteration');
const { google } = require('googleapis');
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const axios = require('axios');
const {
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  STORAGE_BASE_URL
} = require('../../config/keys');

const s3 = new AWS.S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY
});

const inspectConfig = { colors: true, depth: null };

const STRINGS = {
  user_registration_success: 'new user registered',
  user_login_success: 'Login successfull',
  user_data_querry_success: 'User info retrieved',
  tracks_post_success: 'Tracks saved'
};

module.exports.getSignedUrl = async (req, res, next) => {
  const { userId } = req;
  const key = `${userId}/${uuidv4()}.mp3`;
  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'jukebox-storage',
      ContentType: 'audio/mp3',
      Key: key
    },
    (err, url) => {
      if (err) return next(err);
      console.log('====================================');
      console.log('s3 signed url:', { key, url });
      console.log('====================================');
      res.send({ key, url });
    }
  );
};

const putS3Object = (fileBuffer, storageKey) => {
  const params = {
    Body: fileBuffer,
    Bucket: 'jukebox-storage',
    Key: storageKey
  };

  s3.putObject(params, (err, data) => {
    if (err) throw err;
    console.log('*** s3 data:', data);
    return data;
  });
};

module.exports.handlePostTracks = async (req, res, next) => {
  console.log('*** handlePostTracks ***');
  const { userId } = req;
  const discogsImports = req.body;
  const mmConfig = {
    duration: true
  };

  // Configure Google Drive
  const gdUser = await User.findById(userId, 'gDrive');
  console.log('\nuser gDrive.gdTokenData:', gdUser);
  const oauth2Client = new google.auth.OAuth2(G_CLIENT_ID, G_CLIENT_SECRET);
  oauth2Client.setCredentials(gdUser.gDrive.gdTokenData);
  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
  });

  /***
   *	Using p-iteration library's mapSeries to execute map callback consecutively
   * 	for each file in req.files, returning an array of saved Track documents.
   *	https://github.com/toniov/p-iteration
   */

  const savedTracks = await mapSeries(req.files, async file => {
    console.log('\nfile:', util.inspect(file, inspectConfig));
    console.log('\ndiscogsImport:', discogsImports[file.originalname]);

    const importDiscogs =
      discogsImports[file.originalname] === 'true' ? true : false;

    let metadata;
    try {
      metadata = await mm.parseFile(file.path, mmConfig);
      console.log('\nmetadata:', util.inspect(metadata, inspectConfig));
      if (!metadata)
        return next(
          new Error(`Could not read metadata for file ${file.originalname}`)
        );
    } catch (err) {
      return next(err);
    }

    // const gdFile = await drive.files.get({ fileId: gdUploadRes.data.id });
    // console.log('\ngdLink:', gdFile.data)

    /***
     *	Check if track is already in DB by matching original file name
     */
    const matchParams = {
      userId: userId,
      'file.originalname': file.originalname
    };
    const matchedTrack = await Track.findOne(matchParams)
      .populate('artist', 'name')
      .populate('album', 'title');
    if (matchedTrack) {
      console.log(`\n*** Match found for "${file.originalname}":`);
      console.log('\n', util.inspect(matchedTrack, inspectConfig));
      return matchedTrack;
    }

    /***
     *	Upload audio file to Google Drive
     *	gdUploadRes.data:
     *	{ kind: 'drive#file',
     *	  id: '1qH8gjaM1KbBVAwUXAtVukUv2BLxEIiJa',
     *	  name: "03 You Ain't No Friend Of Mine.mp3",
     *	  mimeType: 'audio/mp3'
     *	}
     */
    // TODO: Abstract to a "storage" module/interface.
    // 			 Storage interface should be able to handle multiple storage solutions
    // 			 and abstract away their differences from the perspectiv of the track controller
    // const gdUploadRes = await drive.files.create({
    //   requestBody: {
    //     name: file.filename,
    //     mimeType: file.mimetype,
    //     parents: [gdUser.gDrive.gdFolder.id],
    //     writersCanShare: true
    //   },
    //   media: {
    //     mimeType: file.mimetype,
    //     body: fs.createReadStream(file.path)
    //   }
    // });
    // console.log('\ngdUploadRes.data:', gdUploadRes.data);

    const fileBuffer = fs.readFileSync(file.path);
    const storageKey = `${userId}/${uuidv4()}.mp3`;
    await utils.putS3Object(fileBuffer, storageKey);
    console.log('====================================');
    console.log('file.buffer.length:', fileBuffer.length);
    console.log('====================================');

    /***
     *	Check DB for existing Artist and Album doc
     */
    const artistData = await utils.checkArtist(
      metadata,
      Artist,
      userId,
      importDiscogs,
      next
    );
    const albumData = await utils.checkAlbum(
      metadata,
      Album,
      userId,
      importDiscogs,
      next
    );
    console.log('\nartistData:', util.inspect(artistData, inspectConfig));
    console.log('\nalbumData:', util.inspect(albumData, inspectConfig));

    const newTrack = await Track({
      title: metadata.common.title,
      artist: artistData,
      album: albumData,
      image: await utils.getTrackImage(Album, albumData),
      // image: albumData.artwork[0],
      userId: userId,
      format: metadata.format,
      // file: { ...file, gdId: gdUploadRes.data.id }, // TODO: change to generic name (fileId)
      file,
      order: metadata.common.track,
      disk: metadata.common.disk,
      genre: albumData.genre,
      year: albumData.year,
      url: `${STORAGE_BASE_URL}/${storageKey}`
    }).save();
    console.log('\nnewTrack:', util.inspect(newTrack, inspectConfig));

    /***
     *	Update Artist and Album docks with new track data
     */
    await Artist.findOneAndUpdate(artistData._id, {
      $addToSet: { albums: albumData._id }
    });
    await Album.findOneAndUpdate(albumData._id, { artist: artistData._id });

    return newTrack;
  });

  // console.log('\nsavedTracks:', savedTracks)
  res.json({ message: STRINGS.tracks_post_success, tracks: savedTracks });
};

// Edit a track
module.exports.editTrack = (req, res, next) => {
  const trackId = req.params.trackId;
  // TODO: check and only change updated feilds
  // Make sure req.body matches Track model
  freshData = req.body;
  Track.findByIdAndUpdate(
    trackId,
    freshData,
    { new: true },
    (err, updatedTrack) => {
      if (err) return next(err);
      console.log('PUT /tracks/:trackId response:\n', updatedTrack);
      // TODO: change to: res.json({ message: 'Track removed', updatedTrack: updatedTrack });
      res.json({ message: 'Track updated', updatedTrack: updatedTrack });
    }
  );
};

// Delete a track
// DELETE /tracks/:trackId
module.exports.removeTrack = (req, res, next) => {
  const trackId = req.params.trackId;
  Track.findByIdAndRemove(trackId, (err, deletedTrack) => {
    if (err) return next(err);
    // Delete audio file in uploads/audio
    fs.unlink(deletedTrack.file.path, err => {
      if (err) return next(err);
      console.log(`\n### Deleted audio file ${deletedTrack.file.path}`);
    });

    // If an image file exists, delete it from uploads/images
    // if (deletedTrack.image.src && deletedTrack.image.src !== 'defaultImage') {
    // 	fs.unlink(deletedTrack.image.src, (err) => {
    // 		if (err) return next(err);
    // 		console.log(`\n### Deleted image file ${deletedTrack.image.src}`);
    // 	});
    // }

    // TODO: change to: res.json({ message: 'Track removed', deletedTrack: deletedTrack });
    res.json({ message: 'Track removed', deletedTrack: deletedTrack });
  });
  // TODO: Delete track in file system, otherwise there will be lots of
  // 			 files with no reference in the DB
};
