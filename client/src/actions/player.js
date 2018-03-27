import { 
	PLAY_TRACK,
	PAUSE_TRACK,
	STOP_TRACK,
	PLAY_NEXT,
	PLAY_PREV
} from '../actiontypes';

export const playTrack = (queue, queueIndex) => {
	queue[queueIndex].howl.play();
	return dispatch => {
		dispatch({
			type: PLAY_TRACK
		});
	};
}

export const pauseTrack = (queue, queueIndex) => {
	queue[queueIndex].howl.pause();
	return dispatch => {
		dispatch({
			type: PAUSE_TRACK
		});
	};
}

export const stopTrack = (queue, queueIndex) => {
	queue[queueIndex].howl.stop();
	return dispatch => {
		dispatch({
			type: STOP_TRACK
		});
	};
}

export const playNext = (queue, queueIndex) => {
	queue[queueIndex].howl.stop();
	queue[queueIndex+1].howl.play();
	return dispatch => {
		dispatch({
			type: PLAY_NEXT
		})
	}
}

export const playPrev = (queue, queueIndex) => {
	queue[queueIndex].howl.stop();
	queue[queueIndex-1].howl.play();
	return dispatch => {
		dispatch({
			type: PLAY_PREV
		})
	}
}