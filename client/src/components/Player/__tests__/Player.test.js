import React from 'react';
import { mount, shallow } from 'enzyme';

import Player from 'components/Player';
import CurrentTrack from 'components/Player';
import ToggleQueueButton from 'components/Player';
import PlayerProgress from 'components/Player';
import PlayerControls from 'components/Player';
import QueueList from 'components/Player';
import { mockQueue } from 'utils';

const player = {
	queue: mockQueue,
	playing: false,
	queueIndex: null,
	currentTrack: mockQueue[0],
	time: 0,
	pausedAt: null,
	intervalId: null,
	message: null,
}

const	handlePlayTrack = jest.fn();
const	handlePauseTrack = jest.fn();
const	handleStopTrack = jest.fn();
const	handlePlayNext = jest.fn();
const	handlePlayPrev = jest.fn();
const	handlePlayFromQueue = jest.fn();
const	handleSeek = jest.fn();

describe('Player component desktop view', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(
			<Player
				player={ player }
				userAgentIsMobile={ false }
				handlePlayTrack={ handlePlayTrack }
				handlePauseTrack={ handlePauseTrack }
				handleStopTrack={ handleStopTrack }
				handlePlayNext={ handlePlayNext }
				handlePlayPrev={ handlePlayPrev }
				handlePlayFromQueue={ handlePlayFromQueue }
				handleSeek={ handleSeek }
			/>
		);
	});

	afterEach(() => {
		wrapper.unmount();
	});
	
	it('has one CurrentTrack component', () => {
		expect(wrapper.find(CurrentTrack).length).toBe(1);
	});

	it('has a PlayerProgress component', () => {
		expect(wrapper.find(PlayerProgress).length).toBe(1);
	});	

	it ('has a PlayerControls component', () => {
		expect(wrapper.find(PlayerControls).length).toBe(1);
	});

	it('has a QueueList component', () => {
		expect(wrapper.find(QueueList).length).toBe(1);
	});
});
