import {
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
	SET_MESSAGE,
	CLEAR_MESSAGE
} from '../actiontypes';
import axios from 'axios';
import { Howl } from 'howler';
import { URLS } from '../config';

const TRACKS_URL = URLS.TRACKS_URL

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

export const selectTrack = track => {
	// console.log(track)
	return dispatch => {
		dispatch({
			type: SELECT_TRACK,
			selectedTrack: track
		});
	}
}

// // TODO: startNewQueue and addToQueue are player actions.
// // 			 Refactor to make this less confusing?
// export const startNewQueue = (track, currentTrack) => {
// 	// Unload and destroy the Howl object. This will immediately stop 
// 	// all sounds attached to this sound and remove it from the cache.
// 	console.log('startNewQueue, track', track);
// 	if (currentTrack) { currentTrack.howl.unload() };

// 	// This creates a queuItem by coppying the passed track item
// 	// and adding a queueId and howl prop.
// 	const queueId = Math.trunc(Math.random() * Date.now());

// 	return dispatch => {
// 		dispatch({
// 			type: START_NEW_QUEUE,
// 			track: { 
// 				...track, 
// 				queueId: queueId,
// 				howl: new Howl({ 
// 					src: [track.file.path], 
// 					autoplay: true,
// 					onplay: () => console.log('howl, onplay'),
// 					onpause: () => console.log('howl, onpause'),
// 					onend: () => console.log('howl, onend')
// 				})
// 			}
// 		});
// 	};
// }


// export const addToQueue = track => {
// 	// This creates a queuItem by coppying the passed track item
// 	// and adding a queueId and howl prop.
// 	const queueId = Math.trunc(Math.random() * Date.now());
// 	const message = { text: `Added ${track.title} to queue`, context: 'info' };
	
// 	return dispatch => {
// 		dispatch({
// 			type: ADD_TRACK_TO_QUEUE,
// 			track:{ 
// 				...track,
// 				queueId: queueId,
// 				howl: new Howl({ 
// 					src: [track.file.path], 
// 					// autoplay: true,
// 					onplay: () => console.log('howl, onplay'),
// 					onpause: () => console.log('howl, onpause'),
// 					onend: () => console.log('howl, onend')
// 				}) 
// 			},
// 			message: message
// 		});
// 		// !!! Is this an anti-pattern?
// 		dispatch({
// 			type: SET_MESSAGE,
// 			message: message
// 		});
// 	};
// }

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
