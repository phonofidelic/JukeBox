import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext, getTopNavHeight } from '../../contexts/theme.context'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
	margin-top: ${getTopNavHeight}px;
	padding-top: 25%;
`

const ButtonContainer = styled.div`
	margin: 10px;
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
			<ButtonContainer>
				<Button variant="outlined" onClick={() => this.handleGDButtonClick()}>Connect Google Drive</Button>
			</ButtonContainer>
			<ButtonContainer>
				<Button variant="outlined" onClick={() => handleSignOut()}>Sign out</Button>
			</ButtonContainer>
		</Container>
	);
}

export default Dashboard;