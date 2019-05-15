import React from 'react';
import { mount, shallow } from 'enzyme';

import PlayerContainer from 'containers/PlayerContainer';
import Player from 'components/Player';
import PlayerBar from 'components/Player/PlayerBar';
import PlayerProgress from 'components/Player/PlayerProgress';
import PlayerControls from 'components/Player/PlayerControls';
import QueueList from 'components/Player/QueueList';
import Root from 'Root';
import { mockQueue } from 'utils';

describe('Player component', () => {
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
				<PlayerContainer>
					<Player />
				</PlayerContainer>
			</Root>
		);

	});

	it('has a PlayerBar', () => {
		console.log(wrapper.contains(PlayerBar))
		expect(wrapper.contains(PlayerBar)).toBe(true);
	});
});