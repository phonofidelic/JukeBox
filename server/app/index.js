require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
const authRoutes = require('./routes/auth.routes');
const trackRoutes = require('./routes/track.routes');
const libraryRoutes = require('./routes/library.routes');

// const PORT = process.env.PORT;
// const DB_CONNECTION = process.env.DB_CONNECTION;

const app = express();

app.use(logger('dev'));
app.use(passport.initialize());

// Configure db
mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.on('open', () => console.log('DB connection successfull!'));

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure access-control headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Bug: this is not working:
// Remove X-Powered-By express header from all response objects
app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});
// or
// app.set('X-Powered-By', false);

// Configure routers
app.use('/uploads', express.static('./uploads'));
app.use('/tracks', trackRoutes);
app.use('/auth', authRoutes);
app.use('/library', libraryRoutes);

// Serve static client files
app.use(express.static(process.env.CLIENT_DIR));

// Catch all unhandled routes
app.use('/*', (req, res) => {
	res.status(404).json({message: 'Recource not found'});
});

app.use((err, req, res, next) => {
	console.error('### FROM ERROR HANDLER:', err);
	res.status(500).json({message: err.message || 'Something broke!'});
})

// app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));

// For testing
module.exports = app;

