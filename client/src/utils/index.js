export const validation = {
	required: value => (value ? undefined: 'Required'),
	email: value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined),
  password: (value, all, props) => (!props.auth.loginErr ? undefined : 'Unauthorized'),
};

export const testTrack = () => {
	const ObjectId = id => id;

	return {
    "_id" : ObjectId("5b84b519dcc5929d48879b95"),
    "order" : {
      "no" : 3,
      "of" : 4
    },
    "image" : {
      "format" : "png",
      "src" : "defaultImage"
    },
    "file" : {
      "originalname" : "93eb5cb3-59bf-4001-9590-f5e54560339e.mp3",
      "path" : "uploads/audio/2961a766-db18-4dc8-aa43-10b0191c9fd6.mp3",
      "size" : 1822637,
      "mimetype" : "audio/mp3"
    },
    "title" : "Army Life",
    "genre" : [],
    "userId" : ObjectId("5b39abf37744c81d7c39bb74"),
    "artist" : ObjectId("5b84b519dcc5929d48879b92"),
    "album" : ObjectId("5b84b519dcc5929d48879b93"),
    "format" : {
      "lossless" : false,
      "dataformat" : "mp3",
      "bitrate" : 128000,
      "sampleRate" : 44100,
      "numberOfChannels" : 2,
      "codecProfile" : "CBR",
      "numberOfSamples" : 5012352,
      "duration" : 113.658775510204,
      "tagTypes" : [ 
        "ID3v2.2"
      ]
    },
    "__v" : 0
	}
};
