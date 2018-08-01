import React, { Component } from 'react';
import DashboardContainer from '../containers/DashboardContainer';

const HomeView = (props) => {
	return (
		<div>
			<DashboardContainer {...props} />
		</div>
	);
}

export default HomeView;
