const express = require('express'),
			bodyParser = require('body-parser'),
			path = require('path'),
			fs = require('path'),
			mongoose = require('mongoose'),
			multer = require('multer'),
			uuidv4 = require('uuid/v4'),
			routes = require('./app/routes'),
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

// TODO: this is not secure. Create /play rout to 
// handle streaming of uploaded resources:
// app.get('/play/:trackId', (req, res) => {
// 	console.log('params:', req.params)
// 	// const trackId = '6bcd87a2-dd97-4a0e-bc2e-1f29a9d4160c';
// 	const file = `${__dirname}/uploads/${req.params.trackId}`;
// 	fs.exists(file, exists => {
// 		if (exists) {
// 			const readstream = fs.createReadStream(file);
// 			readstream.pipe(res);
// 		} else {
// 			res.send('404 not found');
// 			res.end();
// 		}
// 	});
// });
app.use('/uploads', express.static('./uploads'));

// Serve static client files
app.use(express.static('../client/build'));

routes(app, db);

// app.use('/*', (req, res) => {
// 	res.status(404).json({message: 'Recource not found'});
// })

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));