import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { authActions } from './actions';
import MessageContainer from './containers/MessageContainer';
// import AlertContainer from './containers/AlertContainer';
import PlayerContainer from './containers/PlayerContainer';
import NavContainer from './containers/NavContainer';
// import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// import { Route, Redirect, Switch } from 'react-router';
// import { history } from './config';
import UploaderView from './views/Uploader.view';
import LibraryView from './views/Library.view';
import HomeView from './views/Home.view';
import LandingView from './views/Landing.view';
import NotFound from './views/NotFound.view';
import CookieMessage from './components/CookieMessage';

class App extends Component {
  render() {
    const styles = {
      root: {
        textAlign: 'center'
      }
    };

    // TODO: Create Router component and insert it here
    return (
      <div style={styles.root}>
        <MessageContainer />
        <Switch>
          <Route exact path="/" component={LandingView} />
          <Route path="/home" component={HomeView} />
          <Route path="/library" component={LibraryView} />
          <Route path="/uploader" component={UploaderView} />
          <Route path="/*" component={NotFound} />
        </Switch>
        <PlayerContainer />
        {localStorage.getItem('token') && <NavContainer />}
        {!localStorage.getItem('acceptedCookies') && <CookieMessage />}
      </div>
    );
  }
}

export default App;
