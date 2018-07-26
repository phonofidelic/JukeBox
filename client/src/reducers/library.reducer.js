import {
	LOAD_LIBRARY,
	LOAD_LIBRARY_SUCCESS,
	LOAD_LIBRARY_FAILURE,
	FETCH_TRACKS,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACKS_FAILURE,
	UPLOAD_SUCCESS,
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
	SHOW_DETAIL_VIEW,
	CLOSE_DETAIL_VIEW,
	CLEAR_MESSAGE
} from '../actiontypes';

const INITIAL_STATE = {
	loadingLibrary: false,
	fetchingTracks: false,
	loadingDetailView: false,
	postingTrackData: false,
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
				loadingLibrary: true
			}

		case LOAD_LIBRARY_SUCCESS:
			return {
				...state,
				loadingLibrary: false,
				tracks: action.tracks,
				artists: action.artists,
				albums: action.artists
			}

		case LOAD_LIBRARY_FAILURE:
			return {
				...state,
				loadingLibrary: false,
				error: action.error
			}

		case FETCH_TRACKS:
			return {
				...state,
				fetchingTracks: true
			}

		case FETCH_TRACKS_SUCCESS:
			return {
				...state,
				fetchingTracks: false,
				tracks: action.tracks,
				message: action.message
			}

		case FETCH_TRACKS_FAILURE:
			return {
				...state,
				fetchingTracks: false,
				message: action.message,
				error: action.error
			}

		case UPLOAD_SUCCESS:
			return {
				...state,
				tracks: [...state.tracks, ...action.uploadedTracks]
			}

		case SELECT_TRACK:
			return {
				...state,
				selectedTrack: action.selectedTrack
			}

		case POST_TRACK_DATA:
			return {
				...state,
				postingTrackData: true
			}

		case POST_TRACK_DATA_SUCCESS:
			// Find index of track to be updated: https://stackoverflow.com/questions/42053178/update-array-of-object-without-mutation
			const updateIndex = state.tracks.findIndex(track => track._id === action.updatedTrack._id);

			return {
				...state,
				postingTrackData: false,
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
				postingTrackData: false,
				error: 'Could not save changes',
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
				postingTrackData: true
			}

		case DELETE_TRACK_CANCEL:
			return {
				...state
			}

		case DELETE_TRACK_SUCCESS:
		const deleteIndex = state.tracks.findIndex(track => track._id === action.deletedTrack._id);

			return {
				...state,
				postingTrackData: false,
				message: action.message,
				tracks: [
					...state.tracks.slice(0, deleteIndex), 
					...state.tracks.slice(deleteIndex+1)
				],
			}

		case DELETE_TRACK_FAILURE:
			return {
				...state,
				postingTrackData: false,
				message: action.message,
				error: 'Could not delete track'
			}

		case ORDER_TRACKS_BY_FIELD_VALUE:
			let tracksToSort = [...state.tracks];
			
			if (action.fieldName === 'artist') {
				tracksToSort.sort((a, b) => {
					const trackA = a[action.fieldName].name.toUpperCase();
					const trackB = b[action.fieldName].name.toUpperCase();
					if (trackA < trackB) return -1;
					if (trackA > trackB) return 1;
					return 0;
				})
			} else if (action.fieldName === 'album') {
				tracksToSort.sort((a, b) => {
					const trackA = a[action.fieldName].title.toUpperCase();
					const trackB = b[action.fieldName].title.toUpperCase();
					if (trackA < trackB) return -1;
					if (trackA > trackB) return 1;
					return 0;
				})
			} else {
				tracksToSort.sort((a, b) => {
					const trackA = a[action.fieldName].toUpperCase();
					const trackB = b[action.fieldName].toUpperCase();
					if (trackA < trackB) return -1;
					if (trackA > trackB) return 1;
					return 0;
				})
			}

			return {
				...state,
				tracks: tracksToSort
			}

		case FETCH_DETAIL_VIEW:
			return {
				...state,
				loadingDetailView: true,
			}

		case FETCH_DETAIL_VIEW_FAILURE:
			return {
				...state,
				loadingDetailView: false,
				error: action.error,
			}

		case SHOW_DETAIL_VIEW:
			return {
				...state,
				loadingDetailView: false,
				detailViewData: action.detailViewData,
			}

		case CLOSE_DETAIL_VIEW:
			return {
				...state,
				detailViewData: null,
			}

		default:
			return state;
	}
};

export default library_reducer;
