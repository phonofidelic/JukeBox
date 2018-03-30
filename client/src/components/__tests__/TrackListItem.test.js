import React from 'react';
import ReactDOM from 'react-dom';
import TrackListItem from '../TrackListItem';
import { shallow, mount } from 'enzyme';

describe('TrackList Component', () => {
	it('renders without crashing', () => {
		shallow(<TrackListItem track={{}} />);
	});

	it('renders \'controlls\' child component if selected', () => {
		const wrapper = shallow(
			<TrackListItem 
				track={{_id: 1}} 
				selectedTrack={{_id: 1}} 
				queue={[{}]}
			/>
		);
		expect(wrapper.children().length).toBe(1);
	});

	it('calls handler functions when controll buttons are clicked and queue is not empty', () => {
		const mockHandleStartNewQueue = jest.fn();
		const mockHandleAddToQueue = jest.fn();
		const wrapper = mount(
			<TrackListItem 
				track={{_id: 1}} 
				selectedTrack={{_id: 1}}
				queue={[{}]}
				handleSelectTrack={jest.fn()}
				handleStartNewQueue={mockHandleStartNewQueue}
				handleAddToQueue={mockHandleAddToQueue}
			/>
		);
		wrapper.find('button').forEach(button => {
			button.simulate('click');
		});
		expect(mockHandleStartNewQueue.mock.calls.length).toBe(1);
		expect(mockHandleAddToQueue.mock.calls.length).toBe(1);
		wrapper.unmount();
	});
});