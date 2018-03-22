import {
	FETCH_TRACKS,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACKS_FAILURE,
	SELECT_TRACK,
	START_NEW_QUE,
	ADD_TRACK_TO_QUE
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
				error: {message: 'Could not fetch tracks'} // TODO: get message from server response
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

export const startNewQue = track => {
	console.log('startNewQue, track:', track.file.path)
	return dispatch => {
		dispatch({
			type: START_NEW_QUE,
			trackUrl: track.file.path
		});
	};
}


export const addToQue = track => {
	return dispatch => {
		dispatch({
			type: ADD_TRACK_TO_QUE,
			trackUrl: track.file.path
		});
	};
}