import React, { Component } from 'react';
import TrackListContainer from '../containers/TrackListContainer';
import Typography from 'material-ui/Typography';

const TrackListView = () => {
	const styles = {
		header: {
			height: '40px',
			position: 'fixed',
			top: '0px'
		}
	}
	return (
		<div>
			<div style={styles.header}>
				<Typography variant="display1">Track List</Typography>
			</div>
			<TrackListContainer />
		</div>
	)
}

export default TrackListView;