import {
	UPLOAD_TRACKS,
	UPLOAD_SUCCESS,
	UPLOAD_FAILURE,
	SET_MESSAGE
} from '../actiontypes';
import axios from 'axios';
import { URLS } from '../config';

const TRACKS_URL = URLS.TRACK_URL;

export const uploadTracks = (formData) => {
	console.log('@uploadTracks, formData:', formData.getAll('audioFiles'));
	return dispatch => {
		dispatch({
			type: UPLOAD_TRACKS
		});
		axios.post(TRACKS_URL, formData, { 
			headers: { 
				token: localStorage.getItem('JWT'),
				userId: localStorage.getItem('userId')
			}
		})
		.then(response => {
			console.log('uploadTrack response:', response);
			// document.dispatchEvent(new Event('library-update'));
			dispatch({
				type: UPLOAD_SUCCESS,
				uploadedTracks: response.data.tracks
			});
			dispatch({
				type: SET_MESSAGE,
				message: {
					//	TODO: Store target response data in constant?
					text: `${response.data.message}`, 
					context: 'success'
				}
			});
		})
		.catch(err => {
			console.error('uploadTrack error:', err);
			dispatch({
				type: UPLOAD_FAILURE,
				data: err.response.data,
				status: err.response.status ,
				message: err.response.data.message || err.response.data, 
			});
		});
	}
}