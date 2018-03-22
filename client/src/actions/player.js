import { 
	PLAY_TRACK,
	PAUSE_TRACK,
	STOP_TRACK,
} from '../actiontypes';

export const playTrack = () => {
	return dispatch => {
		dispatch({
			type: PLAY_TRACK
		});
	};
}

export const pauseTrack = () => {
	return dispatch => {
		dispatch({
			type: PAUSE_TRACK
		});
	};
}

export const stopTrack = () => {
	return dispatch => {
		dispatch({
			type: STOP_TRACK
		});
	};
}


