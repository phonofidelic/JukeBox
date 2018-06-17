import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from './actions';
import './App.css';
import MessageContainer from './containers/MessageContainer';
import AlertContainer from './containers/AlertContainer';
import { Route, Redirect, Switch } from 'react-router-dom';
import UploaderView from './views/Uploader.view';
import LibraryView from './views/Library.view';
import HomeView from './views/Home.view';
import LandingView from './views/Landing.view';
import NotFound from './views/NotFound.view';

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
          <AuthenticatedRoute exact path="/" component={props => <HomeView {...props} />} />
          <AuthenticatedRoute path="/tracklist" component={props => <LibraryView {...props} />} />
          <AuthenticatedRoute path="/uploader" component={props => <UploaderView {...props} />} />
          <Route path="/login" component={props => <LandingView {...props} />} />
          <Route path="/*" component={NotFound} />
        </Switch>
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
