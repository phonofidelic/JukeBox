import { 
	PLAY_TRACK,
	PAUSE_TRACK,
	STOP_TRACK,
	START_NEW_QUE,
	ADD_TRACK_TO_QUE
} from '../actiontypes';

const INITIAL_STATE = {
	que: [],
	playing: false
};

const player = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_NEW_QUE:
			return {
				...state,
				playing: true,
				que: [action.trackUrl]
			}

		case ADD_TRACK_TO_QUE:
			return {
				...state,
				que: [...state.que, action.trackUrl]
			}

		case PLAY_TRACK:
			return {
				...state,
				playing: true
			}

		case PAUSE_TRACK:
			return {
				...state,
				playing: false
			}

		case STOP_TRACK:
		return {
			...state,
			playing: false
		}

		default: return state;
	}
};

export default player;