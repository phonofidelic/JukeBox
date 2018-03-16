const express = require('express'),
			bodyParser = require('body-parser'),
			path = require('path'),
			fs = require('path'),
			mongoose = require('mongoose'),
			multer = require('multer'),
			uuidv4 = require('uuid/v4'),
			routes = require('./routes'),
			config = require('./config');

const PORT = config.port;
const DB_URL = config.db.url;
const FILE_LOCATION = config.fileLocation;

const app = express();

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

// Serve static client files
app.use(express.static('../client/build'));

// app.get('/', (req, res) => {
// 	res.send('hello');
// });

app.get('/test', (req, res) => {
	console.log('testing')
	res.send('testing')
});

routes(app, db);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));