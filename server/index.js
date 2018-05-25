const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
// const routes = require('./app/routes');
const config = require('./config');
const passport = require('passport');
const logger = require('morgan');
const authRoutes = require('./app/routes/auth_routes');
const trackRoutes = require('./app/routes/track_routes');

const PORT = config.port;
const DB_URL = config.db.url;
const FILE_LOCATION = config.fileLocation;

const app = express();

app.use(logger('dev'));
app.use(passport.initialize());

// Configure db
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.on('open', () => console.log('DB connection successfull!'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/uploads', express.static('./uploads'));
app.use('/tracks', trackRoutes);
app.use('/auth', authRoutes);

// Serve static client files
app.use(express.static('../client/build'));

// app.use('/*', (req, res) => {
// 	res.status(404).json({message: 'Recource not found'});
// })

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));