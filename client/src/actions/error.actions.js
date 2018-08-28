import {
	REGISTRATION_FAILURE,
	LOGIN_FAILURE,
	GET_USER_INFO_FAILURE,
	VALIDATION_ERROR,
	CLEAR_ERROR,
} from '../actiontypes';

export const clearError = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_ERROR
		});
	}
}

// TODO: add method for error reporting
