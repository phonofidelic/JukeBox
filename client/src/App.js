import React, { Component } from 'react';
import './App.css';
import Prototype from './Prototype';
import TrackListContainer from './containers/TrackListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Prototype />
        <TrackListContainer />
      </div>
    );
  }
}

export default App;
