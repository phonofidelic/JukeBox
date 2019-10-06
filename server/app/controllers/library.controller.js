const Track = require('../models/track.model');
const Artist = require('../models/artist.model');
const Album = require('../models/album.model');
const utils = require('./utils');

module.exports.loadLibrary = (req, res, next) => {
  const { userId } = req;
  utils
    .loadTracks(Track, userId)
    .then(library => {
      res.json({ message: 'Library loaded', library: library });
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getArtist = (req, res, next) => {
  Artist.findById(req.params.artistId)
    .then(artist => {
      if (!artist) return next(new Error('Artist document not found'));
      console.log('### getArtist, artist:', artist);
      res.json({ message: 'Artist details loaded', artist: artist });
    })
    .catch(err => {
      console.error('### getArtist error:', err);
      next({ error: new Error(err) });
    });
};

module.exports.getAlbum = (req, res, next) => {
  Album.findById(req.params.albumId)
    .then(album => {
      if (!album) return next(new Error('Album document not found'));
      console.log('### getArtist, album:', album);
      res.json({ message: 'Album details loaded', album: album });
    })
    .catch(err => {
      next(err);
    });
};
