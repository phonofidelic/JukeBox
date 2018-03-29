import React from 'react';
import ReactDOM from 'react-dom';
import Player from '../Player';
import { shallow, mount } from 'enzyme';

describe('Player Component', () => {
	it('renders an empty Player component when no tracks are in queue', () => {
		expect(
			shallow(<Player queue={[]} />)
			.children()
			.exists()
		).toBeFalsy();
	});

	// Check that the component uses it's props. 
	// Test the conected container to check that props are passed.
	// it('has props', () => {
	// 	const wrapper = shallow(<Player queue={[{}]} />);
	// 	console.log('[LOG]', wrapper.instance().props)
	// });

	it('renders 4 button controlls when tracks are in queue', () => {
		const wrapper = shallow(<Player queue={[{}]} />);
		expect(wrapper.find('button').length).toBe(4);
	});
});