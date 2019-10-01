import {
  UPLOAD_TRACKS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  SET_MESSAGE
} from '../actiontypes';
import { idbTrack } from '../utils/idbUtils';
import axios from 'axios';
import { URLS } from '../config';

const TRACKS_URL = URLS.TRACK_URL;

export const uploadTracks = formData => {
  // console.log('@uploadTracks, formData:', formData.getAll('audioFiles'));
  return async dispatch => {
    const audioFiles = formData.getAll('audioFiles');
    console.log('====================================');
    console.log('audioFiles:', audioFiles);
    console.log('====================================');

    // audioFiles.forEach(async file => {
    //   // Get s3 signed url
    //   const uploadConfig = await axios.get(`${TRACKS_URL}/upload`);
    //   // console.log('uploadConfig:', uploadConfig);
    //   await axios.put(uploadConfig.data.url, file, {
    //     headers: {
    //       'Content-Type': file.type
    //     }
    //   });
    // });

    dispatch({
      type: UPLOAD_TRACKS
    });

    try {
      const response = await axios.post(TRACKS_URL, formData, {
        headers: {
          token: localStorage.getItem('JWT')
        }
      });
      console.log('uploadTrack response:', response);
      // document.dispatchEvent(new Event('library-update'));
      idbTrack.addMany(response.data.tracks);
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
    } catch (err) {
      console.error(err);
      dispatch({
        type: UPLOAD_FAILURE,
        data: err.response.data,
        status: err.response.status,
        message: err.response.data.message || err.response.data
      });
    }

    // .then(response => {
    // 	console.log('uploadTrack response:', response);
    // 	// document.dispatchEvent(new Event('library-update'));
    // 	dispatch({
    // 		type: UPLOAD_SUCCESS,
    // 		uploadedTracks: response.data.tracks
    // 	});
    // 	dispatch({
    // 		type: SET_MESSAGE,
    // 		message: {
    // 			//	TODO: Store target response data in constant?
    // 			text: `${response.data.message}`,
    // 			context: 'success'
    // 		}
    // 	});
    // })
    // .catch(err => {
    // 	console.error('uploadTrack error:', err);
    // 	dispatch({
    // 		type: UPLOAD_FAILURE,
    // 		data: err.response.data,
    // 		status: err.response.status ,
    // 		message: err.response.data.message || err.response.data,
    // 	});
    // });
  };
};
