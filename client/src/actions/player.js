import { 
	PLAY_TRACK,
	PAUSE_TRACK,
	STOP_TRACK,
	PLAY_NEXT,
	PLAY_PREV,
	TOGGLE_QUEUE_VISIBILITY,
	PLAY_FROM_QUEUE
} from '../actiontypes';

var timeElapsed = 0;

export const playTrack = (queue, queueIndex) => {
	queue[queueIndex].howl.play();
	const time = setInterval(() => {
		console.log(queue[queueIndex].howl.seek())
		timeElapsed += 0.01;
	}
	, 10);
	return dispatch => {
		dispatch({
			type: PLAY_TRACK,
			time: timeElapsed
		});
	};
}

export const pauseTrack = (queue, queueIndex, pausedAt) => {
	queue[queueIndex].howl.pause();
	return dispatch => {
		dispatch({
			type: PAUSE_TRACK,
			time: queue[queueIndex].howl.seek(),
			pausedAt: pausedAt
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