import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { authActions } from './actions';
import MessageContainer from './containers/MessageContainer';
// import AlertContainer from './containers/AlertContainer';
import PlayerContainer from './containers/PlayerContainer';
import NavContainer from './containers/NavContainer';
// import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
// import { withRouter } from 'react-router';
// import { history } from './config';
import UploaderView from './views/Uploader.view';
import LibraryView from './views/Library.view';
import HomeView from './views/Home.view';
import LandingView from './views/Landing.view';
import NotFound from './views/NotFound.view';
import CookieMessage from './components/CookieMessage';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  // console.log('AuthenticatedRoute, JWT:', localStorage.getItem('JWT'))
  // console.log('rest:', rest)
  return (
    <Route
      {...rest}
      render={props =>
        // rest.isAuthed === true
        localStorage.getItem('JWT') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

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
        {/*<AlertContainer />*/}
        {/*<ConnectedRouter history={history}>*/}
        <Switch>
          <AuthenticatedRoute
            exact
            path="/"
            component={props => <HomeView {...props} />}
          />
          <AuthenticatedRoute
            path="/library"
            component={props => <LibraryView {...props} />}
          />
          <AuthenticatedRoute
            path="/uploader"
            component={props => <UploaderView {...props} />}
          />
          <Route
            path="/login"
            component={props => <LandingView {...props} />}
          />
          <Route path="/*" component={NotFound} />
        </Switch>
        {/*</ConnectedRouter>*/}
        <PlayerContainer />
        {localStorage.getItem('JWT') && <NavContainer />}
        <CookieMessage />
      </div>
    );
  }
}

// export default withRouter(App);
export default App;
