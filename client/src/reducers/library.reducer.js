import {
	LOAD_LIBRARY,
	LOAD_LIBRARY_SUCCESS,
	LOAD_LIBRARY_FAILURE,
	UPLOAD_TRACKS,
	UPLOAD_SUCCESS,
	UPLOAD_FAILURE,
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
	FETCH_DETAIL_VIEW,
	FETCH_DETAIL_VIEW_FAILURE,
	FETCH_DETAIL_VIEW_SUCCESS,
	CLOSE_DETAIL_VIEW,
	// CLEAR_MESSAGE,
	DISMISS_LIBRARY_ERR,
} from '../actiontypes';
import { _ } from 'underscore';

export const INITIAL_STATE = {
	loading: false,
	tracks: [],
	selectedTrack: null,
	detailViewData: null,
	error: false,
	message: null
};

const library_reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_LIBRARY:
			return {
				...state,
				loading: true
			}

		case LOAD_LIBRARY_SUCCESS:
			return {
				...state,
				loading: false,
				tracks: action.tracks,
				artists: action.artists,
				albums: action.artists
			}

		case LOAD_LIBRARY_FAILURE:
			return {
				...state,
				loading: false,
				// error: action.error
			}

		case UPLOAD_TRACKS:
			return {
				...state,
				loading: true,
			}

		case UPLOAD_SUCCESS:
			return {
				...state,
				loading: false,
				tracks: [...state.tracks, ...action.uploadedTracks]
			}

		case UPLOAD_FAILURE:
			return {
				...state,
				loading: false,
			}

		case SELECT_TRACK:
			return {
				...state,
				selectedTrack: action.selectedTrack
			}

		case POST_TRACK_DATA:
			return {
				...state,
				loading: true
			}

		case POST_TRACK_DATA_SUCCESS:
			// Find index of track to be updated: https://stackoverflow.com/questions/42053178/update-array-of-object-without-mutation
			const updateIndex = state.tracks.findIndex(track => track._id === action.updatedTrack._id);

			return {
				...state,
				loading: false,
				tracks: [
					...state.tracks.slice(0, updateIndex), 
					action.updatedTrack, 
					...state.tracks.slice(updateIndex+1)
				],
				message: action.message
			}

		case POST_TRACK_DATA_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
				message: action.message
			}

		case DELETE_TRACK:
			return {
				...state,
				message: 'Are you sure you want to delete this track?'
			}

		case DELETE_TRACK_CONFIRM:
			return {
				...state,
				loading: true
			}

		case DELETE_TRACK_CANCEL:
			return {
				...state
			}

		case DELETE_TRACK_SUCCESS:
		const deleteIndex = state.tracks.findIndex(track => track._id === action.deletedTrack._id);

			return {
				...state,
				loading: false,
				message: action.message,
				tracks: [
					...state.tracks.slice(0, deleteIndex), 
					...state.tracks.slice(deleteIndex+1)
				],
			}

		case DELETE_TRACK_FAILURE:
			return {
				...state,
				loading: false,
				message: action.message,
				error: action.error,
			}

		case ORDER_TRACKS_BY_FIELD_VALUE:
			let tracksToSort = [...state.tracks];
			const BY_ARTIST = _.sortBy(_.sortBy(_.sortBy(tracksToSort, ['order', 'no']), ['album', 'title']), ['artist', 'name']);
			const BY_ALBUM = _.sortBy(_.sortBy(tracksToSort, ['order', 'no']), ['album', 'title']);
			const BY_TITLE = _.sortBy(tracksToSort, ['title']);
			
			if (action.fieldName === 'artist') {
				// Tracks are ordered by artist name, then by album title, then by order number
				return {
					...state,
					tracks: action.order === 'desc' ? BY_ARTIST : BY_ARTIST.reverse(),
				};

			} else if (action.fieldName === 'album') {
				// Tracks are ordered by album title, then by order number
				return {
					...state,
					tracks: action.order === 'desc' ? BY_ALBUM : BY_ALBUM.reverse(),
				};

			} else {
				// Default order by title
				return {
					...state,
					tracks: action.order === 'desc' ? BY_TITLE : BY_TITLE.reverse(),
				};
			}

		case FETCH_DETAIL_VIEW:
			return {
				...state,
				loading: true,
			}

		case FETCH_DETAIL_VIEW_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			}

		case FETCH_DETAIL_VIEW_SUCCESS:
			return {
				...state,
				loading: false,
				detailViewData: {
					...action.detailViewData,
					imgSrc: action.detailViewData.artwork ? action.detailViewData.artwork[0].src : 'defaultImage'
				},
			}

		case CLOSE_DETAIL_VIEW:
			return {
				...state,
				detailViewData: null,
			}

		case DISMISS_LIBRARY_ERR:
			return {
				...state,
				error: false,
			}

		default:
			return state;
	}
};

export default library_reducer;
