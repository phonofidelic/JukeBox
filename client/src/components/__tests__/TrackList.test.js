import React from 'react';
import ReactDOM from 'react-dom';
import TrackList from '../TrackList';
import { shallow, mount } from 'enzyme';

describe('TrackList Component', () => {
	it('renders without crashing', () => {

		shallow(<TrackList />);
	});

	it('renders track items when they exist', () => {
		const wrapper = mount(<TrackList tracks={[{_id: 1}, {_id: 2}]} />);
		expect(wrapper.find('li').length).toBe(2);
		wrapper.unmount()
	});
});