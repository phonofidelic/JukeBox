import React from 'react';
import UploaderContainer from '../containers/UploaderContainer';
import requireAuth from '../requireAuth';

const UploaderView = props => {
  return (
    <div>
      <UploaderContainer {...props} />
    </div>
  );
};

export default requireAuth(UploaderView);
