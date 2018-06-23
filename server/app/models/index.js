const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
})

UserSchema.pre('save', function(next) {
	let user = this;
	SALT_FACTOR = 5;

	// console.log('## user:', user)
	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	console.log('comparePassword, this:', this)
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) {
			console.error('comparePassword error:', err)
			return cb(err);
		}
		cb(null, isMatch);
	});
};

const UserModel = mongoose.model(
	'User',
	UserSchema
);

// const TrackModel = mongoose.model(
// 	'Track',
// 	Schema({
// 		userId: { type: Schema.Types.ObjectId, required: true },
// 		title: { type: String, default: 'Unknown' },
// 		artist: { type: String, default: 'Unknown' },
// 		album: { type: String, default: 'Unknown' },
// 		genre: [ String ],
// 		order: {
// 			no: { type: Number, default: 0 },
// 			of: { type: Number, default: 0 }
// 		},
// 		image: {
// 			format: String,
// 			src: String
// 		},
// 		format: Schema.Types.Mixed,
// 		file: {
// 			path: { type: String, required: true },
// 			originalname: String,
// 			mimetype: String,
// 			size: Number
// 		}
// 	})
// );

// TODO...
// const AlbumModel = mongoose.model(
// 	'Album',
// 	Schema({
// 		name: { type: String, required: true },
// 		year: Number,
// 		artist: String,
// 		tracks: Array
// 	})
// );

module.exports = {
	// TrackModel: TrackModel,
	UserModel: UserModel
}