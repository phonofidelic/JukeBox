import {
	FETCH_TRACKS,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACKS_FAILURE,
	SELECT_TRACK
} from '../actiontypes';
import axios from 'axios';
import config from '../config';

const TRACKS_URL = config.TRACKS_URL

export const getTracks = () => {
	return dispatch => {
		dispatch({
			type: FETCH_TRACKS
		});

		axios.get(TRACKS_URL)
		.then(response => {
			console.log('getTracks response:', response);
			dispatch({
				type: FETCH_TRACKS_SUCCESS,
				tracks: response.data.data,
				message: response.data.message
			});
		})
		.catch(err => {
			console.error(err);
			dispatch({
				type: FETCH_TRACKS_FAILURE,
				error: {message: 'Could not fetch tracks'}
			});
		});
	}
}

export const selectTrack = track => {
	return dispatch => {
		dispatch({
			type: SELECT_TRACK,
			selectedTrack: track
		});
	}
}