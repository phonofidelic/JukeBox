import {
	LOAD_LIBRARY,
	LOAD_LIBRARY_SUCCESS,
	LOAD_LIBRARY_FAILURE,
	SELECT_TRACK,
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
	FETCH_DETAIL_VIEW,
	FETCH_DETAIL_VIEW_SUCCESS,
	FETCH_DETAIL_VIEW_FAILURE,
	CLOSE_DETAIL_VIEW,
	DISMISS_LIBRARY_ERR,
} from '../actiontypes';
import { idbTrack } from '../utils/idbUtils';
import axios from 'axios';
import { URLS } from '../config';

const { TRACK_URL, ARTIST_URL, ALBUM_URL} = URLS;

export const loadLibrary = () => {
	// console.log('loadLibrary called')
	return async (dispatch) => {
		dispatch({
			type: LOAD_LIBRARY
		});
		// Ceck indexedDB for stored track data
		let tracks = await idbTrack.getAll();
		console.log('tdb tracks:', tracks)
		// If indexedDB is empty, fetch tracks from network
		if (!tracks || tracks.length < 1) {
			try {
				tracks = await axios.get('/library', {
					headers: { 
						token: localStorage.getItem('JWT'),
						userId: localStorage.getItem('userId')
					}
				});
				idbTrack.setAll(tracks);
				dispatch({
					type: LOAD_LIBRARY_SUCCESS,
					tracks: tracks,
				});
			} catch(err) {
				console.error(err);
				dispatch({
					type: LOAD_LIBRARY_FAILURE,
					data: err.response.data,
					status: err.response.status ,
					message: err.response.data.message || err.response.data, 
				});
			}
		}
		dispatch({
			type: LOAD_LIBRARY_SUCCESS,
			tracks: tracks,
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
				// message: {text: 'Could not save changes', context: 'danger'},
				data: err.response.data,
				status: err.response.status,
				message: err.response.data.message || err.response.data,
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

export const deleteTrackConfirm = track => {
	return dispatch => {
		dispatch({
			type: DELETE_TRACK_CONFIRM
		});
		axios.delete(`${TRACK_URL}/${track._id}`, {
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
				// message: {text: 'Could not delete track', context: 'danger'},
				data: err.response.data,
				status: err.response.status ,
				message: err.response.data.message || err.response.data, 
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
				type: FETCH_DETAIL_VIEW_SUCCESS,
				detailViewData: response.data.artist || response.data.album,
			});
		})
		.catch(err => {
			console.error('showDetailView error:', err);
			dispatch({
				type: FETCH_DETAIL_VIEW_FAILURE,
				data: err.response.data,
				status: err.response.status,
				message: err.response.data.message || err.response.data,
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
