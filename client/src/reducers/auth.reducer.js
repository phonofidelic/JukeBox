import {
	CHECK_USER_AGENT,
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
	VALIDATION_ERROR,
	CLEAR_ERROR,
} from '../actiontypes';

const INITIAL_STATE = {
	isAuthed: false,
	userAgentIsMobile: null,
	loading: false,
	user: null,
	token: null, // No need to store token here if storing in localStorage?
	message: null,
	error: false,
	loginErr: null,
}

const auth = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CHECK_USER_AGENT: 
			return {
				...state,
				userAgentIsMobile: action.userAgentIsMobile,
			}

		case POST_REGISTRATION:
			return {
				...state,
				loading: true,
			}

		case REGISTRATION_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthed: true,
				user: action.user,
				token: action.token,
				message: action.message,
			}

		case REGISTRATION_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			}

		case POST_LOGIN:
			return {
				...state,
				loading: true,
			}

		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthed: true,
				user: action.user,
				token: action.token,
				message: action.message,
			}

		case LOGIN_FAILURE:
			return {
				...state,
				loginErr: action.error,
			}

		case UNAUTH_USER:
			return {
				...state,
				message: 'User successfully logged out'	
			}

		case GET_USER_INFO:
			return {
				...state,
				loading: true,
			}

		case GET_USER_INFO_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.user,
				message: action.message,
			}

		case GET_USER_INFO_FAILURE:
			return {
				...state,
				loading: false,
				message: 'Could not retreive user info',
			}

		case VALIDATION_ERROR:
			return {
				...state,
				error: action.error
			}

		case CLEAR_ERROR: 
			return {
				...state,
				loginErr: null
			}

		default: return state
	}
}

export default auth;