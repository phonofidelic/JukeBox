import React from 'react';
import ReactDOM from 'react-dom';
import TrackListItem from '../TrackListItem';
import { shallow, mount } from 'enzyme';

// describe('TrackList Component', () => {
// 	it('renders without crashing', () => {
// 		shallow(<TrackListItem track={{}} />);
// 	});

// 	it('renders \'controls\' child component if selected', () => {
// 		const wrapper = shallow(
// 			<TrackListItem 
// 				track={{_id: 1}} 
// 				selectedTrack={{_id: 1}} 
// 				queue={[{}]}
// 			/>
// 		);
// 		expect(wrapper.children().length).toBe(1);
// 	});

// 	it('calls handler functions when control buttons are clicked and queue is not empty', () => {
// 		const mockHandleStartNewQueue = jest.fn();
// 		const mockHandleAddToQueue = jest.fn();
// 		const wrapper = mount(
// 			<TrackListItem 
// 				track={{_id: 1}} 
// 				selectedTrack={{_id: 1}}
// 				queue={[{}]}
// 				handleSelectTrack={jest.fn()}
// 				handleStartNewQueue={mockHandleStartNewQueue}
// 				handleAddToQueue={mockHandleAddToQueue}
// 			/>
// 		);
// 		wrapper.find('button').forEach(button => {
// 			button.simulate('click');
// 		});
// 		expect(mockHandleStartNewQueue.mock.calls.length).toBe(1);
// 		expect(mockHandleAddToQueue.mock.calls.length).toBe(1);
// 		wrapper.unmount();
// 	});
// });

// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
describe('TrackListItem', () => {
	let props;
	let mountedTrackListItem;
	const trackListItem = () => {
		if (!mountedTrackListItem) {
			mountedTrackListItem = mount(
				<TrackListItem {...props} />
			);
		}
		return mountedTrackListItem;
	}

	beforeEach(() => {
		props = {
			track: {},
			// player: undefined,
			// selectedTrack: undefined,
			// handleSelectTrack: undefined,
			// handlePostTrackData: undefined,
			// handleStartNewQueue: undefined,
			// handleAddToQueue: undefined,
			// handleDeleteTrack: undefined,
			// handleToggleEditMode: undefined,
			// theme: undefined
		}
	});

	it('always renders a li', () => {
		const li = trackListItem().find('li');
		expect(li.length).toBeGreaterThan(0);
	})
});
