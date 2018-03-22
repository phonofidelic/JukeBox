import React, { Component } from 'react';
import './App.css';
import Prototype from './Prototype';
import UploaderContainer from './containers/UploaderContainer';
import TrackListContainer from './containers/TrackListContainer';
import PLayerContainer from './containers/PlayerContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Prototype />*/}
        <UploaderContainer />
        <TrackListContainer />
        <PLayerContainer />
      </div>
    );
  }
}

export default App;
