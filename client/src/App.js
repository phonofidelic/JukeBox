import React, { Component } from 'react';
import './App.css';
import UploaderContainer from './containers/UploaderContainer';
import TrackListContainer from './containers/TrackListContainer';
import PlayerContainer from './containers/PlayerContainer';
import MessageContainer from './containers/MessageContainer';
import AlertContainer from './containers/AlertContainer';
import Nav from './components/Nav';

import { Route, Switch } from 'react-router-dom'
import { TrackListView, UploaderView, NotFound } from './views';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MessageContainer />
        <AlertContainer />
        <Switch>
          <Route exact path="/" component={TrackListView} />
          <Route path="/tracklist" component={TrackListView} />
          <Route path="/uploader" component={UploaderView} />
          <Route path="/*" component={NotFound} />
        </Switch>
        <PlayerContainer />
        <Nav />
      </div>
    );
  }
}

export default App;
