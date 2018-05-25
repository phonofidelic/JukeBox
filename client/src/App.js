import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './App.css';
import UploaderContainer from './containers/UploaderContainer';
import TrackListContainer from './containers/TrackListContainer';
import PlayerContainer from './containers/PlayerContainer';
import MessageContainer from './containers/MessageContainer';
import AlertContainer from './containers/AlertContainer';
import Nav from './components/Nav';
import { Route, Redirect, Switch } from 'react-router-dom'
import { 
  HomeView, 
  TrackListView, 
  UploaderView, 
  LoginView,
  NotFound 
} from './views';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  console.log('AuthenticatedRoute, rest:', rest)
  return <Route {...rest} render={props => (
    props.isAuthed === true 
    ? <Component {...props} />
    : <Redirect to="/login" />
  )} />
};

class App extends Component {
  render() {
    const { auth } = this.props;
    console.log('isAuthed', auth.isAuthed)

    return (
      <div className="App">
        <MessageContainer />
        <AlertContainer />
        <Switch>
          {/*<Route path="/tracklist" component={TrackListView} />*/}
          <AuthenticatedRoute isAuthed={auth.isAuthed} exact path="/" component={HomeView} />
          <AuthenticatedRoute isAuthed={auth.isAuthed} path="/tracklist" component={TrackListView} />
          <AuthenticatedRoute isAuthed={auth.isAuthed} path="/uploader" component={UploaderView} />
          <Route path="/login" component={LoginView} />
          <Route path="/*" component={NotFound} />
        </Switch>
        <PlayerContainer />
        <Nav />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(App);
