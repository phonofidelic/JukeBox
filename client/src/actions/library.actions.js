import {
	LOAD_LIBRARY,
	LOAD_LIBRARY_SUCCESS,
	LOAD_LIBRARY_FAILURE,
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
	SHOW_DETAIL_VIEW,
	FETCH_DETAIL_VIEW_FAILURE,
	FETCH_DETAIL_VIEW,
	CLOSE_DETAIL_VIEW,
	CLEAR_MESSAGE,
	DISMISS_LIBRARY_ERR,
} from '../actiontypes';
import axios from 'axios';
import { Howl } from 'howler';
import { URLS } from '../config';

const { TRACK_URL, ARTIST_URL, ALBUM_URL} = URLS;

export const loadLibrary = () => {
	// console.log('loadLibrary called')
	return dispatch => {
		dispatch({
			type: LOAD_LIBRARY
		});

		axios.get('/library', {
			headers: { 
				token: localStorage.getItem('JWT'),
				userId: localStorage.getItem('userId')
			}
		})
		.then(response => {
			console.log('loadLibrary response:', response);

			dispatch({
				type: LOAD_LIBRARY_SUCCESS,
				tracks: response.data.library[0],
				artists: response.data.library[1],
				albums: response.data.library[2]
			});
		})
		.catch(err => {
			console.error(err);
			dispatch({
				type: LOAD_LIBRARY_FAILURE,
				error: err.response
			});
		});
	}
}

export const getTracks = () => {
	return dispatch => {
		dispatch({
			type: FETCH_TRACKS
		});

		axios.get(`${TRACK_URL}`, { 
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
				error: err.response
			});
		});
	}
}

export const orderTracksByFieldValue = (fieldName, order) => {
	console.log('orderTracksByFieldValue, fieldName:', fieldName)
	return dispatch => {
		dispatch({
			type: ORDER_TRACKS_BY_FIELD_VALUE,
			fieldName: fieldName,
			order: order
		});
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
		axios.put(`${TRACK_URL}/${trackData._id}`, formData, {
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
				message: {text: 'Could not save changes', context: 'danger'},
				error: err.response
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
		axios.delete(`${TRACK_URL}/${trackData._id}`, {
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
				error: err.response
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

export const showDetailView = (id, type) => {
	return dispatch => {
		dispatch({
			type: FETCH_DETAIL_VIEW
		});

		axios.get(`${type === 'artist' ? ARTIST_URL : ALBUM_URL}/${id}`, {
			headers: { 
				token: localStorage.getItem('JWT'),
				userId: localStorage.getItem('userId')
			}
		})
		.then(response => {
			console.log('showDetailView, response:', response);
			dispatch({
				type: SHOW_DETAIL_VIEW,
				detailViewData: response.data.artist || response.data.album,
			});
		})
		.catch(err => {
			console.error('showDetailView error:', err);
			dispatch({
				type: FETCH_DETAIL_VIEW_FAILURE,
				error: err.response,
			})
		});
	}
}

export const closeDetailView = () => {
	console.log('closeDetailView')
	return dispatch => {
		dispatch({
			type: CLOSE_DETAIL_VIEW
		});
	}
}

export const dismissLibraryError = () => {
	return dispatch => {
		dispatch({
			type: DISMISS_LIBRARY_ERR
		})
	}
}
