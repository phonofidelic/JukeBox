import React, { Component } from 'react';
import TrackListContainer from '../containers/TrackListContainer';
import UploaderContainer from '../containers/UploaderContainer';
import Typography from 'material-ui/Typography';

export const TrackListView = () => {
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
				<Typography variant="display1">Track List!</Typography>
			</div>
			<TrackListContainer />
		</div>
	)
}


export const UploaderView = () => {
	return (
		<div>
			<Typography variant="display1">Uploader</Typography>
			<UploaderContainer />
		</div>
	);
};

export const NotFound = () => {
	return (
		<div>
			<Typography variant="display1">Not Found</Typography>
			<p>Sorry, the page you requested could not be found</p>
		</div>
	);
}