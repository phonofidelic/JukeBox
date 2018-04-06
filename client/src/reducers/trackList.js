import {
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
	CLEAR_MESSAGE
} from '../actiontypes';

const INITIAL_STATE = {
	fetchingTracks: false,
	postingTrackData: false,
	tracks: [],
	selectedTrack: null,
	error: false,
	message: {
		text: null,
		context: null
	}
};

const trackData = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_TRACKS:
			return {
				...state,
				fetchingTracks: true
			}

		case FETCH_TRACKS_SUCCESS:
			return {
				...state,
				fetchingTracks: false,
				tracks: action.tracks
			}

		case FETCH_TRACKS_FAILURE:
			return {
				...state,
				fetchingTracks: false,
				error: action.error
			}

		case UPLOAD_SUCCESS:
			return {
				...state,
				tracks: [...state.tracks, action.uploadedTrack]
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
				message: 'Successfully deleted track',
				tracks: [
					...state.tracks.slice(0, deleteIndex), 
					...state.tracks.slice(deleteIndex+1)
				],
			}

		case DELETE_TRACK_FAILURE:
			return {
				...state,
				postingTrackData: false,
				error: 'Could not delete track'
			}

		case CLEAR_MESSAGE:
			return {
				...state,
				message: { text: null, context: null },
			}

		default:
			return state;
	}
};

export default trackData;
