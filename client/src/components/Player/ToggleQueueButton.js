import React from 'react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import QueueMusic from '@material-ui/icons/QueueMusic';
import Album from '@material-ui/icons/Album';

const Container = styled.div`
	color: rgba(0, 0, 0, 0.54);
	margin-top: 5px;
	margin-right: 5px;
	margin-left: auto;
`

export default props => {
	const {
		showQueue,
		handleQueueToggle
	} = props;
	
	return (
		<Container>
			<IconButton onClick={() => handleQueueToggle()}>
				{	showQueue ? <Album /> : <QueueMusic /> }
			</IconButton>
		</Container>
	);
};