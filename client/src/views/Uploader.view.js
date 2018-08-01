import React, { Component } from 'react';
import UploaderContainer from '../containers/UploaderContainer';
import PlayerContainer from '../containers/PlayerContainer';
import NavContainer from '../containers/NavContainer';
import Typography from '@material-ui/core/Typography';

const UploaderView = (props) => {
	return (
		<div>
			<UploaderContainer {...props} />
			{/*<PlayerContainer />*/}
      <NavContainer />
		</div>
	);
};

export default UploaderView;
