import {
	POST_REGISTRATION,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAILURE,
} from '../actiontypes';

const INITIAL_STATE = {
	isAuthed: true,

}

const auth = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case POST_REGISTRATION:
			return {
				...state
			}

		default: return state
	}
}

export default auth;