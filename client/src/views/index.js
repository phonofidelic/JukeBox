import React from 'react';
import TrackListContainer from '../containers/TrackListContainer';
import UploaderContainer from '../containers/UploaderContainer';
import AuthContainer from '../containers/AuthContainer';
import DashboardContainer from '../containers/DashboardContainer';
import Typography from 'material-ui/Typography';

export const HomeView = (props) => {
	return (
		<div>
			<Typography variant="display1">Home</Typography>
			<DashboardContainer {...props} />
		</div>
	);
}

export const TrackListView = (props) => {
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
		</div>
	)
}


export const UploaderView = (props) => {
	return (
		<div>
			<Typography variant="display1">Uploader</Typography>
			<UploaderContainer {...props} />
		</div>
	);
};

export const LoginView = (props) => {
	return (
		<div>
			<Typography variant="display1">Login</Typography>
			<AuthContainer {...props} />
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