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

export const startNewQueue = (track, currentTrack) => {
	// Unload and destroy the Howl object. This will immediately stop 
	// all sounds attached to this sound and remove it from the cache.
	if (currentTrack) { currentTrack.unload() };
	return dispatch => {
		dispatch({
			type: START_NEW_QUEUE,
			trackUrl: track.file.path, // REMOVE
			track: { 
				...track, 
				howl: new Howl({ src: [track.file.path], autoplay: true })
			}
		});
	};
}


export const addToQueue = track => {
	return dispatch => {
		dispatch({
			type: ADD_TRACK_TO_QUEUE,
			trackUrl: track.file.path, // REMOVE
			track:{ 
				...track,
				howl: new Howl({src: [track.file.path]}) 
			}
		});
	};
}

