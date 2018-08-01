import React, { Component } from 'react';
import LibraryContainer from '../containers/LibraryContainer';

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
			<LibraryContainer {...props} />
		</div>
	)
}

export default LibraryView;
