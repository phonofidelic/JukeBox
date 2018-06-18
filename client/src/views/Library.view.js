import React, { Component } from 'react';
import LibraryContainer from '../containers/LibraryContainer';
import UploaderContainer from '../containers/UploaderContainer';
import PlayerContainer from '../containers/PlayerContainer';
import NavContainer from '../containers/NavContainer';
import Typography from '@material-ui/core/Typography';

const LibraryView = (props) => {
	const styles = {
		header: {
			height: '40px',
			position: 'fixed',
			top: '0px',
			width: '100%',
			// zIndex: '1000',
			background: '#fff'
		}
	}
	return (
		<div>
			<div style={styles.header}>
				{/*<Typography variant="display1">Library</Typography>*/}
			</div>
			<LibraryContainer {...props} />
			{/*<UploaderContainer />*/}
			<PlayerContainer />
      <NavContainer />
		</div>
	)
}

export default LibraryView;
