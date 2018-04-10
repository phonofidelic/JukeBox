import {
	SET_MESSAGE,
	CLEAR_MESSAGE
} from '../actiontypes';

const INITIAL_STATE = {
	message: null,
	messages: []
}

const messages = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_MESSAGE:
			return {
				...state,
				message: action.message,
				messages: [ ...state.messages, action.message ]
			}

		case CLEAR_MESSAGE:
			return {
				...state,
				message: null,
			}

		default: return state;
	}
}

export default messages;
