import React, { Component } from 'react';
import DashboardContainer from '../containers/DashboardContainer';
import PlayerContainer from '../containers/PlayerContainer';
import NavContainer from '../containers/NavContainer';

const HomeView = (props) => {
	return (
		<div>
			<DashboardContainer {...props} />
			{/*<PlayerContainer />*/}
      <NavContainer />
		</div>
	);
}

export default HomeView;
