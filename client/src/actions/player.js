import { 
	PLAY_TRACK,
	PAUSE_TRACK,
	STOP_TRACK,
	PLAY_NEXT,
	PLAY_PREV,
	TOGGLE_QUEUE_VISIBILITY,
	PLAY_FROM_QUEUE
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
	console.log('playNext, queueIndex:', queueIndex+1);
	queue[queueIndex].howl.stop();
	queue[queueIndex+1].howl.play();
	return dispatch => {
		dispatch({
			type: PLAY_NEXT
		});
	};
}

export const playPrev = (queue, queueIndex) => {
	console.log('playPrev, queueIndex:', queueIndex-1);
	queue[queueIndex].howl.stop();
	queue[queueIndex-1].howl.play();
	return dispatch => {
		dispatch({
			type: PLAY_PREV
		});
	};
}

export const toggleQueue = () => {
	console.log('toggle')
	return dispatch => {
		dispatch({
			type: TOGGLE_QUEUE_VISIBILITY
		});
	};
}

export const playFromQueue = (queue, prevQueueIndex, newQueueIndex, track) => {
	console.log('prevQueueIndex:', prevQueueIndex)
	console.log('newQueueIndex:', newQueueIndex)
	// If a track is currently playing, 
	// stop it before playing the selected queue track
	queue[prevQueueIndex].howl.stop();
	queue[newQueueIndex].howl.play();
	return dispatch => {
		dispatch({
			type: PLAY_FROM_QUEUE,
			queueIndex: newQueueIndex,
			currentTrack: track,
		})
	}
}