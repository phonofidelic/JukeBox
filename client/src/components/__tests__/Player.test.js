import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { createRender } from '@material-ui/core/test-utils';
import Player from '../Player';
import { INITIAL_STATE } from '../../reducers/player.reducer';

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

	it('renders correctly', () => {
		const tree = renderer
			.create( <Player {...props} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});
});