require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
// const logger = require('morgan');
const authRoutes = require('./routes/auth.routes');
const trackRoutes = require('./routes/track.routes');
const libraryRoutes = require('./routes/library.routes');
const gdriveRoutes = require('./routes/gdrive.routes');
const streamRoutes = require('./routes/stream.routes');
const { DB_CONNECTION, CLIENT_DIR } = require('../config/keys');

const STRINGS = {
  default_server_error: 'Something broke!'
};

const app = express();

// app.use(logger('dev'));
app.use(passport.initialize());

// Configure db
mongoose.connect(DB_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.on('open', () => console.log('DB connection successfull!'));

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set view engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Configure access-control headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Bug: this is not working:
// Remove X-Powered-By express header from all response objects
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});
// or
// app.set('X-Powered-By', false);

// Configure routers
// Static files
app.use('/uploads', express.static('./uploads'));
app.use('/tmp', express.static('./tmp'));
// API
app.use('/api/tracks', trackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/gdrive', gdriveRoutes);
app.use('/api/stream', streamRoutes);

/**
 * Commenting out since api server will not serve client
 */
// // Serve static client files
app.use(express.static(CLIENT_DIR));
app.use('/*', express.static(CLIENT_DIR));

// Catch all unhandled routes
app.use('/*', (req, res) => {
  res.status(404).json({ message: 'Recource not found' });
});

app.use((err, req, res, next) => {
  console.error('\n### FROM ERROR HANDLER:', err);
  res
    .status(500)
    .json({ message: err.message || STRINGS.default_server_error });
});

// app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));

// For testing
module.exports = app;
