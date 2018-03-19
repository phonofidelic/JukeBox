import React, { Component } from 'react';
import './App.css';
import Prototype from './Prototype';
import UploaderContainer from './containers/UploaderContainer';
import TrackListContainer from './containers/TrackListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Prototype />*/}
        <UploaderContainer />
        <TrackListContainer />
      </div>
    );
  }
}

export default App;
