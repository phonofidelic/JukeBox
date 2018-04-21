import React, { Component } from 'react';
import UploaderContainer from '../containers/UploaderContainer';
import Typography from 'material-ui/Typography';

const UploaderView = () => {
	return (
		<div>
			<Typography variant="display1">Uploader</Typography>
			<UploaderContainer />
		</div>
	);
}

export default UploaderContainer;