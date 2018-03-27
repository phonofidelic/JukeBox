import React, { Component } from 'react';
import './App.css';
import UploaderContainer from './containers/UploaderContainer';
import TrackListContainer from './containers/TrackListContainer';
import PLayerContainer from './containers/PlayerContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UploaderContainer />
        <TrackListContainer />
        <PLayerContainer />
      </div>
    );
  }
}

export default App;
