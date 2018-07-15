import {
	LOAD_LIBRARY,
	FETCH_TRACKS,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACKS_FAILURE,
	SELECT_TRACK,
	START_NEW_QUEUE,
	ADD_TRACK_TO_QUEUE,
	POST_TRACK_DATA,
	POST_TRACK_DATA_SUCCESS,
	POST_TRACK_DATA_FAILURE,
	DELETE_TRACK,
	DELETE_TRACK_CONFIRM,
	DELETE_TRACK_CANCEL,
	DELETE_TRACK_SUCCESS,
	DELETE_TRACK_FAILURE,
	ORDER_TRACKS_BY_FIELD_VALUE,
	SET_MESSAGE,
	CLEAR_MESSAGE
} from '../actiontypes';
import axios from 'axios';
import { Howl } from 'howler';
import { URLS } from '../config';

const TRACKS_URL = URLS.TRACKS_URL;

export const loadLibrary = () => {
	console.log('loadLibrary called')
	return dispatch => {
		dispatch({
			type: LOAD_LIBRARY
		});

		axios.get('/library')
		.then(response => {
			console.log('loadLibrary response:', response);;
		})
		.catch(err => {
			console.error(err);
		});
	}
}

export const getTracks = () => {
	return dispatch => {
		dispatch({
			type: FETCH_TRACKS
		});

		axios.get(`${TRACKS_URL}`, { 
			headers: { 
				token: localStorage.getItem('JWT'),
				userId: localStorage.getItem('userId')
			} 
		})
		.then(response => {
			console.log('getTracks response:', response);
			const message = { text: 'Tracks loaded!', context: 'info'};
			dispatch({
				type: FETCH_TRACKS_SUCCESS,
				tracks: response.data.tracks,
				message: message
			});
			// dispatch({
			// 	type: SET_MESSAGE,
			// 	message: message
			// });
		})
		.catch(err => {
			console.error(err);
			dispatch({
				type: FETCH_TRACKS_FAILURE,
				message: {text: 'Could not fetch tracks', context: 'danger'},
				error: {message: 'Could not fetch tracks'} // TODO: get message from server response
			});
		});
	}
}

export const orderTracksByFieldValue = (fieldName) => {
	console.log('orderTracksByFieldValue, fieldName:', fieldName)
	return dispatch => {
		dispatch({
			type: ORDER_TRACKS_BY_FIELD_VALUE,
			fieldName: fieldName
		})
	}
}

export const selectTrack = track => {
	// console.log(track)
	return dispatch => {
		dispatch({
			type: SELECT_TRACK,
			selectedTrack: track
		});
	}
}

export const editTrack = (formData, trackData) => {
	console.log('@editTrack, formData', formData)
	return dispatch => {
		dispatch({
			type: POST_TRACK_DATA,
		});
		axios.put(`${TRACKS_URL}/${trackData._id}`, formData, {
			headers: {
				token: localStorage.getItem('JWT'),
				userId: localStorage.getItem('userId')
			}
		})
		.then(response => {
			console.log('postTrackData response:', response)
			dispatch({
				type: POST_TRACK_DATA_SUCCESS,
				updatedTrack: response.data.data,
				message: {text: 'Track data saved!', context: 'success'} //TODO: return message from response
			});
			dispatch({
				type: SET_MESSAGE,
				message: {text: `${response.data.data.title} updated!`, context: 'success'}
			});
		})
		.catch(err => {
			console.error('postTrackData error:', err);
			dispatch({
				type: POST_TRACK_DATA_FAILURE,
				message: {text: 'Could not save changes', context: 'danger'}
			});
		});
	}
}

export const deleteTrack = () => {
	return dispatch => {
		dispatch({
			type: DELETE_TRACK
		});
	}
}

export const deleteTrackConfirm = trackData => {
	return dispatch => {
		dispatch({
			type: DELETE_TRACK_CONFIRM
		});
		axios.delete(`${TRACKS_URL}/${trackData._id}`, {
			headers: {
				token: localStorage.getItem('JWT'),
				userId: localStorage.getItem('userId')
			}
		})
		.then(response => {
			console.log('deleteTrack response:', response);
			dispatch({
				type: DELETE_TRACK_SUCCESS,
				deletedTrack: response.data.data,
				message: {text: 'Track was deleted', context: 'success'}
			});
			dispatch({
				type: SET_MESSAGE,
				message: {text: `${response.data.data.title} was deleted`, context: 'success'}
			})
		})
		.catch(err => {
			console.error('deleteTrack error:', err);
			dispatch({
				type: DELETE_TRACK_FAILURE,
				message: {text: 'Could not delete track', context: 'danger'},
				error: err
			});
		});
	}
}

export const deleteTrackCancel = () => {
	return dispatch => {
		dispatch({
			type: DELETE_TRACK_CANCEL
		});
	}
}
