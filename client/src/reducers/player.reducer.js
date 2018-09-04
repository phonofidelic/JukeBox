import { 
	PLAY_TRACK,
	PAUSE_TRACK,
	STOP_TRACK,
	START_NEW_QUEUE,
	UNSHIFT_TO_QUEUE,
	ADD_TRACK_TO_QUEUE,
	PLAY_NEXT,
	PLAY_PREV,
	TOGGLE_QUEUE_VISIBILITY,
	PLAY_FROM_QUEUE,
	SEEK,
} from '../actiontypes';

export const INITIAL_STATE = {
	queue: [],
	showQueue: true,
	playing: false,
	queueIndex: null,
	currentTrack: null,
	time: 0,
	pausedAt: null,
	intervalId: null,
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
				queueIndex: 0,
			}

		case UNSHIFT_TO_QUEUE:
			return {
				...state,
				playing: true,
				currentTrack: action.track,
				queue: [...state.queue, action.track],
				queueIndex: state.queue.length,
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
				time: action.time,
			}

		case PAUSE_TRACK:
			return {
				...state,
				playing: false,
				time: action.time,
				pausedAt: action.pausedAt
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

		case PLAY_FROM_QUEUE:
			return {
				...state,
				queueIndex: action.queueIndex,
				currentTrack: action.currentTrack,
				playing: true
			}

		case SEEK:
			return {
				...state,
				pos: action.pos
			}

		default: return state;
	}
};

export default player;