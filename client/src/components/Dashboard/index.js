import React, { Component, useContext } from 'react';
import styles from './Dashboard.styles';
import styled from 'styled-components';
import { ThemeContext, getTopNavHeight } from '../../contexts/theme.context'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const Container = styled.div`
	padding-top: ${getTopNavHeight}px;
`

const Dashboard = props => {
	const theme = useContext(ThemeContext);
	const { 
		user,
		classes,
		handleSignOut,
	} = props;

	return (
		<Container theme={theme}>
			<Typography>email: { user && user.email }</Typography>
			<div>
				<Button variant="outlined" onClick={() => this.handleGDButtonClick()}>Connect Google Drive</Button>
			</div>
			<div>
				<Button variant="outlined" onClick={() => handleSignOut()}>Sign out</Button>
			</div>
		</Container>
	);
}

export default Dashboard;