import {
	TRIGGER_ERROR_MESSAGE,
	// REGISTRATION_FAILURE,
	// LOGIN_FAILURE,
	// GET_USER_INFO_FAILURE,
	// VALIDATION_ERROR,
	CLEAR_ERROR,
} from '../actiontypes';

export const clearError = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_ERROR
		});
	}
}

export const triggerErrorMessage = (err, title) => {
	console.log('@triggerErrorMessage, err:', err);

	return dispatch => {
		dispatch({
			type: TRIGGER_ERROR_MESSAGE,
			data: err,
			title: title,
			status: '' ,
			message: err.message
		});
	}
}

// TODO: add method for error reporting
