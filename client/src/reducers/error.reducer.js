import {
	REGISTRATION_FAILURE,
	LOGIN_FAILURE,
	GET_USER_INFO_FAILURE,
	LOAD_LIBRARY_FAILURE,
	FETCH_DETAIL_VIEW_FAILURE,
	DELETE_TRACK_FAILURE,
	UPLOAD_FAILURE,
	TRIGGER_ERROR_MESSAGE,
	CLEAR_ERROR,
} from '../actiontypes';

const STRINGS = {
	error_default: 'Something went wrong...'
}

export const INITIAL_STATE = {
	showError: false,
	data: null,
	title: null,
	status: null,
	message: null,
};

const error = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case TRIGGER_ERROR_MESSAGE:
		case REGISTRATION_FAILURE: 
		case LOGIN_FAILURE:
		case GET_USER_INFO_FAILURE:
		case LOAD_LIBRARY_FAILURE:
		case FETCH_DETAIL_VIEW_FAILURE:
		case DELETE_TRACK_FAILURE:
		case UPLOAD_FAILURE:
			return {
				...state,
				showError: true,
				title: action.title || STRINGS.error_default,
				status: action.status,
				message: action.message,
			}

		case CLEAR_ERROR:
			return {
				...state,
				showError: false,
			}

		default: return state
	}
}

export default error;
