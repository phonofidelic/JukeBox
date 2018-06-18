export const getSelectedTrack = state => {
	return state.library.selectedTrack;
}

export const getCurrentQueueIndex = state => {
	return state.player.queueIndex;
}
