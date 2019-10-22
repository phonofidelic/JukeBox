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
  TOGGLE_SEARCH,
  SEARCH_LIBRARY
} from '../actiontypes';
import { idbTrack } from '../utils/idbUtils';
import axios from 'axios';
import { URLS } from '../config';

const { LIBRARY_URL, TRACK_URL, ARTIST_URL, ALBUM_URL } = URLS;

const fetchLibrary = dispatch => {
  axios
    .get(LIBRARY_URL, {
      // headers: {
      //   token: localStorage.getItem('JWT')
      // }
    })
    .then(response => {
      const tracks = response.data.library;
      idbTrack.addMany(tracks);
      dispatch({
        type: LOAD_LIBRARY_SUCCESS,
        tracks: tracks
      });
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: LOAD_LIBRARY_FAILURE,
        data: err.response.data,
        status: err.response.status,
        message: err.response.data.message || err.response.data
      });
    });
};

export const loadLibrary = () => {
  return async dispatch => {
    dispatch({
      type: LOAD_LIBRARY
    });
    // Check IndexedDB for stored track data
    let tracks = await idbTrack.getAll();

    // If IndexedDB is empty, or (TODO:) last fetch was made > some time limit,
    // or last update was made from another device, fetch tracks from network.
    // This because, if tracks were added from another device, they will not show
    // up on the current device until a new nerwork request is made.
    if (!tracks || tracks.length < 1) {
      fetchLibrary(dispatch);
    } else {
      // Otherwise load data retrieved from IndexedDB
      dispatch({
        type: LOAD_LIBRARY_SUCCESS,
        tracks: tracks
      });
    }
  };
};

export const orderTracksByFieldValue = (fieldName, order) => {
  console.log('orderTracksByFieldValue, fieldName:', fieldName);
  return dispatch => {
    dispatch({
      type: ORDER_TRACKS_BY_FIELD_VALUE,
      fieldName: fieldName,
      order: order
    });
  };
};

export const selectTrack = track => {
  // console.log(track)
  return dispatch => {
    dispatch({
      type: SELECT_TRACK,
      selectedTrack: track
    });
  };
};

export const editTrack = (formData, trackData) => {
  console.log('@editTrack, formData', formData);
  return dispatch => {
    dispatch({
      type: POST_TRACK_DATA
    });
    axios
      .put(`${TRACK_URL}/${trackData._id}`, formData, {
        headers: {
          token: localStorage.getItem('JWT')
        }
      })
      .then(response => {
        console.log('postTrackData response:', response);
        const updatedTrack = response.data.updatedTrack;
        idbTrack.put(updatedTrack);
        dispatch({
          type: POST_TRACK_DATA_SUCCESS,
          updatedTrack: updatedTrack,
          message: { text: 'Track data saved!', context: 'success' } //TODO: return message from response
        });
        dispatch({
          type: SET_MESSAGE,
          message: {
            text: `${response.data.updatedTrack.title} updated!`,
            context: 'success'
          }
        });
      })
      .catch(err => {
        console.error('postTrackData error:', err);
        dispatch({
          type: POST_TRACK_DATA_FAILURE,
          // message: {text: 'Could not save changes', context: 'danger'},
          data: err.response.data,
          status: err.response.status,
          message: err.response.data.message || err.response.data
        });
      });
  };
};

export const deleteTrack = () => {
  return dispatch => {
    dispatch({
      type: DELETE_TRACK
    });
  };
};

export const deleteTrackConfirm = track => {
  return dispatch => {
    dispatch({
      type: DELETE_TRACK_CONFIRM
    });
    axios
      .delete(`${TRACK_URL}/${track._id}`, {
        headers: {
          token: localStorage.getItem('JWT')
        }
      })
      .then(response => {
        console.log('deleteTrack response:', response);
        const deletedTrack = response.data.deletedTrack;
        idbTrack.delete(deletedTrack._id);
        dispatch({
          type: DELETE_TRACK_SUCCESS,
          deletedTrack: deletedTrack,
          message: { text: 'Track was deleted', context: 'success' }
        });
        dispatch({
          type: SET_MESSAGE,
          message: {
            text: `${deletedTrack.title} was deleted`,
            context: 'success'
          }
        });
      })
      .catch(err => {
        console.error('deleteTrack error:', err);
        dispatch({
          type: DELETE_TRACK_FAILURE,
          // message: {text: 'Could not delete track', context: 'danger'},
          data: err.response.data,
          status: err.response.status,
          message: err.response.data.message || err.response.data
        });
      });
  };
};

export const deleteTrackCancel = () => {
  return dispatch => {
    dispatch({
      type: DELETE_TRACK_CANCEL
    });
  };
};

export const showDetailView = (id, type) => {
  return dispatch => {
    dispatch({
      type: FETCH_DETAIL_VIEW
    });

    axios
      .get(`${type === 'artist' ? ARTIST_URL : ALBUM_URL}/${id}`, {
        headers: {
          token: localStorage.getItem('JWT')
        }
      })
      .then(response => {
        console.log('showDetailView, response:', response);
        dispatch({
          type: FETCH_DETAIL_VIEW_SUCCESS,
          detailViewData: response.data.artist || response.data.album
        });
      })
      .catch(err => {
        console.error('showDetailView error:', err);
        dispatch({
          type: FETCH_DETAIL_VIEW_FAILURE,
          data: err.response.data,
          status: err.response.status,
          message: err.response.data.message || err.response.data
        });
      });
  };
};

export const closeDetailView = () => {
  console.log('closeDetailView');
  return dispatch => {
    dispatch({
      type: CLOSE_DETAIL_VIEW
    });
  };
};

export const dismissLibraryError = () => {
  return dispatch => {
    dispatch({
      type: DISMISS_LIBRARY_ERR
    });
  };
};

export const toggleSearch = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SEARCH
    });
  };
};

export const searchLibrary = term => {
  return dispatch => {
    dispatch({
      type: SEARCH_LIBRARY,
      term
    });
  };
};
