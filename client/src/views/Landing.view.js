import React from 'react';
import AuthContainer from '../containers/AuthContainer';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const LandingView = (props) => {

	return (
		<main role="main">
			<Typography variant="h1">jukebox</Typography>
			<AuthContainer />
		</main>
	);
}

export default withTheme()(LandingView);