module.exports = {
  PORT: 3000,
  DB_CONNECTION: 'mongodb://127.0.0.1:27017/jukebox_ci',
  FS_AUDIO: 'uploads/audio',
  FS_IMAGE: 'uploads/images',
  TMP: 'tmp',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP: '15m',
  JWT_AUD: 'jukebox_client',
  JWT_ISS: 'jukebox_api',
  DISCOGS_TOKEN: process.env.DISCOGS_TOKEN,
  G_CLIENT_ID: process.env.G_CLIENT_ID,
  G_CLIENT_SECRET: process.env.G_CLIENT_SECRET,
  G_REDIRECT_URI: process.env.G_REDIRECT_URI
};
