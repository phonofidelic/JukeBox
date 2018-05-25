import React from 'react';
import TrackListContainer from '../containers/TrackListContainer';
import UploaderContainer from '../containers/UploaderContainer';
import AuthContainer from '../containers/AuthContainer';
import Typography from 'material-ui/Typography';

export const HomeView = () => {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}

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
				<Typography variant="display1">Track List</Typography>
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

export const LoginView = () => {
	return (
		<div>
			<Typography variant="display1">Login</Typography>
			<AuthContainer />
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