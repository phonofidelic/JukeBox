import {
	POST_REGISTRATION,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAILURE,
	POST_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	UNAUTH_USER,
	GET_USER_INFO,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAILURE,
} from '../actiontypes';

const INITIAL_STATE = {
	isAuthed: false,
	waiting: false,
	user: null,
	token: null, // No need to store token here if storing in localStorage?
	message: null,
}

const auth = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case POST_REGISTRATION:
			return {
				...state,
				waiting: true,
			}

		case REGISTRATION_SUCCESS:
			return {
				...state,
				waiting: false,
				isAuthed: true,
				user: action.user,
				token: action.token,
				message: action.message,
			}

		case REGISTRATION_FAILURE:
			return {
				...state,
				waiting: false,
				message: action.failure,
			}

		case POST_LOGIN:
			return {
				...state,
				waiting: true,
			}

		case LOGIN_SUCCESS:
			return {
				...state,
				waiting: false,
				isAuthed: true,
				user: action.user,
				token: action.token,
				message: action.message,
			}

		case UNAUTH_USER:
			return {
				...state,
				message: 'User successfully logged out'	
			}

		case GET_USER_INFO:
			return {
				...state,
				waiting: true,
			}

		case GET_USER_INFO_SUCCESS:
			return {
				...state,
				waiting: false,
				user: action.user,
				message: action.message,
			}

		case GET_USER_INFO_FAILURE:
			return {
				...state,
				waiting: false,
				message: 'Could not retreive user info',
			}

		default: return state
	}
}

export default auth;