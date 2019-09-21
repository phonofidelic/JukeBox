const fs = require('fs');
const util = require('util');
const User = require('../models/user.model');
const { google } = require('googleapis');
const Datauri = require('datauri');
const datauri = new Datauri();
const inspectConfig = { colors: true, depth: null };
const { TMP, G_CLIENT_ID, G_CLIENT_SECRET } = require('../../config/keys');

module.exports.getStream = async (req, res, next) => {
  // res.set('content-type', 'audio/mp3');
  //  res.set('accept-ranges', 'bytes');
  // console.log('@getStream, req.params', req.params)
  const { gdId } = req.params;
  const { userId } = req;
  const mimetype = req.get('mimetype');
  const ext = req.get('ext');

  // TODO: Abstract to storage service
  const gdUser = await User.findById(userId, 'gDrive');
  oauth2Client = new google.auth.OAuth2(G_CLIENT_ID, G_CLIENT_SECRET);
  oauth2Client.setCredentials(gdUser.gDrive.gdTokenData);
  const drive = await google.drive({
    version: 'v3',
    auth: oauth2Client
  });

  console.log(`*** gdId: ${gdId}, mimetype: ${mimetype}, ext: ${ext}`);

  // Check if file is already in tmp
  fs.readdir(TMP, async (err, files) => {
    if (err) next(err.message);
    const isCashed = files.indexOf(`${gdId}.${ext}`) >= 0 ? true : false;
    if (isCashed) {
      console.log('\n*** stream from cache');
      res
        .status(200)
        .json({ message: 'Stream created', src: `${TMP}/${gdId}.${ext}` });
    } else {
      console.log('\n*** download to cache and stream');

      const dest = fs.createWriteStream(`${TMP}/${gdId}.${ext}`);
      // TODO: Abstract to storage service that can handle multiple sources and rename gdRes -> streamRes?

      try {
        const gdRes = await drive.files.get(
          {
            fileId: gdId,
            mimeType: mimetype,
            parents: [gdUser.gDrive.gdFolder.id],
            alt: 'media'
          },
          { responseType: 'stream' }
        );
      } catch (err) {
        next(err);
      }

      // res.writeHead(200, {'Content-Type': 'audio/mpeg'});
      gdRes.data
        .on('data', chunk => {
          // console.log(chunk)
          // res.write(chunk)
        })
        .on('end', () => {
          console.log('*** done');
          // res.end()
          res.status(200).json({ message: 'Stream created', src: dest.path });
          // datauri.encode(dest.path);
        })
        .on('error', err => next(err))
        .pipe(dest);
    }
  });
};
