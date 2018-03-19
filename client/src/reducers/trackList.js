import {
	FETCH_TRACKS,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACKS_FAILURE
} from '../actiontypes';

const INITIAL_STATE = {};
const trackList = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_TRACKS:
			return {
				...state,
				fetchingTracks: true
			}

		case FETCH_TRACKS_SUCCESS:
			return {
				...state,
				fetchingTracks: false,
				tracks: action.tracks
			}

		case FETCH_TRACKS_FAILURE:
			return {
				...state,
				fetchingTracks: false,
				error: action.error
			}

		default:
			return state;
	}
};

export default trackList;