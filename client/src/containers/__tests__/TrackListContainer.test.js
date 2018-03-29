import React from 'react';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import {TrackListContainer} from '../TrackListContainer';
import { shallow } from 'enzyme';

describe('TrackListContainer', () => {
	const mockStore = configureStore([reduxThunk]);
	let store;
	let wrapper;
	const mockGetTracks = jest.fn();

	beforeEach(() => {	
		const INITIAL_STATE = {
			trackList: {
				fetchingTracks: false,
				tracks: [],
				selectedTrack: null,
				error: false
			},
			player: {
				queue: [],
				howl: null,
				playing: false,
				queueIndex: null,
				currentTrack: null
			}
		};
		store = mockStore(INITIAL_STATE).getState()
		wrapper = shallow(
			<TrackListContainer 
				trackList={store.trackList}
				player={store.player}
				getTracks={mockGetTracks}
			/>
		);

	});

	it('should call mock getTracks function when rendered', () => {
		expect(mockGetTracks.mock.calls.length).toBe(1)
	});
});