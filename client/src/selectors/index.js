export const getSelectedTrack = state => {
	return state.trackList_reducer.selectedTrack;
}

export const getCurrentQueueIndex = state => {
	return state.player_reducer.queueIndex;
}