import React from 'react';
import ReactDOM from 'react-dom';
import Player from '../Player';
import { shallow, mount } from 'enzyme';

// describe('Player', () => {
// 	it('renders an empty Player component when no tracks are in queue', () => {
// 		expect(
// 			shallow(<Player queue={[]} />)
// 			.children()
// 			.exists()
// 		).toBeFalsy();
// 	});

// 	// Check that the component uses it's props. 
// 	// Test the conected container to check that props are passed.
// 	// it('has props', () => {
// 	// 	const wrapper = shallow(<Player queue={[{}]} />);
// 	// 	console.log('[LOG]', wrapper.instance().props)
// 	// });

// 	it('renders 4 button controlls when tracks are in queue', () => {
// 		const wrapper = shallow(<Player queue={[{}]} />);
// 		expect(wrapper.find('button').length).toBe(4);
// 	});
// });

// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
describe('Player', () => {
	let props;
	let mountedPlayer;
	const player = () => {
		if (!mountedPlayer) {
			mountedPlayer = mount(
				<Player {...props} />
			);
		}
		return mountedPlayer;
	}

	beforeEach(() => {
		props = {
			player: {queue:[]},
			// handleStopTrack: undefined,
			// handlePlayTrack: undefined,
			// handlePauseTrack: undefined,
			// handlePlayPrev: undefined,
			// handlePlayNext: undefined,
			// handleToggleQueue: undefined
		};

		mountedPlayer = undefined;
	});

	it('should always render a div', () => {
		const divs = player().find('div');
		expect(divs.length).toBeGreaterThan(0);
	});

	// // BUG: unable to test this because:
	// // 			TypeError: Cannot read property 'queueId' of undefined
	// // 			QueuList needs to be rendered with queue prop?
	// // describe('the rendered div', () => {
	// 	it('contains contents of Player', () => {
	// 		const divs = player().find('div');
	// 		const wrappingDiv = divs.first();
	// 		console.log('[LOG], player().children():', player().children())
	// 		console.log('[LOG], wrappingDiv.children():', wrappingDiv.children())

	// 		expect(wrappingDiv.children()).toEqual(player().children());
	// 	});
	// });
});
