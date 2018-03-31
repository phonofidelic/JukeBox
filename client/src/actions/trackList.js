import {
	FETCH_TRACKS,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACKS_FAILURE,
	SELECT_TRACK,
	START_NEW_QUEUE,
	ADD_TRACK_TO_QUEUE
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

