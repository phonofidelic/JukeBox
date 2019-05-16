import React from 'react';
import { mount, shallow } from 'enzyme';

import PlayerContainer from 'containers/PlayerContainer';
import Player from 'components/Player';
import PlayerProgress from 'components/Player/PlayerProgress';
import PlayerControls from 'components/Player/PlayerControls';
import QueueList from 'components/Player/QueueList';
import Root from 'Root';
import { mockQueue } from 'utils';

describe('Player container', () => {
	let wrapper 
	beforeEach(() => {
		const initialState = {
			player: {
				queue: mockQueue,
				showQueue: false,
				playing: false,
				queueIndex: null,
				currentTrack: mockQueue[0],
				time: 0,
				pausedAt: null,
				intervalId: null,
				message: null,
			}
		}
		wrapper = mount(
			<Root initialState={initialState}>
				<PlayerContainer />
			</Root>
		);

	});

	it('has a Player component', () => {
		expect(wrapper.contains(Player)).toBe(true);
	});

	it('has a PlayerProgress component', () => {
		expect(wrapper.contains(PlayerProgress)).toBe(true);
	});

	it('has a PlayerControls component', () => {
		expect(wrapper.contains(PlayerControls)).toBe(true);
	});

	it('has a PlayerControls component', () => {
		expect(wrapper.contains(PlayerControls)).toBe(true);
	});
});
