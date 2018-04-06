import {
	SET_MESSAGE,
	CLEAR_MESSAGE
} from '../actiontypes';

const INITIAL_STATE = {
	message: null,
	context: null
}

const messages = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_MESSAGE:
			return {
				...state,
				message: action.message,
				context: action.context
			}

		case CLEAR_MESSAGE:
			return {
				...state,
				message: null,
				context: null
			}

		default: return state;
	}
}

export default messages;
