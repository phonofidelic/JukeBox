import React, { Component } from 'react';
import TrackListContainer from '../containers/TrackListContainer';
import Typography from 'material-ui/Typography';

const TrackListView = () => {
	return (
		<div>
			<Typography variant="display1">Track List</Typography>
			<TrackListContainer />
		</div>
	)
}

export default TrackListView;