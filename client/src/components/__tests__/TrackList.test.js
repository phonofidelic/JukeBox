import React from 'react';
import ReactDOM from 'react-dom';
import TrackList from '../TrackList';
import { shallow, mount } from 'enzyme';

// describe('TrackList Component', () => {
// 	it('renders without crashing', () => {

// 		shallow(<TrackList />);
// 	});

// 	it('renders track items when they exist', () => {
// 		const wrapper = mount(<TrackList tracks={[{_id: 1}, {_id: 2}]} />);
// 		expect(wrapper.find('li').length).toBe(2);
// 		wrapper.unmount()
// 	});
// });

// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
describe('TrackList', () => {
	let props;
	let mountedTrackList;
	const trackList = () => {
		if (!mountedTrackList) {
			mountedTrackList = mount(
				<TrackList {...props} />
			);
		}
		return mountedTrackList;
	}

	beforeEach(() => {
		props = {
			trackList: [{},{},{}],
			// theme: undefined
		};

		mountedTrackList = undefined;
	});

	it('always renders a ul', () => {
		const ul = trackList().find('ul');

		expect(ul.length).toBeGreaterThan(0);
	})
});