import React, { Component } from 'react';
import TrackListContainer from '../containers/TrackListContainer';
import PlayerContainer from '../containers/PlayerContainer';
import NavContainer from '../containers/NavContainer';
import Typography from '@material-ui/core/Typography';

const TrackListView = (props) => {
	const styles = {
		header: {
			height: '40px',
			position: 'fixed',
			top: '0px',
			width: '100%',
			zIndex: '1000',
			background: '#fff'
		}
	}
	return (
		<div>
			<div style={styles.header}>
				<Typography variant="display1">Track List</Typography>
			</div>
			<TrackListContainer {...props} />
			<PlayerContainer />
      <NavContainer />
		</div>
	)
}

export default TrackListView;
