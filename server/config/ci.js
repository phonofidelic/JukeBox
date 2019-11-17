require("dotenv").config();
module.exports = {
  // API_ROOT: 'http://localhost:3000',
  PORT: 3000,
  DB_CONNECTION: "mongodb://127.0.0.1:27017/jukebox_ci",
  CLIENT_DIR: "../client/build",
  FS_AUDIO: "uploads/audio",
  FS_IMAGE: "uploads/images",
  TMP: "tmp",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP: "15m",
  JWT_AUD: "jukebox_client",
  JWT_ISS: "jukebox_api",
  DISCOGS_TOKEN: process.env.DISCOGS_TOKEN,
  // G_CLIENT_ID:
  //   '1055271812237-icje6bl0lorut3pseo494avkdn6ohgub.apps.googleusercontent.com',
  // G_CLIENT_SECRET: process.env.G_CLIENT_SECRET,
  // G_REDIRECT_URI: 'api/gdrive/authcode',
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: "jukebox-ci-storage",
  STORAGE_BASE_URL: process.env.STORAGE_BASE_URL,
  STORAGE_MAX: 16106127360
};
