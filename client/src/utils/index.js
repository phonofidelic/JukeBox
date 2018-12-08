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

export const mockQueue =  [
    {
      order: {
        no: 11,
        of: 12
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/6b6d5281-14ac-4b93-9ff8-4b2ed0b9bdf8.jpeg'
      },
      file: {
        originalname: '11 Ain\'t the weather nice_.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/790140fb-ca76-423e-a8d1-2a6aa7ae5b58.m4a',
        size: 4047636
      },
      title: 'Ain\'t the weather nice?',
      genre: [
        'Garage Rock',
        'Mod',
        'Power Pop',
        'Alternative & Punk'
      ],
      _id: '5bef7e7ea364f51aec54de4f',
      artist: {
        name: 'Kilroy',
        _id: '5bef7e7ea364f51aec54de42'
      },
      album: {
        title: 'Kilroy!',
        _id: '5bef7e7ea364f51aec54de43'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 248.45351473922904,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2005,
      __v: 0,
      queueId: 1330626249626,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: true,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            248405.62358276645
          ]
        },
        _src: 'uploads/audio/790140fb-ca76-423e-a8d1-2a6aa7ae5b58.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 248.40562358276645,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0.882358276643991,
            _paused: true,
            _ended: false,
            _sprite: '__default',
            _id: 1002,
            _node: {
              paused: true,
              bufferSource: null
            },
            _rateSeek: 0,
            _start: 0,
            _stop: 248.40562358276645,
            _playStart: 0.3250793650793651
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 7,
        of: 12
      },
      disk: {
        no: null,
        of: null
      },
      image: {
        format: 'png',
        src: './uploads/images/a0a2752b-5b63-4520-a67f-03c6eec73957.png'
      },
      file: {
        originalname: '07 ABC City V1.mp3',
        mimetype: 'audio/mp3',
        path: 'uploads/audio/782d6b20-4aa1-45ad-a6ad-a4ae4d69a833.mp3',
        size: 5943744
      },
      title: 'ABC City V1',
      genre: [],
      _id: '5bef7e6ea364f51aec54de23',
      artist: {
        name: 'Holograms',
        _id: '5bef7e6ea364f51aec54de0e'
      },
      album: {
        title: 'Unknown',
        _id: '5bef7e6ea364f51aec54de21'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        lossless: false,
        dataformat: 'mp3',
        bitrate: 256000,
        sampleRate: 44100,
        numberOfChannels: 2,
        encoder: 'LAME 3.96.1',
        codecProfile: 'CBR',
        numberOfSamples: 8061696,
        duration: 182.80489795918368,
        tagTypes: [
          'ID3v2.2'
        ]
      },
      year: null,
      __v: 0,
      queueId: 885187844613,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            182831.02040816325
          ]
        },
        _src: 'uploads/audio/782d6b20-4aa1-45ad-a6ad-a4ae4d69a833.mp3',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 182.83102040816325,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1003,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 7,
        of: 15
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/6cf35b60-7a0b-46d0-a366-db0d77508da6.jpeg'
      },
      file: {
        originalname: '07 3-Minute Rule.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/cee3f62d-5bca-4776-95c8-bb8844bf8663.m4a',
        size: 7358837
      },
      title: '3-Minute Rule',
      genre: [
        'Hardcore Hip-Hop',
        'Boom Bap',
        'Hip Hop/Rap'
      ],
      _id: '5bef7e3ca364f51aec54ddd8',
      artist: {
        name: 'Beastie Boys',
        _id: '5bef7e3ba364f51aec54ddce'
      },
      album: {
        title: 'Paul\'s Boutique',
        _id: '5bef7e3ca364f51aec54ddcf'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 219.28925170068027,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2009,
      __v: 0,
      queueId: 746562049623,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            219288.34467120183
          ]
        },
        _src: 'uploads/audio/cee3f62d-5bca-4776-95c8-bb8844bf8663.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 219.28834467120183,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1004,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 2,
        of: null
      },
      disk: {
        no: null,
        of: null
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/877ae60a-ed41-45f0-bdda-fe66abfa7e2f.jpeg'
      },
      file: {
        originalname: '02 Andy\'s Chest.mp3',
        mimetype: 'audio/mp3',
        path: 'uploads/audio/985304fe-3809-4e4b-81c2-2e699d4589bb.mp3',
        size: 4030895
      },
      title: 'Andy\'s Chest',
      genre: [
        'Glam',
        'Rock'
      ],
      _id: '5beff8effe5a9e3afc37bb44',
      artist: {
        name: 'Lou Reed',
        _id: '5beff8effe5a9e3afc37bb3f'
      },
      album: {
        title: 'Transformer',
        _id: '5beff8effe5a9e3afc37bb40'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        lossless: false,
        dataformat: 'mp3',
        bitrate: 160000,
        sampleRate: 44100,
        numberOfChannels: 2,
        codecProfile: 'CBR',
        numberOfSamples: 8849664,
        duration: 200.67265306122448,
        tagTypes: [
          'ID3v2.3',
          'ID3v1.1'
        ]
      },
      year: 2007,
      __v: 0,
      queueId: 291571113300,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            200489.79591836734
          ]
        },
        _src: 'uploads/audio/985304fe-3809-4e4b-81c2-2e699d4589bb.mp3',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 200.48979591836735,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1005,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 10,
        of: 11
      },
      disk: {
        no: null,
        of: null
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/fc97be5f-8c05-4369-aa91-527fdf6f0da4.jpeg'
      },
      file: {
        originalname: '10 Bottles.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/67a26422-095c-4238-a62f-c2b6e4244602.m4a',
        size: 3890948
      },
      title: 'Bottles',
      genre: [
        'Garage Rock'
      ],
      _id: '5beffa8efe5a9e3afc37bb5b',
      artist: {
        name: 'Makeouts',
        _id: '5beffa8efe5a9e3afc37bb4e'
      },
      album: {
        title: 'In a Strange Land',
        _id: '5beffa8efe5a9e3afc37bb4f'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 114.56725623582767,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2010,
      __v: 0,
      queueId: 766982283385,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            114519.36507936507
          ]
        },
        _src: 'uploads/audio/67a26422-095c-4238-a62f-c2b6e4244602.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 114.51936507936507,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1006,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 7,
        of: 12
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/ffebf7db-b660-4464-9bb2-cb468bc5b00d.jpeg'
      },
      file: {
        originalname: '07 Boneyard.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/97f57112-5282-44d2-95b6-e02ddc2015ef.m4a',
        size: 3868163
      },
      title: 'Boneyard',
      genre: [
        'Garage Rock',
        'Punk',
        'Alternative'
      ],
      _id: '5beffb27fe5a9e3afc37bb67',
      artist: {
        name: 'Nobunny',
        _id: '5beffb27fe5a9e3afc37bb5d'
      },
      album: {
        title: 'Love Visions',
        _id: '5beffb27fe5a9e3afc37bb5e'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 103.0269387755102,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2008,
      __v: 0,
      queueId: 386847765160,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            102979.04761904762
          ]
        },
        _src: 'uploads/audio/97f57112-5282-44d2-95b6-e02ddc2015ef.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 102.97904761904762,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1007,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 6,
        of: 12
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/ffebf7db-b660-4464-9bb2-cb468bc5b00d.jpeg'
      },
      file: {
        originalname: '06 Chuck Berry Holiday.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/150f9e69-600c-4705-868c-6fafc4470b26.m4a',
        size: 6443821
      },
      title: 'Chuck Berry Holiday',
      genre: [
        'Garage Rock',
        'Punk',
        'Alternative'
      ],
      _id: '5beffb27fe5a9e3afc37bb66',
      artist: {
        name: 'Nobunny',
        _id: '5beffb27fe5a9e3afc37bb5d'
      },
      album: {
        title: 'Love Visions',
        _id: '5beffb27fe5a9e3afc37bb5e'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 187.7101133786848,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2008,
      __v: 0,
      queueId: 1507022274010,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            187662.22222222222
          ]
        },
        _src: 'uploads/audio/150f9e69-600c-4705-868c-6fafc4470b26.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 187.66222222222223,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1008,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 11,
        of: 15
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/6cf35b60-7a0b-46d0-a366-db0d77508da6.jpeg'
      },
      file: {
        originalname: '11 Car Thief.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/ec221bad-278e-46c0-a10e-61d1cd115e69.m4a',
        size: 7370833
      },
      title: 'Car Thief',
      genre: [
        'Hardcore Hip-Hop',
        'Boom Bap',
        'Hip Hop/Rap'
      ],
      _id: '5bef7e3ca364f51aec54dddc',
      artist: {
        name: 'Beastie Boys',
        _id: '5bef7e3ba364f51aec54ddce'
      },
      album: {
        title: 'Paul\'s Boutique',
        _id: '5bef7e3ca364f51aec54ddcf'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 219.6607709750567,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2009,
      __v: 0,
      queueId: 701296482575,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            219660
          ]
        },
        _src: 'uploads/audio/ec221bad-278e-46c0-a10e-61d1cd115e69.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 219.66,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1009,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 7,
        of: null
      },
      disk: {
        no: null,
        of: null
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/8352a2ef-ff8d-4a8b-8301-f910e112f0cd.jpeg'
      },
      file: {
        originalname: '07 Don\'t Cha Want Me Back.mp3',
        mimetype: 'audio/mp3',
        path: 'uploads/audio/f8611210-46e0-4ef0-8a28-7ab0438032d5.mp3',
        size: 6756572
      },
      title: 'Don\'t Cha Want Me Back',
      genre: [
        'Garage Rock',
        'Punk',
        'Rock'
      ],
      _id: '5bef7e75a364f51aec54de3c',
      artist: {
        name: 'Hunx and His Punx',
        _id: '5bef7e75a364f51aec54de33'
      },
      album: {
        title: 'Gay Singles',
        _id: '5bef7e75a364f51aec54de34'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        lossless: false,
        dataformat: 'mp3',
        bitrate: 320000,
        sampleRate: 44100,
        numberOfChannels: 2,
        codecProfile: 'CBR',
        numberOfSamples: 7445376,
        duration: 168.82938775510203,
        tagTypes: [
          'ID3v2.3',
          'ID3v1.1'
        ]
      },
      year: 2009,
      __v: 0,
      queueId: 837704657201,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            168855.51020408163
          ]
        },
        _src: 'uploads/audio/f8611210-46e0-4ef0-8a28-7ab0438032d5.mp3',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 168.85551020408164,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1010,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 5,
        of: null
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/eed61ac2-b19e-46ab-a8c0-4dd351ed3027.jpeg'
      },
      file: {
        originalname: '05 Freakin Out.mp3',
        mimetype: 'audio/mp3',
        path: 'uploads/audio/b8dfa4ad-6b33-4716-adad-097b26c4c18e.mp3',
        size: 4068056
      },
      title: 'Freakin Out',
      genre: [
        'Garage Rock',
        'Punk',
        'Rock'
      ],
      _id: '5bef7e58a364f51aec54de07',
      artist: {
        name: 'Death',
        _id: '5bef7e57a364f51aec54ddff'
      },
      album: {
        title: 'For The Whole World To See',
        _id: '5bef7e57a364f51aec54de00'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        lossless: false,
        dataformat: 'mp3',
        bitrate: 192000,
        sampleRate: 44100,
        numberOfChannels: 2,
        codecProfile: 'CBR',
        numberOfSamples: 7435008,
        duration: 168.59428571428572,
        tagTypes: [
          'ID3v2.3',
          'ID3v1.1'
        ]
      },
      year: 2009,
      __v: 0,
      queueId: 906808831264,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            168594.2857142857
          ]
        },
        _src: 'uploads/audio/b8dfa4ad-6b33-4716-adad-097b26c4c18e.mp3',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 168.59428571428572,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1011,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 2,
        of: null
      },
      disk: {
        no: null,
        of: null
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/877ae60a-ed41-45f0-bdda-fe66abfa7e2f.jpeg'
      },
      file: {
        originalname: '02 Andy\'s Chest.mp3',
        mimetype: 'audio/mp3',
        path: 'uploads/audio/985304fe-3809-4e4b-81c2-2e699d4589bb.mp3',
        size: 4030895
      },
      title: 'Andy\'s Chest',
      genre: [
        'Glam',
        'Rock'
      ],
      _id: '5beff8effe5a9e3afc37bb44',
      artist: {
        name: 'Lou Reed',
        _id: '5beff8effe5a9e3afc37bb3f'
      },
      album: {
        title: 'Transformer',
        _id: '5beff8effe5a9e3afc37bb40'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        lossless: false,
        dataformat: 'mp3',
        bitrate: 160000,
        sampleRate: 44100,
        numberOfChannels: 2,
        codecProfile: 'CBR',
        numberOfSamples: 8849664,
        duration: 200.67265306122448,
        tagTypes: [
          'ID3v2.3',
          'ID3v1.1'
        ]
      },
      year: 2007,
      __v: 0,
      queueId: 321923790412,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            200489.79591836734
          ]
        },
        _src: 'uploads/audio/985304fe-3809-4e4b-81c2-2e699d4589bb.mp3',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 200.48979591836735,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1012,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 10,
        of: 16
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/5756bdc2-6984-4354-8a87-6ee370636cf1.jpeg'
      },
      file: {
        originalname: '10 Clocked In.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/c8db2f4d-8ef7-4b09-bd8d-61c828773eb8.m4a',
        size: 3571894
      },
      title: 'Clocked In',
      genre: [
        'Hardcore',
        'Punk',
        'Rock'
      ],
      _id: '5bef7e41a364f51aec54ddee',
      artist: {
        name: 'Black Flag',
        _id: '5bef7e41a364f51aec54dde1'
      },
      album: {
        title: 'The First Four Years',
        _id: '5bef7e41a364f51aec54dde2'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 93.36743764172336,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 1988,
      __v: 0,
      queueId: 1262136590906,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            93319.54648526077
          ]
        },
        _src: 'uploads/audio/c8db2f4d-8ef7-4b09-bd8d-61c828773eb8.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 93.31954648526077,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1013,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 2,
        of: 12
      },
      disk: {
        no: null,
        of: null
      },
      image: {
        format: 'png',
        src: './uploads/images/b25dc327-1045-4e5a-8222-a9a7cc2403c5.png'
      },
      file: {
        originalname: '02 Chasing My Mind V1.mp3',
        mimetype: 'audio/mp3',
        path: 'uploads/audio/f06359c5-6ded-42e2-9bd3-5fc03e94a030.mp3',
        size: 4928946
      },
      title: 'Chasing My Mind V1',
      genre: [],
      _id: '5bef7e6ea364f51aec54de14',
      artist: {
        name: 'Holograms',
        _id: '5bef7e6ea364f51aec54de0e'
      },
      album: {
        title: 'Unknown',
        _id: '5bef7e6ea364f51aec54de12'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        lossless: false,
        dataformat: 'mp3',
        bitrate: 256000,
        sampleRate: 44100,
        numberOfChannels: 2,
        encoder: 'LAME 3.96.1',
        codecProfile: 'CBR',
        numberOfSamples: 6663168,
        duration: 151.09224489795918,
        tagTypes: [
          'ID3v2.2'
        ]
      },
      year: null,
      __v: 0,
      queueId: 701846580341,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            151118.3673469388
          ]
        },
        _src: 'uploads/audio/f06359c5-6ded-42e2-9bd3-5fc03e94a030.mp3',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 151.11836734693878,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1014,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 11,
        of: 15
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/6cf35b60-7a0b-46d0-a366-db0d77508da6.jpeg'
      },
      file: {
        originalname: '11 Car Thief.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/ec221bad-278e-46c0-a10e-61d1cd115e69.m4a',
        size: 7370833
      },
      title: 'Car Thief',
      genre: [
        'Hardcore Hip-Hop',
        'Boom Bap',
        'Hip Hop/Rap'
      ],
      _id: '5bef7e3ca364f51aec54dddc',
      artist: {
        name: 'Beastie Boys',
        _id: '5bef7e3ba364f51aec54ddce'
      },
      album: {
        title: 'Paul\'s Boutique',
        _id: '5bef7e3ca364f51aec54ddcf'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 219.6607709750567,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2009,
      __v: 0,
      queueId: 952827239296,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            219660
          ]
        },
        _src: 'uploads/audio/ec221bad-278e-46c0-a10e-61d1cd115e69.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 219.66,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1015,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 1,
        of: 11
      },
      disk: {
        no: null,
        of: null
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/fc97be5f-8c05-4369-aa91-527fdf6f0da4.jpeg'
      },
      file: {
        originalname: '01 Do What You Want.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/b15843e4-c87d-4052-a832-26ed25d0ecef.m4a',
        size: 7270162
      },
      title: 'Do What You Want',
      genre: [
        'Garage Rock'
      ],
      _id: '5beffa8efe5a9e3afc37bb52',
      artist: {
        name: 'Makeouts',
        _id: '5beffa8efe5a9e3afc37bb4e'
      },
      album: {
        title: 'In a Strange Land',
        _id: '5beffa8efe5a9e3afc37bb4f'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 219.3124716553288,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2010,
      __v: 0,
      queueId: 901132237446,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            219264.5804988662
          ]
        },
        _src: 'uploads/audio/b15843e4-c87d-4052-a832-26ed25d0ecef.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 219.26458049886622,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1016,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 12,
        of: null
      },
      disk: {
        no: null,
        of: null
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/8352a2ef-ff8d-4a8b-8301-f910e112f0cd.jpeg'
      },
      file: {
        originalname: '12 Do the Make-Up.mp3',
        mimetype: 'audio/mp3',
        path: 'uploads/audio/9d00accd-3704-4795-a1f1-aaaceb18431d.mp3',
        size: 4577952
      },
      title: 'Do the Make-Up',
      genre: [
        'Garage Rock',
        'Punk',
        'Rock'
      ],
      _id: '5bef7e75a364f51aec54de41',
      artist: {
        name: 'Hunx and His Punx',
        _id: '5bef7e75a364f51aec54de33'
      },
      album: {
        title: 'Gay Singles',
        _id: '5bef7e75a364f51aec54de34'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        lossless: false,
        dataformat: 'mp3',
        bitrate: 320000,
        sampleRate: 44100,
        numberOfChannels: 2,
        codecProfile: 'CBR',
        numberOfSamples: 5044608,
        duration: 114.39020408163265,
        tagTypes: [
          'ID3v2.3',
          'ID3v1.1'
        ]
      },
      year: 2009,
      __v: 0,
      queueId: 418068328294,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            114390.20408163265
          ]
        },
        _src: 'uploads/audio/9d00accd-3704-4795-a1f1-aaaceb18431d.mp3',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 114.39020408163265,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1017,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 5,
        of: null
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/eed61ac2-b19e-46ab-a8c0-4dd351ed3027.jpeg'
      },
      file: {
        originalname: '05 Freakin Out.mp3',
        mimetype: 'audio/mp3',
        path: 'uploads/audio/b8dfa4ad-6b33-4716-adad-097b26c4c18e.mp3',
        size: 4068056
      },
      title: 'Freakin Out',
      genre: [
        'Garage Rock',
        'Punk',
        'Rock'
      ],
      _id: '5bef7e58a364f51aec54de07',
      artist: {
        name: 'Death',
        _id: '5bef7e57a364f51aec54ddff'
      },
      album: {
        title: 'For The Whole World To See',
        _id: '5bef7e57a364f51aec54de00'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        lossless: false,
        dataformat: 'mp3',
        bitrate: 192000,
        sampleRate: 44100,
        numberOfChannels: 2,
        codecProfile: 'CBR',
        numberOfSamples: 7435008,
        duration: 168.59428571428572,
        tagTypes: [
          'ID3v2.3',
          'ID3v1.1'
        ]
      },
      year: 2009,
      __v: 0,
      queueId: 439048793407,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            168594.2857142857
          ]
        },
        _src: 'uploads/audio/b8dfa4ad-6b33-4716-adad-097b26c4c18e.mp3',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 168.59428571428572,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1018,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 6,
        of: 8
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpg',
        src: './uploads/images/c877be5e-a226-4eb7-8fb1-486e981d1eb4.jpg'
      },
      file: {
        originalname: '06 Funny Little Man.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/15d4f4a7-6602-4fc6-be04-8efbf55fda3b.m4a',
        size: 7799988
      },
      title: 'Funny Little Man',
      genre: [
        'Electronica'
      ],
      _id: '5bef7e31a364f51aec54ddcb',
      artist: {
        name: 'Aphex Twin',
        _id: '5bef7e31a364f51aec54ddc3'
      },
      album: {
        title: 'Come To Daddy [EP]',
        _id: '5bef7e31a364f51aec54ddc4'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 238.42249433106576,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 1997,
      __v: 0,
      queueId: 948045097407,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            238374.6031746032
          ]
        },
        _src: 'uploads/audio/15d4f4a7-6602-4fc6-be04-8efbf55fda3b.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 238.37460317460318,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1019,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 2,
        of: 12
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/ffebf7db-b660-4464-9bb2-cb468bc5b00d.jpeg'
      },
      file: {
        originalname: '02 I Know, I Know.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/a6cbed25-2298-4f67-ab3b-b38eecd8cfad.m4a',
        size: 3975308
      },
      title: 'I Know, I Know',
      genre: [
        'Garage Rock',
        'Punk',
        'Alternative'
      ],
      _id: '5beffb27fe5a9e3afc37bb62',
      artist: {
        name: 'Nobunny',
        _id: '5beffb27fe5a9e3afc37bb5d'
      },
      album: {
        title: 'Love Visions',
        _id: '5beffb27fe5a9e3afc37bb5e'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 110.10902494331066,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2008,
      __v: 0,
      queueId: 1495838586386,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            110061.13378684808
          ]
        },
        _src: 'uploads/audio/a6cbed25-2298-4f67-ab3b-b38eecd8cfad.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 110.06113378684807,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1020,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 3,
        of: null
      },
      disk: {
        no: null,
        of: null
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/8352a2ef-ff8d-4a8b-8301-f910e112f0cd.jpeg'
      },
      file: {
        originalname: '03 Hey Rocky.mp3',
        mimetype: 'audio/mp3',
        path: 'uploads/audio/2e55a26f-fcd9-4bef-9378-bb4ed1901520.mp3',
        size: 4980232
      },
      title: 'Hey Rocky',
      genre: [
        'Garage Rock',
        'Punk',
        'Rock'
      ],
      _id: '5bef7e75a364f51aec54de38',
      artist: {
        name: 'Hunx and His Punx',
        _id: '5bef7e75a364f51aec54de33'
      },
      album: {
        title: 'Gay Singles',
        _id: '5bef7e75a364f51aec54de34'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        lossless: false,
        dataformat: 'mp3',
        bitrate: 320000,
        sampleRate: 44100,
        numberOfChannels: 2,
        codecProfile: 'CBR',
        numberOfSamples: 5488128,
        duration: 124.44734693877551,
        tagTypes: [
          'ID3v2.3',
          'ID3v1.1'
        ]
      },
      year: 2009,
      __v: 0,
      queueId: 821252865464,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            124447.3469387755
          ]
        },
        _src: 'uploads/audio/2e55a26f-fcd9-4bef-9378-bb4ed1901520.mp3',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 124.44734693877551,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1021,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    },
    {
      order: {
        no: 8,
        of: 15
      },
      disk: {
        no: 1,
        of: 1
      },
      image: {
        format: 'jpeg',
        src: './uploads/images/6cf35b60-7a0b-46d0-a366-db0d77508da6.jpeg'
      },
      file: {
        originalname: '08 Hey Ladies.m4a',
        mimetype: 'audio/x-m4a',
        path: 'uploads/audio/4725abd6-5f59-436c-aeb1-ed4cb703622f.m4a',
        size: 7621266
      },
      title: 'Hey Ladies',
      genre: [
        'Hardcore Hip-Hop',
        'Boom Bap',
        'Hip Hop/Rap'
      ],
      _id: '5bef7e3ca364f51aec54ddd9',
      artist: {
        name: 'Beastie Boys',
        _id: '5bef7e3ba364f51aec54ddce'
      },
      album: {
        title: 'Paul\'s Boutique',
        _id: '5bef7e3ca364f51aec54ddcf'
      },
      userId: '5b135adb82c23f0e28dad77f',
      format: {
        sampleRate: 44100,
        duration: 227.43945578231293,
        tagTypes: [
          'iTunes MP4'
        ]
      },
      year: 2009,
      __v: 0,
      queueId: 721366297663,
      howl: {
        _orientation: [
          1,
          0,
          0
        ],
        _stereo: null,
        _pos: null,
        _pannerAttr: {
          coneInnerAngle: 360,
          coneOuterAngle: 360,
          coneOuterGain: 0,
          distanceModel: 'inverse',
          maxDistance: 10000,
          panningModel: 'HRTF',
          refDistance: 1,
          rolloffFactor: 1
        },
        _onstereo: [],
        _onpos: [],
        _onorientation: [],
        _autoplay: false,
        _html5: false,
        _muted: false,
        _loop: false,
        _pool: 5,
        _preload: true,
        _rate: 1,
        _sprite: {
          __default: [
            0,
            227438.3446712018
          ]
        },
        _src: 'uploads/audio/4725abd6-5f59-436c-aeb1-ed4cb703622f.m4a',
        _volume: 1,
        _xhrWithCredentials: false,
        _duration: 227.4383446712018,
        _state: 'loaded',
        _sounds: [
          {
            _parent: '[CIRCULAR]',
            _orientation: [
              1,
              0,
              0
            ],
            _stereo: null,
            _pos: null,
            _pannerAttr: {
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              panningModel: 'HRTF',
              refDistance: 1,
              rolloffFactor: 1
            },
            _muted: false,
            _loop: false,
            _volume: 1,
            _rate: 1,
            _seek: 0,
            _paused: true,
            _ended: true,
            _sprite: '__default',
            _id: 1022,
            _node: {
              paused: true
            }
          }
        ],
        _endTimers: {},
        _queue: [],
        _playLock: false,
        _onend: [
          {}
        ],
        _onfade: [],
        _onload: [],
        _onloaderror: [],
        _onplayerror: [],
        _onpause: [
          {}
        ],
        _onplay: [
          {}
        ],
        _onstop: [],
        _onmute: [],
        _onvolume: [],
        _onrate: [],
        _onseek: [],
        _onresume: [],
        _webAudio: true
      }
    }];