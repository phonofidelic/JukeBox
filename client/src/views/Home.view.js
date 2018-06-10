import React, { Component } from 'react';
import DashboardContainer from '../containers/DashboardContainer';
import PlayerContainer from '../containers/PlayerContainer';
import NavContainer from '../containers/NavContainer';
import Typography from '@material-ui/core/Typography';

const HomeView = (props) => {
	return (
		<div>
			<Typography variant="display1">Home</Typography>
			<DashboardContainer {...props} />
			<PlayerContainer />
      <NavContainer />
		</div>
	);
}

export default HomeView;
