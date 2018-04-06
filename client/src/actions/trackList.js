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
	DELETE_TRACK_FAILURE
} from '../actiontypes';
import axios from 'axios';
import { Howl } from 'howler';
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

// TODO: startNewQueue and addToQueue are player actions.
// 			 Refactor to make this less confusing?
export const startNewQueue = (track, currentTrack) => {
	// Unload and destroy the Howl object. This will immediately stop 
	// all sounds attached to this sound and remove it from the cache.
	console.log('startNewQueue, track', track);
	if (currentTrack) { currentTrack.howl.unload() };

	// This creates a queuItem by coppying the passed track item
	// and adding a queueId and howl prop.
	const queueId = Math.trunc(Math.random() * Date.now());

	return dispatch => {
		dispatch({
			type: START_NEW_QUEUE,
			track: { 
				...track, 
				queueId: queueId,
				howl: new Howl({ src: [track.file.path], autoplay: true })
			}
		});
	};
}


export const addToQueue = track => {
	// This creates a queuItem by coppying the passed track item
	// and adding a queueId and howl prop.
	const queueId = Math.trunc(Math.random() * Date.now());
	
	return dispatch => {
		dispatch({
			type: ADD_TRACK_TO_QUEUE,
			track:{ 
				...track,
				queueId: queueId,
				howl: new Howl({src: [track.file.path]}) 
			}
		});
	};
}

export const postTrackData = (formData, trackData) => {
	console.log('postTrackData, formData:', formData, 'trackData:', trackData);
	return dispatch => {
		dispatch({
			type: POST_TRACK_DATA,
		});
		axios.put(`${TRACKS_URL}/${trackData._id}`, formData)
		.then(response => {
			console.log('postTrackData response:', response)
			dispatch({
				type: POST_TRACK_DATA_SUCCESS,
				updatedTrack: response.data.data
			});
		})
		.catch(err => {
			console.error('postTrackData error:', err);
			dispatch({
				type: POST_TRACK_DATA_FAILURE,
				error: err
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
		axios.delete(`${TRACKS_URL}/${trackData._id}`)
		.then(response => {
			console.log('deleteTrack response:', response);
			dispatch({
				type: DELETE_TRACK_SUCCESS,
				deletedTrack: response.data.data
			})
		})
		.catch(err => {
			console.error('deleteTrack error:', err);
			dispatch({
				type: DELETE_TRACK_FAILURE,
				error: err
			});
		});
	}
}

export const deleteTrackCancel = () => {
	return dispatch => {
		dispatch({
			typr: DELETE_TRACK_CANCEL
		});
	}
}
