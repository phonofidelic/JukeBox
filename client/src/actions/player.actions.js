import { 
	PLAY_TRACK,
	PAUSE_TRACK,
	STOP_TRACK,
	PLAY_NEXT,
	PLAY_PREV,
	TOGGLE_QUEUE_VISIBILITY,
	PLAY_FROM_QUEUE,
	START_NEW_QUEUE,
	ADD_TRACK_TO_QUEUE,
	SET_MESSAGE,
	SEEK
} from '../actiontypes';
import { Howl } from 'howler';

// Set up global event diapatchers for howl events
const howlOnPlay = track => {
	console.log('** howl, onplay', track.title);
	window.dispatchEvent(new Event('howl_play'));
};
const howlOnPause = track => {
	console.log('** howl, onpause', track.title);
	window.dispatchEvent(new Event('howl_pause'));
};
const howlOnEnd = (track) => {
	console.log('** howl, onend', track.title);
	window.dispatchEvent(new Event('howl_end'));
}

export const startNewQueue = (track, currentTrack) => {
	console.log('startNewQueue, track', track);

	// Unload and destroy the Howl object. This will immediately stop 
	// all sounds attached to this sound and remove it from the cache.
	if (currentTrack) { currentTrack.howl.stop() };

	// This creates a queuItem by coppying the passed track item
	// and adding a queueId and howl prop.
	const queueId = Math.trunc(Math.random() * Date.now());
	return dispatch => {
		dispatch({
			type: START_NEW_QUEUE,
			track: { 
				...track, 
				queueId: queueId,
				howl: new Howl({ 
					src: [track.file.path], 
					autoplay: true,
					onplay: () => howlOnPlay(track),
					onpause: () => howlOnPause(track),
					onend: () => howlOnEnd(track)
				})
			}
		});
	};
}

export const addToQueue = track => {
	// This creates a queuItem by coppying the passed track item
	// and adding a queueId and howl prop.
	const queueId = Math.trunc(Math.random() * Date.now());
	const message = { text: `"${track.title}" added to queue`, context: 'info' };
	
	return dispatch => {
		dispatch({
			type: ADD_TRACK_TO_QUEUE,
			track:{ 
				...track,
				queueId: queueId,
				howl: new Howl({ 
					src: [track.file.path], 
					// autoplay: true,
					onplay: () => howlOnPlay(track),
					onpause: () => howlOnPause(track),
					onend: () => howlOnEnd(track)
				}) 
			},
			message: message
		});
		// !!! Is this an anti-pattern?
		dispatch({
			type: SET_MESSAGE,
			message: message
		});
	};
}

export const playTrack = (currentTrack) => {
	currentTrack.howl.play();
	return dispatch => {
		dispatch({
			type: PLAY_TRACK,
		});
	};
}

export const pauseTrack = (currentTrack) => {
	currentTrack.howl.pause();
	const pausedAt = currentTrack.howl.seek();
	return dispatch => {
		dispatch({
			type: PAUSE_TRACK,
			time: pausedAt,
			pausedAt: pausedAt
		});
	};
}

export const stopTrack = (currentTrack) => {
	currentTrack && currentTrack.howl.stop();
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

export const seekInTrack = (pos, currentTrack) => {
	console.log('@seekInTrack, seek', pos)
	currentTrack.howl.seek(pos)
	return dispatch => {
		dispatch({
			type: SEEK,
			pos: pos
		})
	}
}
