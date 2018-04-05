import {
	UPLOAD_TRACK,
	UPLOAD_SUCCESS,
	UPLOAD_FAILURE
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
		})
		.catch(err => {
			console.log('uploadTrack error:', err);
			dispatch({
				type: UPLOAD_FAILURE,
				error: err
			});
		});
	}
}