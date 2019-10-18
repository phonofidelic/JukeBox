import React from 'react';
import DashboardContainer from '../containers/DashboardContainer';
import requireAuth from '../requireAuth';

const HomeView = props => {
  return (
    <div>
      <DashboardContainer {...props} />
    </div>
  );
};

export default requireAuth(HomeView);
