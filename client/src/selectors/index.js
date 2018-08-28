export const getSelectedTrack = state => {
	return state.library.selectedTrack;
}

export const getCurrentQueueIndex = state => {
	return state.player.queueIndex;
}

export const getRedirectReferrer = state => {
	return state.router.location.pathname;
}