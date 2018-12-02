import React, { Component } from 'react';
import AuthContainer from '../containers/AuthContainer';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const LandingView = (props) => {
	const { theme } = props;
	const styles = {
		root: {
			background: theme.palette.primary.dark,
			color: theme.palette.primary.light
		}
	}

	return (
		<div>
			<Typography variant="h1">jukebox</Typography>
			<AuthContainer />
		</div>
	);
}

export default withTheme()(LandingView);