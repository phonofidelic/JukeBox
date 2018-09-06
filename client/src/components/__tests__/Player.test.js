import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { createRender } from '@material-ui/core/test-utils';

import Player from '../Player';
import { INITIAL_STATE } from '../../reducers/player.reducer';
import { THEME } from '../../config';
import { testTrack } from '../../utils';

describe('Player', () => {
	let props;
	let mountedPlayer;

	const player = props => {
		if (!mountedPlayer) {
			mountedPlayer = mount(
				<Player {...props} />
			);
		}
		return mountedPlayer;
	}

	beforeEach(() => {
		props = {
			player: INITIAL_STATE,
			selectedTrack: null,
			userAgentIsMobile: false,
			handlePlayTrack: jest.fn(),
			handlePauseTrack: jest.fn(),
			handleStopTrack: jest.fn(),
			handlePlayNext: jest.fn(),
			handlePlayPrev: jest.fn(),
			handleToggleQueue: jest.fn(),
			handlePlayFromQueue: jest.fn(),
			handleSeek: jest.fn(),
			theme: THEME
		};

		mountedPlayer = undefined;
	});

	it('always renders a container div', () => {
		const divs = player(props).find('div');

		expect(divs.length).toBeGreaterThan(0);
	});

	it('(desktop mode) renders correctly when no tracks are loaded', () => {
		const tree = renderer
			.create( <Player {...props} />)
			.toJSON();
		const playerProgress = player(props).find('PlayerProgress');
		const playerControls = player(props).find('PlayerControls');
		const queueList = player(props).find('QueueList');

		expect(playerProgress.length).toBe(1);
		expect(playerControls.length).toBe(1);
		expect(queueList.length).toBe(1);
		expect(tree).toMatchSnapshot();
	});

	it('(desktop mode) renders correctly when a track is playing', () => {
		props.player.tracks = [ testTrack() ];
		props.player.currentTrack = testTrack();
		props.player.playing = true;

		const tree = renderer
			.create(<Player {...props} />)
			.toJSON();
		const playerProgress = player(props).find('PlayerProgress');
		const playerControls = player(props).find('PlayerControls');
		const queueList = player(props).find('QueueList');

		expect(playerProgress.length).toBe(1);
		expect(playerControls.length).toBe(1);
		expect(queueList.length).toBe(1);

		expect(tree).toMatchSnapshot();
	});

	it('(desktop mode) renders correctly when a track paused', () => {
		props.player.tracks = [ testTrack() ];
		props.player.currentTrack = testTrack();
		props.player.playing = false;
		props.player.pausedAt = 500;

		const tree = renderer
			.create(<Player {...props} />)
			.toJSON();
		const playerProgress = player(props).find('PlayerProgress');
		const playerControls = player(props).find('PlayerControls');
		const queueList = player(props).find('QueueList');

		expect(playerProgress.length).toBe(1);
		expect(playerControls.length).toBe(1);
		expect(queueList.length).toBe(1);

		expect(tree).toMatchSnapshot();
	});

	it('(mobile mode) renders correctly when no tracks are loaded', () => {
		props.userAgentIsMobile = true;
		const tree = renderer
			.create( <Player {...props} />)
			.toJSON();
		const playerProgress = player(props).find('PlayerProgress');
		const playerControls = player(props).find('PlayerControls');
		const queueList = player(props).find('QueueList');

		expect(playerProgress.length).toBe(1);
		expect(playerControls.length).toBe(1);
		expect(queueList.length).toBe(1);

		expect(tree).toMatchSnapshot();
	});

	it('(mobile mode) renders correctly when a track is playing', () => {
		props.userAgentIsMobile = true;
		props.player.tracks = [ testTrack() ];
		props.player.currentTrack = testTrack();
		props.player.playing = true;

		const tree = renderer
			.create(<Player {...props} />)
			.toJSON();
		const playerProgress = player(props).find('PlayerProgress');
		const playerControls = player(props).find('PlayerControls');
		const queueList = player(props).find('QueueList');

		expect(playerProgress.length).toBe(1);
		expect(playerControls.length).toBe(1);
		expect(queueList.length).toBe(1);

		expect(tree).toMatchSnapshot();
	});

	it('(mobile mode) renders correctly when a track paused', () => {
		props.userAgentIsMobile = true;
		props.player.tracks = [ testTrack() ];
		props.player.currentTrack = testTrack();
		props.player.playing = false;
		props.player.pausedAt = 500;

		const tree = renderer
			.create(<Player {...props} />)
			.toJSON();
		const playerProgress = player(props).find('PlayerProgress');
		const playerControls = player(props).find('PlayerControls');
		const queueList = player(props).find('QueueList');

		expect(playerProgress.length).toBe(1);
		expect(playerControls.length).toBe(1);
		expect(queueList.length).toBe(1);

		expect(tree).toMatchSnapshot();
	});
});