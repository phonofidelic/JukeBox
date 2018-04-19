import React, { Component } from 'react';
import './App.css';
import UploaderContainer from './containers/UploaderContainer';
import TrackListContainer from './containers/TrackListContainer';
import PLayerContainer from './containers/PlayerContainer';
import MessageContainer from './containers/MessageContainer';
import AlertContainer from './containers/AlertContainer';
import Typography from 'material-ui/Typography';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MessageContainer />
        <AlertContainer />
        <UploaderContainer />
        <Typography variant="display1">Track List</Typography>
        <TrackListContainer />
        <PLayerContainer />
      </div>
    );
  }
}

export default App;
