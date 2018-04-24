import {
	UPLOAD_TRACK,
	UPLOAD_SUCCESS,
	UPLOAD_FAILURE,
	SET_MESSAGE
} from '../actiontypes';
import axios from 'axios';
import config from '../config';

const TRACKS_URL = config.TRACKS_URL;

export const uploadTrack = formData => {
	console.log('@uploadTrack, formData:', formData);
	return dispatch => {
		dispatch({
			type: UPLOAD_TRACK
		});
		axios.post(TRACKS_URL, formData)
		.then(response => {
			console.log('uploadTrack response:', response);
			dispatch({
				type: UPLOAD_SUCCESS,
				uploadedTrack: response.data.data
			});
			dispatch({
				type: SET_MESSAGE,
				message: {text: `${response.data.data.name} saved to library`, context: 'success'}
			});
		})
		.catch(err => {
			console.error('uploadTrack error:', err);
			dispatch({
				type: UPLOAD_FAILURE,
				error: err
			});
		});
	}
}

export const uploadTracks = formData => {
	console.log('@uploadTracks, formData:', formData.getAll('audioFiles'));
	return dispatch => {
		dispatch({
			type: UPLOAD_TRACK
		});
		axios.post(TRACKS_URL, formData)
		.then(response => {
			console.log('uploadTrack response:', response);
			dispatch({
				type: UPLOAD_SUCCESS,
				uploadedTrack: response.data.data
			});
			dispatch({
				type: SET_MESSAGE,
				message: {text: `${response.data.data.name} saved to library`, context: 'success'}
			});
		})
		.catch(err => {
			console.error('uploadTrack error:', err);
			dispatch({
				type: UPLOAD_FAILURE,
				error: err
			});
		});
	}
}