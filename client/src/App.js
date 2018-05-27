import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from './actions';
import './App.css';
import UploaderContainer from './containers/UploaderContainer';
import TrackListContainer from './containers/TrackListContainer';
import PlayerContainer from './containers/PlayerContainer';
import MessageContainer from './containers/MessageContainer';
import AlertContainer from './containers/AlertContainer';
import AuthContainer from './containers/AuthContainer';
// import Nav from './components/Nav';
import NavContainer from './containers/NavContainer';
import { Route, Redirect, Switch } from 'react-router-dom';
import { 
  HomeView, 
  TrackListView, 
  UploaderView, 
  LoginView,
  NotFound 
} from './views';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  // console.log('AuthenticatedRoute, JWT:', localStorage.getItem('JWT'))
  return <Route {...rest} render={(props) => (
    // props.isAuthed === true
    localStorage.getItem('JWT') 
    ? <Component {...props} />
    : <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }} />
  )} />
};

class App extends Component {
  // handleSignOut() {
  //   console.log('handleSignOut, this.props:', this.props)
  //   // this.props.logoutUser();
  // }

  render() {
    // const { auth, router } = this.props;
    // console.log('isAuthed', auth.isAuthed)

    return (
      <div className="App">
        <MessageContainer />
        <AlertContainer />
        <Switch>
          {/*<Route path="/tracklist" component={TrackListView} />*/}
          <AuthenticatedRoute exact path="/" component={props => <HomeView {...props} />} />
          <AuthenticatedRoute path="/tracklist" component={props => <TrackListView {...props} />} />
          <AuthenticatedRoute path="/uploader" component={props => <UploaderView {...props} />} />
          <Route path="/login" component={props => <LoginView {...props} />} />
          <Route path="/*" component={NotFound} />
        </Switch>
        <PlayerContainer />
        <NavContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    router: state.router,
  }
}

export default App;
