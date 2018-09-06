import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { createRender } from '@material-ui/core/test-utils';
import Player from '../Player';
import { INITIAL_STATE } from '../../reducers/player.reducer';
import { testTrack } from '../../utils';

describe('Player', () => {
	let props;

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
		}
	});

	it('renders correctly when no tracks are loaded', () => {
		const tree = renderer
			.create( <Player {...props} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('renders correctly when a track is playing', () => {
		props.player.tracks = [ testTrack() ];
		props.player.currentTrack = testTrack();
		props.player.playing = true;

		const tree = renderer
			.create(<Player {...props} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('renders correctly when a track paused', () => {
		props.player.tracks = [ testTrack() ];
		props.player.currentTrack = testTrack();
		props.player.playing = false;
		props.player.pausedAt = 500;

		const tree = renderer
			.create(<Player {...props} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});
});