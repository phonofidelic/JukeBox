import React from 'react';
import LibraryContainer from '../containers/LibraryContainer';
import requireAuth from '../requireAuth';

const LibraryView = props => {
  return (
    <div>
      <LibraryContainer {...props} />
    </div>
  );
};

export default requireAuth(LibraryView);
