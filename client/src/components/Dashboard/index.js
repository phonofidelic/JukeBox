import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext, getTopNavHeight } from '../../contexts/theme.context'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
	margin-top: ${getTopNavHeight}px;
	padding-top: 25%;
`

const Dashboard = props => {
	const theme = useContext(ThemeContext);
	const { 
		user,
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