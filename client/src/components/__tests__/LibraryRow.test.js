xit()
// import React from 'react';
// import { mount, shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import { createRender, createShallow } from '@material-ui/core/test-utils';
// import {LibraryRow} from '../LibraryRow';
// import { INITIAL_STATE } from '../../reducers/player.reducer';
// import { THEME } from '../../config'

// const ObjectId = id => id;

// const testTrack = {
//     "_id" : ObjectId("5b84b519dcc5929d48879b95"),
//     "order" : {
//         "no" : 3,
//         "of" : 4
//     },
//     "image" : {
//         "format" : "png",
//         "src" : "defaultImage"
//     },
//     "file" : {
//         "originalname" : "93eb5cb3-59bf-4001-9590-f5e54560339e.mp3",
//         "path" : "uploads/audio/2961a766-db18-4dc8-aa43-10b0191c9fd6.mp3",
//         "size" : 1822637,
//         "mimetype" : "audio/mp3"
//     },
//     "title" : "Army Life",
//     "genre" : [],
//     "userId" : ObjectId("5b39abf37744c81d7c39bb74"),
//     "artist" : ObjectId("5b84b519dcc5929d48879b92"),
//     "album" : ObjectId("5b84b519dcc5929d48879b93"),
//     "format" : {
//         "lossless" : false,
//         "dataformat" : "mp3",
//         "bitrate" : 128000,
//         "sampleRate" : 44100,
//         "numberOfChannels" : 2,
//         "codecProfile" : "CBR",
//         "numberOfSamples" : 5012352,
//         "duration" : 113.658775510204,
//         "tagTypes" : [ 
//             "ID3v2.2"
//         ]
//     },
//     "__v" : 0
// }

// describe('LibraryRow', () => {
// 	let props;
// 	let mountedLibraryRow;
// 	let muiRenderer;
// 	let muiShallow;

// 	const libraryRow = props => {
// 		if (!mountedLibraryRow) {
// 			mountedLibraryRow = mount(<LibraryRow {...props} />);
// 		}
// 		return mountedLibraryRow;
// 	};

// 	beforeEach(() => {
// 		// console.log('### INITIAL_STATE:', INITIAL_STATE)
// 		props = {
// 			track: testTrack,
// 			player: INITIAL_STATE,
// 			selectedTrack: null,
// 			handleSelectTrack: jest.fn(),
// 			handleEditTrackData: jest.fn(),
// 			handleStartNewQueue: jest.fn(),
// 			handleAddToQueue: jest.fn(),
// 			handleOpenDetailView: jest.fn(),
// 			theme: THEME
// 		};
		
// 		mountedLibraryRow = undefined;
// 		muiRenderer = createRender();
// 		muiShallow = createShallow();
// 	});
	
// 	it('renders correctly', () => {
// 		const tree = createShallow(<LibraryRow {...props} />);
// 		// const tree = renderer
// 		// 	.create(<LibraryRow {...props} />)
// 		// 	.toJSON();
// 		const trs = libraryRow(props).find('TableRow');
// 		console.log('### trs:', trs)
		
// 		expect(tree).toMatchSnapshot();
// 		expect(trs).toHaveLength(1)
// 	});

// 	it('renderes correctly when selected', () => {
// 		props.selectedTrack = testTrack;

// 		const tree = muiShallow(<LibraryRow {...props} />);

// 		expect(tree).toMatchSnapshot();
// 	})
// });
