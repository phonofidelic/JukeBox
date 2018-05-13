export const getSelectedTrack = state => {
	return state.trackList.selectedTrack;
}

export const getCurrentQueueIndex = state => {
	return state.player.queueIndex;
}