import {
	SET_MESSAGE,
	CLEAR_MESSAGE,
	SET_ALERT,
	CLEAR_ALERT
} from '../actiontypes';

export const INITIAL_STATE = {
	message: null,
	messages: [],
	alert: null,
	pendingAction: null,
	pendingActionData: null
}

const message_reducer = (state = INITIAL_STATE, action) => {
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

		case SET_ALERT:
			return {
				...state,
				alert: action.alert,
				pendingAction: action.pendingAction,
				pendingActionData: action.pendingActionData
			}

		case CLEAR_ALERT:
			return {
				...state,
				alert: null
			}

		default: return state;
	}
}

export default message_reducer;
