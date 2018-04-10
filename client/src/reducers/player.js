import { 
	PLAY_TRACK,
	PAUSE_TRACK,
	STOP_TRACK,
	START_NEW_QUEUE,
	ADD_TRACK_TO_QUEUE,
	PLAY_NEXT,
	PLAY_PREV,
	TOGGLE_QUEUE_VISIBILITY,
} from '../actiontypes';

const INITIAL_STATE = {
	queue: [],
	showQueue: true,
	howl: null,
	playing: false,
	queueIndex: null,
	currentTrack: null,
	message: null
};

const player = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_NEW_QUEUE:
			return {
				...state,
				playing: true,
				currentTrack: action.track,
				queue: [action.track],
				queueIndex: 0
			}

		case ADD_TRACK_TO_QUEUE:
			return {
				...state,
				queue: [...state.queue, action.track],
				message: action.message
			}

		case PLAY_TRACK:
			return {
				...state,
				playing: true,
			}

		case PAUSE_TRACK:
			return {
				...state,
				playing: false,
			}

		case STOP_TRACK:
			return {
				...state,
				playing: false
			}

		case PLAY_NEXT:
			return {
				...state,
				playing: true,
				queueIndex: state.queueIndex + 1,
				currentTrack: state.queue[state.queueIndex + 1]
			}

		case PLAY_PREV:
			return {
				...state,
				playing: true,
				queueIndex: state.queueIndex - 1,
				currentTrack: state.queue[state.queueIndex - 1]
			}

		case TOGGLE_QUEUE_VISIBILITY:
			return {
				...state,
				showQueue: !state.showQueue
			}

		default: return state;
	}
};

export default player;